# API Response Schema

Every API response follows this shape:

```json
{
  "success": true,
  "data": {},
  "error": null,
  "meta": { "page": 1, "total": 100 }
}
```

- `success` — boolean, always present
- `data` — response payload (object or array)
- `error` — null on success, error object on failure
- `meta` — pagination, counts, request metadata
