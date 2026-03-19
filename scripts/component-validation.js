// Component Validation — validates skills/agents have required fields
// Borrowed from davila7 (#24). Run as pre-commit check or manually.
// Usage: node scripts/component-validation.js

const fs = require('fs');
const path = require('path');

const SKILLS_DIR = '.claude/skills';
const AGENTS_DIR = '.claude/agents';

const issues = [];

// Validate skills
if (fs.existsSync(SKILLS_DIR)) {
  const skills = fs.readdirSync(SKILLS_DIR).filter(d =>
    fs.statSync(path.join(SKILLS_DIR, d)).isDirectory()
  );

  for (const skill of skills) {
    const skillFile = path.join(SKILLS_DIR, skill, 'SKILL.md');
    if (!fs.existsSync(skillFile)) {
      issues.push(`[SKILL] ${skill}: missing SKILL.md`);
      continue;
    }

    const content = fs.readFileSync(skillFile, 'utf8');

    // Check frontmatter
    if (!content.startsWith('---')) {
      issues.push(`[SKILL] ${skill}: missing frontmatter`);
    } else {
      const fmEnd = content.indexOf('---', 3);
      if (fmEnd > 0) {
        const fm = content.substring(3, fmEnd);
        if (!/^name:/m.test(fm)) issues.push(`[SKILL] ${skill}: missing 'name' in frontmatter`);
        if (!/^description:/m.test(fm)) issues.push(`[SKILL] ${skill}: missing 'description' in frontmatter`);
      }
    }

    // Check for secrets
    const secretPatterns = [/sk-[a-zA-Z0-9]{20,}/, /ANTHROPIC_API_KEY/, /password\s*[:=]\s*['"][^'"]+['"]/i];
    for (const pat of secretPatterns) {
      if (pat.test(content)) {
        issues.push(`[SKILL] ${skill}: POSSIBLE SECRET detected — review before committing`);
      }
    }
  }
}

// Validate agents
const agentFiles = [];
if (fs.existsSync(AGENTS_DIR)) {
  const files = fs.readdirSync(AGENTS_DIR).filter(f => f.endsWith('.md'));
  agentFiles.push(...files.map(f => path.join(AGENTS_DIR, f)));
}

for (const agentFile of agentFiles) {
  const content = fs.readFileSync(agentFile, 'utf8');
  const name = path.basename(agentFile, '.md');

  // Agents should have at minimum a role description
  if (content.trim().length < 50) {
    issues.push(`[AGENT] ${name}: suspiciously short — less than 50 chars`);
  }
}

// Output
if (issues.length === 0) {
  console.log('Component validation: all clear (' +
    (fs.existsSync(SKILLS_DIR) ? fs.readdirSync(SKILLS_DIR).filter(d => fs.statSync(path.join(SKILLS_DIR, d)).isDirectory()).length : 0) +
    ' skills, ' + agentFiles.length + ' agents)');
} else {
  console.log('Component validation: ' + issues.length + ' issue(s)');
  issues.forEach(i => console.log('  ' + i));
  process.exit(1);
}
