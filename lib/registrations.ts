import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const REG_FILE = path.join(DATA_DIR, "registrations.json");

/** Current camp registration form (stored in JSON). */
export type RegistrationRecord = {
  id: string;
  createdAt: string;
  parentEmail: string;
  parentPhone: string;
  emergencyContact: string;
  childName: string;
  childIdentity: "female" | "male" | "prefer-not" | "other";
  /** Required when childIdentity is "other". */
  childIdentityOther: string;
  gradeEntering: "1" | "2" | "3" | "4" | "5" | "6" | "7";
  soccerLevel: "none" | "recreational" | "competitive";
  position:
    | "center-back"
    | "wing-back"
    | "midfielder"
    | "winger"
    | "striker"
    | "goalkeeper"
    | "not-sure"
    | "other";
  /** Required when position is "other". */
  positionOther: string;
  attendance: "whole-week" | "other";
  /** Drop-in day(s) when attendance is "other". */
  attendanceDetail: string;
  authorize911: boolean;
  healthNotes: string;
};

/** Older demo form rows (still in some JSON files). */
export type LegacyRegistrationRecord = {
  id: string;
  createdAt: string;
  guardianName: string;
  email: string;
  phone: string;
  playerName: string;
  playerAge: number;
  program: string;
  experience: string;
  notes: string;
};

export type StoredRegistration = RegistrationRecord | LegacyRegistrationRecord;

export function isLegacyRegistration(
  r: StoredRegistration,
): r is LegacyRegistrationRecord {
  return (
    "playerName" in r &&
    typeof (r as LegacyRegistrationRecord).playerName === "string" &&
    !("childName" in r)
  );
}

async function ensureFile() {
  await mkdir(DATA_DIR, { recursive: true });
  try {
    await readFile(REG_FILE, "utf8");
  } catch {
    await writeFile(REG_FILE, "[]\n", "utf8");
  }
}

export async function appendRegistration(
  record: RegistrationRecord,
): Promise<void> {
  await ensureFile();
  const raw = await readFile(REG_FILE, "utf8");
  const list = JSON.parse(raw) as StoredRegistration[];
  list.push(record);
  await writeFile(REG_FILE, JSON.stringify(list, null, 2), "utf8");
}

export async function listRegistrations(): Promise<StoredRegistration[]> {
  await ensureFile();
  const raw = await readFile(REG_FILE, "utf8");
  try {
    const list = JSON.parse(raw) as unknown;
    if (!Array.isArray(list)) return [];
    return list as StoredRegistration[];
  } catch {
    return [];
  }
}
