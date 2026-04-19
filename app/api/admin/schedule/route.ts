import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { readSchedule, writeSchedule } from "@/lib/schedule";
import type { ScheduleData } from "@/lib/schedule-model";

function isValidPayload(v: unknown): v is ScheduleData {
  if (!v || typeof v !== "object") return false;
  const o = v as Record<string, unknown>;
  if (!Array.isArray(o.weekdays) || o.weekdays.length === 0) return false;
  if (o.weekdays.length > 14) return false;
  for (const d of o.weekdays) {
    if (!d || typeof d !== "object") return false;
    const day = d as Record<string, unknown>;
    if (typeof day.day !== "string" || day.day.length > 40) return false;
    if (!Array.isArray(day.blocks) || day.blocks.length > 12) return false;
    for (const b of day.blocks) {
      if (!b || typeof b !== "object") return false;
      const bb = b as Record<string, unknown>;
      if (typeof bb.time !== "string" || bb.time.length > 80) return false;
      if (typeof bb.label !== "string" || bb.label.length > 500) return false;
    }
  }
  if (typeof o.sidebarTitle !== "string" || o.sidebarTitle.length > 120)
    return false;
  if (typeof o.sidebarBody !== "string" || o.sidebarBody.length > 2000)
    return false;
  return true;
}

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const schedule = await readSchedule();
  return NextResponse.json(schedule);
}

export async function PUT(req: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }
  if (!isValidPayload(body)) {
    return NextResponse.json({ error: "Invalid schedule shape." }, { status: 400 });
  }
  await writeSchedule(body);
  return NextResponse.json({ ok: true });
}
