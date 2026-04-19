import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import {
  appendRegistration,
  type RegistrationRecord,
} from "@/lib/registrations";

const CHILD_IDENTITY = [
  "female",
  "male",
  "prefer-not",
  "other",
] as const;

const GRADE = ["1", "2", "3", "4", "5", "6", "7"] as const;
const SOCCER_LEVEL = ["none", "recreational", "competitive"] as const;
const POSITION = [
  "center-back",
  "wing-back",
  "midfielder",
  "winger",
  "striker",
  "goalkeeper",
  "not-sure",
  "other",
] as const;

const ATTENDANCE = ["whole-week", "other"] as const;

function isNonEmpty(s: unknown): s is string {
  return typeof s === "string" && s.trim().length > 0;
}

function trimStr(v: unknown, max: number): string {
  if (typeof v !== "string") return "";
  return v.trim().slice(0, max);
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const parentEmail = trimStr(body.parentEmail, 320);
  const parentPhone = trimStr(body.parentPhone, 80);
  const emergencyContact = trimStr(body.emergencyContact, 500);
  const childName = trimStr(body.childName, 200);
  const childIdentity = body.childIdentity;
  const childIdentityOther = trimStr(body.childIdentityOther, 200);
  const gradeEntering = body.gradeEntering;
  const soccerLevel = body.soccerLevel;
  const position = body.position;
  const positionOther = trimStr(body.positionOther, 200);
  const attendance = body.attendance;
  const attendanceDetail = trimStr(body.attendanceDetail, 500);
  const authorize911 =
    body.authorize911 === true || body.authorize911 === "true";
  const healthNotes = trimStr(body.healthNotes, 2000);

  if (
    !isNonEmpty(parentEmail) ||
    !isNonEmpty(parentPhone) ||
    !isNonEmpty(emergencyContact) ||
    !isNonEmpty(childName)
  ) {
    return NextResponse.json(
      { error: "Please fill in all required contact and player fields." },
      { status: 400 },
    );
  }

  if (!CHILD_IDENTITY.includes(childIdentity as (typeof CHILD_IDENTITY)[number])) {
    return NextResponse.json(
      { error: "Please select how your child identifies." },
      { status: 400 },
    );
  }
  const ci = childIdentity as RegistrationRecord["childIdentity"];
  if (ci === "other" && !isNonEmpty(childIdentityOther)) {
    return NextResponse.json(
      { error: "Please specify how your child identifies." },
      { status: 400 },
    );
  }

  if (!GRADE.includes(gradeEntering as (typeof GRADE)[number])) {
    return NextResponse.json(
      { error: "Please select the grade your child is entering." },
      { status: 400 },
    );
  }

  if (!SOCCER_LEVEL.includes(soccerLevel as (typeof SOCCER_LEVEL)[number])) {
    return NextResponse.json(
      { error: "Please select a soccer experience level." },
      { status: 400 },
    );
  }

  if (!POSITION.includes(position as (typeof POSITION)[number])) {
    return NextResponse.json(
      { error: "Please select a position." },
      { status: 400 },
    );
  }
  const pos = position as RegistrationRecord["position"];
  if (pos === "other" && !isNonEmpty(positionOther)) {
    return NextResponse.json(
      { error: "Please describe your child’s position." },
      { status: 400 },
    );
  }

  if (!ATTENDANCE.includes(attendance as (typeof ATTENDANCE)[number])) {
    return NextResponse.json(
      { error: "Please select whole week or drop-in." },
      { status: 400 },
    );
  }
  const att = attendance as RegistrationRecord["attendance"];
  if (att === "other" && !isNonEmpty(attendanceDetail)) {
    return NextResponse.json(
      { error: "Please state which drop-in day(s) your child will attend." },
      { status: 400 },
    );
  }

  if (!authorize911) {
    return NextResponse.json(
      {
        error:
          "You must authorize Kick4Kause to contact emergency medical services (e.g. 911) if needed.",
      },
      { status: 400 },
    );
  }

  const record: RegistrationRecord = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    parentEmail: parentEmail.toLowerCase(),
    parentPhone,
    emergencyContact,
    childName,
    childIdentity: ci,
    childIdentityOther: ci === "other" ? childIdentityOther.trim() : "",
    gradeEntering: gradeEntering as RegistrationRecord["gradeEntering"],
    soccerLevel: soccerLevel as RegistrationRecord["soccerLevel"],
    position: pos,
    positionOther: pos === "other" ? positionOther.trim() : "",
    attendance: att,
    attendanceDetail: att === "other" ? attendanceDetail.trim() : "",
    authorize911: true,
    healthNotes,
  };

  try {
    await appendRegistration(record);
  } catch {
    return NextResponse.json(
      { error: "Could not save registration. Try again later." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, id: record.id });
}
