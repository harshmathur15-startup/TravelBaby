# Agent Log Schema

Every agent action is logged with this shape:

| Field | Type | Description |
|-------|------|-------------|
| agentId | string | Unique agent identifier |
| action | string | What the agent did |
| input | object | Input provided to the agent |
| output | object | Agent's response/result |
| durationMs | number | Execution time in milliseconds |
| modelUsed | string | AI model used |
| cost | number | Cost of the operation |
| timestamp | string | ISO 8601 timestamp |
| triggeredBy | string | What initiated this action |
