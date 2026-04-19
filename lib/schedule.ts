import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import {
  DEFAULT_SCHEDULE,
  type ScheduleData,
} from "@/lib/schedule-model";

export type { ScheduleBlock, ScheduleDay, ScheduleData } from "@/lib/schedule-model";

const DATA_DIR = path.join(process.cwd(), "data");
const SCHEDULE_FILE = path.join(DATA_DIR, "schedule.json");

function isScheduleData(v: unknown): v is ScheduleData {
  if (!v || typeof v !== "object") return false;
  const o = v as Record<string, unknown>;
  if (!Array.isArray(o.weekdays) || o.weekdays.length === 0) return false;
  for (const d of o.weekdays) {
    if (!d || typeof d !== "object") return false;
    const day = d as Record<string, unknown>;
    if (typeof day.day !== "string" || !Array.isArray(day.blocks)) return false;
    for (const b of day.blocks) {
      if (!b || typeof b !== "object") return false;
      const bb = b as Record<string, unknown>;
      if (typeof bb.time !== "string" || typeof bb.label !== "string")
        return false;
    }
  }
  if (typeof o.sidebarTitle !== "string" || typeof o.sidebarBody !== "string")
    return false;
  return true;
}

export async function readSchedule(): Promise<ScheduleData> {
  try {
    const raw = await readFile(SCHEDULE_FILE, "utf8");
    const data = JSON.parse(raw) as unknown;
    if (isScheduleData(data)) return data;
  } catch {
    /* missing or invalid */
  }
  return DEFAULT_SCHEDULE;
}

export async function writeSchedule(data: ScheduleData): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(SCHEDULE_FILE, JSON.stringify(data, null, 2), "utf8");
}
