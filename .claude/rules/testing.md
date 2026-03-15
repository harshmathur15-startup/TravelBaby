# Testing Standards

## What to Test
- Every service function — happy path + edge cases + error cases
- Every API endpoint — success, validation failure, auth failure
- Every React component that has logic — not pure presentational ones
- All AI agent decision logic — mock the Claude API response

## What NOT to Test
- Prisma model definitions — trust the ORM
- Pure CSS/styling — test behaviour, not appearance
- Third-party library internals

## Test Structure
```ts
describe('<Unit under test>', () => {
  describe('<scenario>', () => {
    it('should <expected behaviour>', () => {
      // Arrange
      // Act
      // Assert
    })
  })
})
```

## Rules
- One assertion concept per test — multiple `expect()` calls are fine if testing one thing
- Test file lives next to the source file: `billing.service.test.ts` beside `billing.service.ts`
- Mock external dependencies (DB, Claude API, Redis) — never call real services in unit tests
- Use `vi.spyOn` for mocking, `vi.fn()` for stubs — clean up with `afterEach`
- Coverage thresholds: 80% statements, 75% branches, 80% functions

## Naming
- Test files: `<name>.test.ts` or `<name>.test.tsx`
- Integration tests: `<name>.integration.test.ts`
- Test descriptions read as plain English: `"should return 422 when amount is negative"`
