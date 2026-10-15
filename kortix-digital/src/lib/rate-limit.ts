/**
 * Minimal in-memory sliding-window rate limiter.
 *
 * Deliberately dependency-free and per-instance: on a single Node server (or a
 * single serverless instance) it stops a bot hammering the request form. It is
 * NOT a distributed limiter — each instance keeps its own counters, so under
 * heavy multi-instance traffic the effective limit multiplies.
 *
 * TODO(owner): if the request form starts getting real abuse, move the counter
 * to a shared store (Redis/Upstash) or put the endpoint in front of a WAF.
 */

interface Bucket {
  hits: number[];
}

const buckets = new Map<string, Bucket>();

/** Trim buckets that are empty so the map cannot grow without bound. */
function sweep(now: number, windowMs: number): void {
  for (const [key, bucket] of buckets) {
    bucket.hits = bucket.hits.filter((t) => now - t < windowMs);
    if (bucket.hits.length === 0) buckets.delete(key);
  }
}

export interface RateLimitResult {
  ok: boolean;
  /** Seconds until the caller may retry. */
  retryAfter: number;
}

export function rateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number },
): RateLimitResult {
  const now = Date.now();

  if (buckets.size > 5000) sweep(now, windowMs);

  const bucket = buckets.get(key) ?? { hits: [] };
  bucket.hits = bucket.hits.filter((t) => now - t < windowMs);

  if (bucket.hits.length >= limit) {
    buckets.set(key, bucket);
    const oldest = bucket.hits[0] ?? now;
    return {
      ok: false,
      retryAfter: Math.max(1, Math.ceil((oldest + windowMs - now) / 1000)),
    };
  }

  bucket.hits.push(now);
  buckets.set(key, bucket);
  return { ok: true, retryAfter: 0 };
}

/**
 * Best-effort client identifier. `x-forwarded-for` is set by the host; the
 * left-most entry is the original client. Falls back to a shared bucket when
 * the header is missing, which is stricter rather than looser.
 */
export function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip =
    forwarded?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  return ip;
}
