# Product-specific rules (globals inherited from ~/.claude/rules/)
<!-- Last reviewed: 2026-03-26 (S29) -->

## Database
- No query should scan more than 10,000 rows without pagination
- N+1 queries are forbidden — use Prisma `include` or batch queries
- Log slow queries (> 500ms) automatically
- Run `EXPLAIN ANALYZE` on any new query touching large tables

## Frontend
- Lighthouse performance score > 80 on all main pages
- Bundle size limit: < 500KB initial JS (gzipped)
- Images must use lazy loading and modern formats (WebP)
- No layout shift (CLS < 0.1)

## Background Jobs
- Jobs must complete within their timeout — set explicit timeouts on all BullMQ jobs
- Long-running jobs must report progress so the UI can show status
- Memory usage per worker < 512MB

## General
- Cache expensive computations — tax slabs, exchange rates, static config
- Never compute in a loop what can be computed once
- Profile before optimizing — don't guess at bottlenecks
