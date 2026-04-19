import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { listRegistrations } from "@/lib/registrations";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const rows = await listRegistrations();
  return NextResponse.json({ registrations: rows });
}
