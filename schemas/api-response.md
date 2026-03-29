# API Response Envelope

All API endpoints return a consistent JSON envelope.

## Success Response

```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "pageSize": 20,
    "total": 142,
    "totalPages": 8
  }
}
```

- `data` — the requested resource or array of resources
- `meta` — pagination metadata, included only on list endpoints

## Error Response

```json
{
  "success": false,
  "error": "Human-readable error message"
}
```

- `error` — a safe, client-facing message (never exposes stack traces, schema, or file paths)

## Validation Error (422)

```json
{
  "success": false,
  "error": "Validation failed",
  "details": [
    { "field": "email", "message": "Invalid email address" }
  ]
}
```

## HTTP Status Codes

| Code | Meaning | When |
|------|---------|------|
| 200 | OK | Successful read or update |
| 201 | Created | Successful resource creation |
| 204 | No Content | Successful deletion |
| 400 | Bad Request | Malformed request body |
| 401 | Unauthorized | Missing or invalid auth token |
| 403 | Forbidden | Valid token but insufficient permissions |
| 404 | Not Found | Resource does not exist |
| 422 | Validation Error | Input fails Zod schema validation |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Server Error | Unhandled internal error |
