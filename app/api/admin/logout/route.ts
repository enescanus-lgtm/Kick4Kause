import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE } from "@/lib/auth";

export async function POST() {
  const jar = await cookies();
  jar.delete(ADMIN_SESSION_COOKIE);
  return NextResponse.json({ ok: true });
}
