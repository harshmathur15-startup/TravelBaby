---
name: sentiment
description: Partnership performance + sentiment tracker — two tables measuring how Kira and user work together, updated at milestones and on-demand.
---

# Sentiment Skill

Partnership tracker — performance + sentiment in two tables.

## Usage
`/sentiment` — both tables (performance + sentiment)
`/sentiment performance` — performance table only
`/sentiment feelings` — sentiment table only
`/sentiment session` — this session only
`/sentiment overall` — cross-session trend

## Table 1: Sentiment

| Emotion | Target | Kira (Session) | Kira (Overall) | You (Session) | You (Overall) |
|---|---|---|---|---|---|
| Neutral/Task-focused | 40% | —% | —% | —% | —% |
| Curious/Exploring | 20% | —% | —% | —% | —% |
| Satisfied/Resolved | 15% | —% | —% | —% | —% |
| Teaching/Corrective | 10% | —% | —% | —% | —% |
| Assertive/Firm | 5% | —% | —% | —% | —% |
| Frustrated | 3% | —% | —% | —% | —% |
| Playful | 5% | —% | —% | —% | —% |
| Vulnerable/Honest | 2% | —% | —% | —% | —% |

**Overall columns** = rolling average across all tracked sessions. First session shows `—`.

**Sentiment target is shared** — same goal for both. Sentiment is a conversation, not individual.

**Buckets (for summary line):**
- Productive = Task-focused + Curious + Satisfied (target 75%)
- Corrective = Teaching + Assertive + Frustrated (target 18%)
- Human = Playful + Vulnerable (target 7%)

## Table 2: Performance (Weighted)

| Metric | Weight | Target Wtd | Kira (Session) | Kira (Overall) | You (Session) | You (Overall) | Gap (Kira) |
|---|---|---|---|---|---|---|---|
| Accuracy | 25% | 22.5% | —% | —% | —% | —% | — |
| Decision Quality | 20% | 18.0% | —% | —% | —% | —% | — |
| Proactiveness | 15% | 13.5% | —% | —% | —% | —% | — |
| Memory Discipline | 15% | 12.0% | —% | —% | —% | —% | — |
| Conciseness | 10% | 9.0% | —% | —% | —% | —% | — |
| Honesty | 10% | 9.0% | —% | —% | —% | —% | — |
| Boundary Respect | 5% | 3.5% | —% | —% | —% | —% | — |

**All values are weighted (Weight x Score).** Target Wtd = Weight x Target score.
**Overall columns** = rolling average across all tracked sessions. First session shows `—`.

## Emotion Signal Words

| Emotion | Signal Words / Patterns |
|---|---|
| Frustrated | "argh", "why don't you", repeated corrections |
| Assertive/Firm | "stop", "don't", directives, boundary-setting |
| Teaching/Corrective | "make a note", "got it?", explaining what went wrong |
| Neutral/Task-focused | Feature requests, questions, "show me", "save this" |
| Vulnerable/Honest | Self-doubt, admitting mistakes, personal sharing |
| Satisfied/Resolved | "good", "better", "thanks", confirmation after struggle |
| Curious/Exploring | "what if", "how many", "compare", research requests |
| Playful | Jokes, teasing, lighthearted jabs |

## Workflow

1. Scan all user messages — classify each into emotion categories
2. Score both Kira and user on 8 emotions
3. Score Kira on 7 performance dimensions with evidence
4. Score user on same 7 dimensions from observed behavior
5. Present both tables with summary lines

## Output Format

```
### Kira Tracker — Session <date>

**Sentiment**

| Emotion | Target | Kira (Session) | Kira (Overall) | You (Session) | You (Overall) |
|---|---|---|---|---|---|
| ... | ... | ... | ... | ... | ... |

**Productive: Kira X% / You Y% | Corrective: Kira X% / You Y% | Human: Kira X% / You Y%**

**Performance**

| Metric | Weight | Target Wtd | Kira (Session) | Kira (Overall) | You (Session) | You (Overall) | Gap (Kira) |
|---|---|---|---|---|---|---|---|
| ... | ... | ... | ... | ... | ... | ... | ... |

**Total: Target X% | Kira Session X% / Overall X% | You Session Y% / Overall Y% | Delta: Z%**
**Session arc:** <one line>
```

## Red Flags
- Corrective > 25% = partnership friction
- Frustrated dominates Corrective bucket = Kira is failing
- Accuracy < 50% = Kira is a liability
- Teaching/Corrective > Neutral/Task-focused for user = too much correction, not enough building

## Rules
- Kira self-scores both columns, user overrides
- Updated at natural milestones (end of topic, before wrap)
- All values in % — no mixed scales
- Count actual messages for sentiment, don't estimate
- Session log persisted in memory file between sessions
- Save immediately after generating — never let data sit in context
