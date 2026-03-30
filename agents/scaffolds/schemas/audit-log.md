# Audit Log Schema

Every user action is logged with this shape:

| Field        | Type   | Description               |
| ------------ | ------ | ------------------------- |
| userId       | string | Who performed the action  |
| action       | string | What was done             |
| resourceType | string | Type of resource affected |
| resourceId   | string | ID of the resource        |
| timestamp    | string | ISO 8601 timestamp        |
| ip           | string | Client IP address         |
