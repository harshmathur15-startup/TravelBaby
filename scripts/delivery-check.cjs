/**
 * Delivery Check — scan deliveries.jsonl for pending inbound deliveries.
 *
 * Reads the shared deliveries file, finds records addressed TO this project
 * that have no matching ack record, and outputs them as structured text.
 *
 * Usage: node scripts/delivery-check.cjs [project-name]
 * Default project name: "Template-Website"
 *
 * Called by /kickoff skill at session start.
 * Exit 0 always — output is informational.
 */

const fs = require('fs');
const path = require('path');

const PROJECT_NAME = process.argv[2] || 'Template-Website';
const DELIVERIES_PATH = path.join(
  process.env.HOME || process.env.USERPROFILE,
  '.claude', 'signals', 'deliveries.jsonl'
);

function run() {
  if (!fs.existsSync(DELIVERIES_PATH)) {
    console.log('No deliveries file found');
    return;
  }

  const lines = fs.readFileSync(DELIVERIES_PATH, 'utf-8')
    .split('\n')
    .filter(l => l.trim());

  const records = [];
  for (const line of lines) {
    try {
      records.push(JSON.parse(line));
    } catch {
      // skip malformed lines
    }
  }

  // Separate deliveries (have "from" + "to") from acks (have "acked_by")
  const deliveries = records.filter(r => r.from && r.to === PROJECT_NAME && !r.acked_by);
  const acks = records.filter(r => r.acked_by);

  // Find acked IDs for this project (only count acks from this project)
  const ackedIds = new Set();
  for (const ack of acks) {
    if (ack.acked_by === PROJECT_NAME) {
      ackedIds.add(ack.id);
    }
  }

  // Filter to truly unacked inbound deliveries
  const pending = deliveries.filter(d => !ackedIds.has(d.id));

  if (pending.length === 0) {
    console.log('Pending: 0');
    return;
  }

  console.log(`Pending: ${pending.length}`);
  console.log('---');

  for (const d of pending) {
    // Count how many sessions ago (rough: count unique session numbers in acks after this delivery)
    const sessionMatch = d.session ? d.session.replace('S', '') : '?';
    const age = estimateAge(d.ts);
    const escalate = age >= 2 ? ' **ESCALATE**' : '';
    console.log(`${escalate ? 'ESCALATE' : 'PENDING'} | ${d.id} | From: ${d.from} | Session: ${d.session} | Age: ${age} sessions | ${d.summary}`);
  }
}

// Heuristic: ~1 session per day. Approximate, not exact.
// Uses calendar days as a proxy for session count since there is no
// reliable session counter in the deliveries file.
function estimateAge(ts) {
  if (!ts) return 0;
  const sent = new Date(ts);
  const now = new Date();
  const daysDiff = (now - sent) / (1000 * 60 * 60 * 24);
  return Math.floor(daysDiff);
}

run();
