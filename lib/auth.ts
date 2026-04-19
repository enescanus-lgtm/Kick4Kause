import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";

export const ADMIN_SESSION_COOKIE = "k4k_admin_session";
const SESSION_MAX_AGE_SEC = 60 * 60 * 24 * 7;

function authSecret(): string | null {
  const s = process.env.AUTH_SECRET;
  if (typeof s !== "string" || s.length < 16) return null;
  return s;
}

export function authConfigured(): boolean {
  const p = process.env.ADMIN_PASSWORD;
  return (
    typeof p === "string" &&
    p.length >= 8 &&
    authSecret() !== null
  );
}

export function signAdminSession(): string | null {
  const secret = authSecret();
  if (!secret) return null;
  const exp = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SEC;
  const payloadB64 = Buffer.from(
    JSON.stringify({ exp, v: 1 }),
    "utf8",
  ).toString("base64url");
  const sig = createHmac("sha256", secret)
    .update(payloadB64)
    .digest("base64url");
  return `${payloadB64}.${sig}`;
}

export function verifyAdminSession(token: string): boolean {
  const secret = authSecret();
  if (!secret) return false;
  try {
    const i = token.lastIndexOf(".");
    if (i <= 0) return false;
    const payloadB64 = token.slice(0, i);
    const sig = token.slice(i + 1);
    const expected = createHmac("sha256", secret)
      .update(payloadB64)
      .digest("base64url");
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length) return false;
    if (!timingSafeEqual(a, b)) return false;
    const payload = JSON.parse(
      Buffer.from(payloadB64, "base64url").toString("utf8"),
    ) as { exp?: number };
    if (typeof payload.exp !== "number") return false;
    if (payload.exp < Math.floor(Date.now() / 1000)) return false;
    return true;
  } catch {
    return false;
  }
}

export function adminPasswordMatches(candidate: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (typeof expected !== "string" || expected.length < 8) return false;
  try {
    const a = Buffer.from(candidate, "utf8");
    const b = Buffer.from(expected, "utf8");
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const jar = await cookies();
  const t = jar.get(ADMIN_SESSION_COOKIE)?.value;
  if (!t) return false;
  return verifyAdminSession(t);
}

export function getSessionMaxAgeSec(): number {
  return SESSION_MAX_AGE_SEC;
}
