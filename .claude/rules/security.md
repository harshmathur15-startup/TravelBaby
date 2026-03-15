# Security Standards

## Secrets & Configuration
- Never hardcode secrets, API keys, or credentials — use `process.env`
- JWT access tokens expire in 15min; refresh tokens in httpOnly cookies (30d)
- Run `npm audit` before every deploy — fail the build if high severity issues exist
- Lock file (`package-lock.json`) must be committed and reviewed on changes

## Input & Output
- Validate all user input at API boundaries using Zod — never trust the client
- Sanitize data before storing in the database
- Use parameterized Prisma queries — never raw string SQL with user input
- Never expose stack traces or internal error messages to the client — generic messages externally, detailed logs internally only
- Sanitize all user-generated content before rendering — prevent XSS

## Authentication & Authorization
- Never trust the client's claimed role — always verify server-side on every request
- Always verify resource ownership before returning data — prevent IDOR
- Require CSRF tokens on all state-changing requests
- Rate limit all public API endpoints

## Data Classification
| Class | Examples | Rule |
|---|---|---|
| PII | Name, email, government IDs | Encrypt at rest, mask in logs |
| Financial | Payment amounts, bank details | Never log raw values, access restricted to authorized roles |
| Internal | Department, job title | Access restricted to authenticated users |
| Public | Company name, office location | No restrictions |

## Audit Logging
- All user actions logged: `{ userId, action, resourceType, resourceId, timestamp, ip }`
- All agent actions logged separately with full reasoning chain
- Audit log is immutable — never delete, only append
- Sensitive data (financial records, PII, credentials) must never appear in any log
