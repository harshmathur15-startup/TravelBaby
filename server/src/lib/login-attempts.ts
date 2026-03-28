// TODO(template): Replace InMemoryLoginAttemptStore with Redis-backed store when BullMQ/Redis is set up

const MAX_LOGIN_ATTEMPTS = 5
const LOCKOUT_DURATION_MS = 15 * 60 * 1000 // 15 minutes

export interface LoginAttemptStore {
  isLocked(email: string): boolean
  recordFailure(email: string): void
  reset(email: string): void
}

interface AttemptRecord {
  count: number
  lockedUntil: number
}

export class InMemoryLoginAttemptStore implements LoginAttemptStore {
  private attempts = new Map<string, AttemptRecord>()

  isLocked(email: string): boolean {
    const record = this.attempts.get(email)
    if (!record) return false

    if (record.count >= MAX_LOGIN_ATTEMPTS && Date.now() < record.lockedUntil) {
      return true
    }

    // Lockout expired — clear it
    if (record.lockedUntil > 0 && Date.now() >= record.lockedUntil) {
      this.attempts.delete(email)
    }

    return false
  }

  recordFailure(email: string): void {
    const existing = this.attempts.get(email)
    const count = (existing?.count ?? 0) + 1
    this.attempts.set(email, {
      count,
      lockedUntil: count >= MAX_LOGIN_ATTEMPTS ? Date.now() + LOCKOUT_DURATION_MS : 0,
    })
  }

  reset(email: string): void {
    this.attempts.delete(email)
  }
}

export const loginAttemptStore: LoginAttemptStore = new InMemoryLoginAttemptStore()
