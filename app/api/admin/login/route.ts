import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  adminPasswordMatches,
  authConfigured,
  getSessionMaxAgeSec,
  signAdminSession,
} from "@/lib/auth";

export async function POST(req: Request) {
  if (!authConfigured()) {
    return NextResponse.json(
      {
        error:
          "Server not configured. Set ADMIN_PASSWORD (8+ chars) and AUTH_SECRET (16+ chars) in .env.local.",
      },
      { status: 503 },
    );
  }

  let body: { password?: string };
  try {
    body = (await req.json()) as { password?: string };
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const password = typeof body.password === "string" ? body.password : "";
  if (!adminPasswordMatches(password)) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const token = signAdminSession();
  if (!token) {
    return NextResponse.json({ error: "Could not create session." }, { status: 500 });
  }

  const jar = await cookies();
  jar.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: getSessionMaxAgeSec(),
    path: "/",
  });

  return NextResponse.json({ ok: true });
}
