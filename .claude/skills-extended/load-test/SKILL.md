---
name: load-test
description: Read an API route and generate a k6 load test script ready to run.
---

# Load Test Skill

Generate a k6 load test for an API endpoint. Tests nobody writes manually.

## Usage
`/load-test <route or feature>`

Examples:
- `/load-test POST /api/v1/orders/create`
- `/load-test user list with filters`
- `/load-test login`

## Workflow

1. Find the route file using Grep on `server/src/routes/`
2. Read the route + controller to understand request shape and auth requirements
3. Read `.claude/rules/performance.md` for response time targets
4. Generate a k6 script with realistic scenarios

## Output Format

Save to `./load-tests/<route-name>.test.js` and display:

```js
import http from 'k6/http'
import { check, sleep } from 'k6'
import { Rate } from 'k6/metrics'

const errorRate = new Rate('errors')

export const options = {
  stages: [
    { duration: '30s', target: 10 },   // ramp up
    { duration: '1m', target: 10 },    // sustained load
    { duration: '10s', target: 0 },    // ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<300'],  // 95% of requests under 300ms
    errors: ['rate<0.01'],             // <1% error rate
  },
}

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000'

export function setup() {
  // Login and return auth token
  const res = http.post(`${BASE_URL}/api/v1/auth/login`, JSON.stringify({
    email: __ENV.TEST_EMAIL || 'test@example.com',
    password: __ENV.TEST_PASSWORD || 'testpassword',
  }), { headers: { 'Content-Type': 'application/json' } })

  return { token: res.json('accessToken') }
}

export default function (data) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${data.token}`,
  }

  const res = http.get(`${BASE_URL}/api/v1/<resource>`, { headers })

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 300ms': (r) => r.timings.duration < 300,
  })

  errorRate.add(res.status !== 200)
  sleep(1)
}
```

## Thresholds by Endpoint Type (from performance rules)
| Type | p95 target |
|---|---|
| Simple CRUD | 300ms |
| List with filters | 500ms |
| Complex calculation | 5000ms |
| Report generation | 15000ms |

## Instructions
- Always use `__ENV` for base URL, credentials — never hardcode
- Include a `setup()` function for auth if the route requires it
- Set thresholds matching the performance rules for that endpoint type
- Add a `// Run: k6 run --env BASE_URL=http://localhost:3000 <file>` comment at the top
- Save the file before displaying it
