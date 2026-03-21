---
name: prompt-optimize
description: Audit and optimize AI prompts for cost, clarity, token count, and reliability.
---

# Prompt Optimize Skill

Audit prompts used in the project — system prompts, agent instructions, skill definitions — for cost, token efficiency, clarity, and reliability.

## Usage

`/prompt-optimize` — audit all prompts in the project
`/prompt-optimize <file>` — audit a specific file containing prompts
`/prompt-optimize --cost` — focus on token reduction and cost savings

## Workflow

1. Find all prompts in the project:
   - Grep for `system:`, `prompt:`, `content:`, template literals with AI instructions
   - Read `.claude/skills/*/SKILL.md` — each skill is a prompt
   - Read `agents/` directory for agent system prompts
   - Check for prompt strings in `*.ts`, `*.js` files (look for `anthropic`, `openai`, `claude` imports)
2. For each prompt, run all checks below
3. Output findings sorted by estimated token savings

## Checks

### 1. Token Count [INFO]

Estimate token count for each prompt (rough: 1 token ≈ 4 chars).

| Size | Rating | Action |
|---|---|---|
| < 500 tokens | Lean | No action |
| 500-2000 tokens | Normal | Review for fat |
| 2000-5000 tokens | Heavy | Optimize |
| > 5000 tokens | Bloated | Must trim or split |

### 2. Redundancy [WARNING]

| Pattern | Problem | Fix |
|---|---|---|
| Same instruction repeated in different words | Wastes tokens | Keep the clearest version |
| Examples that say the same thing | Diminishing returns after 2-3 | Remove extras |
| Excessive "IMPORTANT" / "CRITICAL" / "NEVER" | Dilutes emphasis | Keep only the truly critical ones |
| Rules restated across multiple prompts | Maintenance burden | Extract shared rules to one place |

### 3. Clarity [WARNING]

| Pattern | Problem | Fix |
|---|---|---|
| Vague instructions ("be helpful", "do your best") | No actionable guidance | Replace with specific behavior |
| Contradictory rules | Model picks one randomly | Resolve the conflict |
| Missing examples for complex tasks | Model guesses the format | Add 1-2 concrete examples |
| Nested conditionals ("if X and Y but not Z unless W") | Hard to follow | Flatten into a decision table |

### 4. Reliability [WARNING]

| Pattern | Problem | Fix |
|---|---|---|
| No output format specified | Inconsistent responses | Add explicit format |
| No error handling instruction | Model hallucinates on failure | Add "if X fails, do Y" |
| Unbounded loops ("keep trying until") | Infinite loop risk | Add iteration cap |
| No stop condition | Model runs forever | Add explicit completion criteria |

### 5. Cost Optimization [INFO]

| Technique | Savings | When to Use |
|---|---|---|
| Move static context to system prompt | 10-30% on repeated calls | Multi-turn conversations |
| Use haiku for classification/triage | 80-90% per call | Simple yes/no, routing, labeling |
| Cache system prompts (prompt caching) | 90% on cache hit | Repeated identical prompts |
| Trim few-shot examples to 2-3 | 20-50% per example removed | > 3 examples |
| Remove redundant instructions | 5-20% | Every prompt |

### 6. Security [WARNING]

| Pattern | Problem | Fix |
|---|---|---|
| User input injected directly into prompt | Prompt injection risk | Separate user content from instructions |
| No input sanitization before prompt | Special characters can break format | Sanitize or escape |
| Prompt contains secrets/API keys | Leaked in logs or errors | Move to env vars |
| No output validation | Model returns unexpected format | Validate with Zod |

## Output Format

```
## Prompt Optimization Report

**Files scanned:** X
**Prompts found:** X
**Total estimated tokens:** X (~$X.XX per call at sonnet rates)

### Findings by Prompt

#### <file:line or skill name>
**Tokens:** ~X
**Issues:**

| # | Category | Issue | Savings | Fix |
|---|---|---|---|---|
| 1 | Redundancy | Same rule stated 3 times | ~200 tokens | Keep lines 12-14, remove 28-30 and 45-47 |
| 2 | Clarity | No output format for error case | — | Add error format example |

**Optimized version:** (if token reduction > 20%)
<show the trimmed prompt>

---

### Summary

| Category | Findings | Est. Token Savings |
|---|---|---|
| Redundancy | X | ~Y tokens |
| Clarity | X | — |
| Reliability | X | — |
| Cost | X | ~Y tokens |
| Security | X | — |

**Total potential savings:** ~X tokens per call (~$X.XX saved per 1K calls)
```

## Instructions

- Estimate tokens using 4 chars ≈ 1 token (rough but fast)
- For cost estimates, use: sonnet = $3/MTok input, $15/MTok output; haiku = $0.25/MTok input, $1.25/MTok output
- Don't suggest removing instructions that serve a real purpose just to save tokens
- Security findings always take priority over cost savings
- If `--cost` flag, skip clarity and reliability checks — focus only on token reduction
- Show optimized prompt only when savings > 20% — don't rewrite for marginal gains
- For skill files, note that they're loaded into context on every invocation — bloat here is expensive
