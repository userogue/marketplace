const DEFAULT_MAX_REQUESTS = 10 // requests per window
const DEFAULT_WINDOW_MS = 60 * 1000 // 1 minute

interface RateLimitOptions {
  /**
   * Maximum number of requests allowed per `windowMs` interval.
   * If omitted, defaults to 10.
   */
  max?: number
  /**
   * Length of the rate-limit window in **milliseconds**.
   * If omitted, defaults to 60_000 (1 minute).
   */
  windowMs?: number
}

interface RateLimitState {
  count: number
  windowStart: number
}

// In-memory store keyed by an identifier (IP address or user id).
// NOTE: This will only work for a single runtime instance. When scaling across
// multiple serverless invocations, consider using a remote store such as
// Upstash Redis or Vercel KV.
const store = new Map<string, RateLimitState>()

export function isRateLimited(
  identifier: string,
  opts: RateLimitOptions = {},
): { limited: boolean; retryAfter?: number } {
  const max = opts.max ?? DEFAULT_MAX_REQUESTS
  const windowMs = opts.windowMs ?? DEFAULT_WINDOW_MS

  const now = Date.now()
  const entry = store.get(identifier)

  if (!entry) {
    store.set(identifier, { count: 1, windowStart: now })
    return { limited: false }
  }

  // New window → reset counter
  if (now - entry.windowStart > windowMs) {
    entry.count = 1
    entry.windowStart = now
    return { limited: false }
  }

  // Same window → increment counter and check limit
  entry.count += 1
  if (entry.count > max) {
    return { limited: true, retryAfter: windowMs - (now - entry.windowStart) }
  }

  return { limited: false }
} 