---
name: incident
description: Structured incident response — triage, identify root cause, fix, and draft postmortem.
---

# Incident Skill

Walk through a production incident methodically. Calm structured thinking when you're under pressure.

## Usage
`/incident <description of the problem>`

Example: `/incident billing cycle stuck, no jobs processing, Redis seems fine`

## Workflow

### Phase 1 — Triage (2 min)
Ask (or infer from description):
1. What is broken? (symptom)
2. When did it start?
3. What changed recently? (deploy, config, data)
4. Who is affected? (all users, specific tenant, specific feature)
5. Severity: P1 (data loss/outage) / P2 (degraded) / P3 (minor)

### Phase 2 — Identify
Based on the symptom, suggest the most likely root causes ranked by probability.
Check relevant areas:
- For queue issues: BullMQ job status, Redis connection, worker process
- For API errors: recent code changes, Prisma query errors, env vars
- For data issues: recent migrations, seed data, constraint violations
- For auth issues: JWT expiry, cookie settings, CORS

### Phase 3 — Fix
1. Propose the minimal fix — no refactoring during an incident
2. Show the exact code change or command needed
3. Flag any risk in the fix (data loss? side effects?)

### Phase 4 — Postmortem Draft
After fix is confirmed, generate:

```markdown
## Incident Postmortem

**Date:** <date>
**Duration:** <how long it was broken>
**Severity:** P<1|2|3>

### What Happened
[Plain English — what broke and what the user impact was]

### Root Cause
[Technical root cause in 1-2 sentences]

### Timeline
- HH:MM — Issue first observed
- HH:MM — Investigation started
- HH:MM — Root cause identified
- HH:MM — Fix deployed
- HH:MM — Resolved

### Fix
[What was changed and why it worked]

### Prevention
- [ ] <action to prevent recurrence>
- [ ] <monitoring/alert to add>
```

## Instructions
- Never suggest risky fixes (data deletion, force-pushing) without explicit warning
- P1 incidents: fix first, postmortem later
- Always recommend adding an alert after resolution so the next incident is caught faster
- Keep postmortem blameless — focus on systems, not people
