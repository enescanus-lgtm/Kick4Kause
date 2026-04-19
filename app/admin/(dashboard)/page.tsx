import type { Metadata } from "next";
import {
  isLegacyRegistration,
  type LegacyRegistrationRecord,
  type RegistrationRecord,
  type StoredRegistration,
} from "@/lib/registrations";
import { listRegistrations } from "@/lib/registrations";

export const metadata: Metadata = {
  title: "Admin dashboard",
};

const PROGRAM: Record<string, string> = {
  "full-week": "Full week (Aug 4–8) — $150",
  "drop-in-day": "Daily drop-in — $40/day",
  youth: "Youth league (U8–U12)",
  teen: "Teen squad (U13–U18)",
  "skills-camp": "Skills camp / clinic",
  "community-match": "Community match night",
};

const EXPERIENCE: Record<string, string> = {
  "first-time": "First organized soccer",
  club: "Rec / local club",
  travel: "Travel / competitive",
  other: "Other / returning",
};

const GRADE_LABEL: Record<string, string> = {
  "1": "1st",
  "2": "2nd",
  "3": "3rd",
  "4": "4th",
  "5": "5th",
  "6": "6th",
  "7": "7th",
};

const SOCCER_LABEL: Record<string, string> = {
  none: "No prior experience",
  recreational: "Recreational",
  competitive: "Competitive",
};

const POSITION_LABEL: Record<string, string> = {
  "center-back": "Center back",
  "wing-back": "Wing back",
  midfielder: "Midfielder",
  winger: "Winger",
  striker: "Striker / forward",
  goalkeeper: "Goal keeper",
  "not-sure": "Not sure",
  other: "Other",
};

const IDENTITY_LABEL: Record<string, string> = {
  female: "Female",
  male: "Male",
  "prefer-not": "Prefer not to say",
  other: "Other",
};

function formatWhen(iso: string) {
  try {
    const d = new Date(iso);
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(d);
  } catch {
    return iso;
  }
}

function formatIdentity(r: RegistrationRecord) {
  const base = IDENTITY_LABEL[r.childIdentity] ?? r.childIdentity;
  if (r.childIdentity === "other" && r.childIdentityOther.trim()) {
    return `${base}: ${r.childIdentityOther}`;
  }
  return base;
}

function formatPosition(r: RegistrationRecord) {
  const base = POSITION_LABEL[r.position] ?? r.position;
  if (r.position === "other" && r.positionOther.trim()) {
    return `${base}: ${r.positionOther}`;
  }
  return base;
}

function formatAttendance(r: RegistrationRecord) {
  if (r.attendance === "whole-week") return "Whole week";
  return r.attendanceDetail.trim() || "Drop-in (see detail)";
}

function formatLegacyProgram(r: LegacyRegistrationRecord) {
  return (
    <>
      <span className="font-semibold text-k4k-pine">
        {PROGRAM[r.program] ?? r.program}
      </span>
      <span className="mt-1 block text-xs text-k4k-black/55">
        {EXPERIENCE[r.experience] ?? r.experience}
      </span>
    </>
  );
}

export default async function AdminDashboardPage() {
  const rows = (await listRegistrations())
    .slice()
    .sort(
      (a: StoredRegistration, b: StoredRegistration) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

  return (
    <div>
      <h1 className="font-display text-3xl text-k4k-forest">
        Registrations 🧾
      </h1>
      <p className="mt-1 text-sm font-semibold text-k4k-black/60">
        {rows.length} sign-up{rows.length === 1 ? "" : "s"} stored in{" "}
        <code className="rounded bg-k4k-spring/60 px-1 font-mono text-xs">
          data/registrations.json
        </code>
      </p>

      {rows.length === 0 ? (
        <div className="k4k-card mt-8 p-8 text-center font-semibold text-k4k-black/65">
          No registrations yet. Try the public Register form!
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-2xl border-2 border-k4k-grass/25 bg-white shadow-[var(--shadow-k4k-soft)]">
          <table className="w-full min-w-[1100px] text-left text-sm">
            <thead>
              <tr className="border-b-2 border-k4k-grass/20 bg-k4k-spring/40 text-xs font-extrabold uppercase tracking-wider text-k4k-pine">
                <th className="px-4 py-3">When</th>
                <th className="px-4 py-3">Child</th>
                <th className="px-4 py-3">Grade / soccer</th>
                <th className="px-4 py-3">Identity / position</th>
                <th className="px-4 py-3">Week vs drop-in</th>
                <th className="px-4 py-3">Parent email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="min-w-[140px] px-4 py-3">Emergency</th>
                <th className="min-w-[120px] px-4 py-3">Notes</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r: StoredRegistration) =>
                isLegacyRegistration(r) ? (
                  <tr
                    key={r.id}
                    className="border-b border-k4k-grass/10 odd:bg-k4k-cream/50"
                  >
                    <td className="whitespace-nowrap px-4 py-3 font-medium text-k4k-black/75">
                      {formatWhen(r.createdAt)}
                    </td>
                    <td className="px-4 py-3 font-bold text-k4k-forest">
                      {r.playerName}
                    </td>
                    <td className="px-4 py-3 text-xs text-k4k-black/60">
                      Age {r.playerAge}
                    </td>
                    <td className="max-w-[200px] px-4 py-3 text-xs">
                      {formatLegacyProgram(r)}
                    </td>
                    <td className="px-4 py-3 text-xs text-k4k-black/55">
                      —
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold">{r.guardianName}</div>
                      <a
                        href={`mailto:${encodeURIComponent(r.email)}`}
                        className="text-k4k-leaf underline decoration-2 underline-offset-2"
                      >
                        {r.email}
                      </a>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <a
                        href={`tel:${encodeURIComponent(r.phone)}`}
                        className="text-k4k-pine underline"
                      >
                        {r.phone}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-xs text-k4k-black/55">—</td>
                    <td className="max-w-[200px] px-4 py-3 text-xs text-k4k-black/65">
                      {r.notes || "—"}
                    </td>
                  </tr>
                ) : (
                  <tr
                    key={r.id}
                    className="border-b border-k4k-grass/10 odd:bg-k4k-cream/50"
                  >
                    <td className="whitespace-nowrap px-4 py-3 font-medium text-k4k-black/75">
                      {formatWhen(r.createdAt)}
                    </td>
                    <td className="px-4 py-3 font-bold text-k4k-forest">
                      {r.childName}
                    </td>
                    <td className="px-4 py-3 text-xs leading-relaxed text-k4k-black/75">
                      <span className="font-semibold text-k4k-forest">
                        {GRADE_LABEL[r.gradeEntering] ?? r.gradeEntering} grade
                      </span>
                      <span className="mt-1 block">
                        {SOCCER_LABEL[r.soccerLevel] ?? r.soccerLevel}
                      </span>
                    </td>
                    <td className="max-w-[220px] px-4 py-3 text-xs leading-relaxed text-k4k-black/75">
                      <span className="block">{formatIdentity(r)}</span>
                      <span className="mt-1 block font-medium text-k4k-pine">
                        {formatPosition(r)}
                      </span>
                    </td>
                    <td className="max-w-[180px] px-4 py-3 text-xs leading-relaxed text-k4k-black/75">
                      {formatAttendance(r)}
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href={`mailto:${encodeURIComponent(r.parentEmail)}`}
                        className="text-k4k-leaf underline decoration-2 underline-offset-2"
                      >
                        {r.parentEmail}
                      </a>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <a
                        href={`tel:${encodeURIComponent(r.parentPhone)}`}
                        className="text-k4k-pine underline"
                      >
                        {r.parentPhone}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-xs leading-relaxed text-k4k-black/75">
                      {r.emergencyContact}
                    </td>
                    <td className="max-w-[220px] px-4 py-3 text-xs leading-relaxed text-k4k-black/65">
                      {r.healthNotes.trim() ? r.healthNotes : "—"}
                      <span className="mt-2 block text-[10px] font-semibold uppercase tracking-wide text-k4k-leaf">
                        911 OK
                      </span>
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      )}

      <div className="k4k-card-dark mt-8 p-5 text-sm font-semibold text-white/90">
        <p className="text-k4k-sun">Privacy tip</p>
        <p className="mt-1 text-white/75">
          This dashboard reads local JSON only. Keep{" "}
          <code className="rounded bg-white/10 px-1 font-mono text-xs">
            registrations.json
          </code>{" "}
          off public hosting or add a real database + roles later.
        </p>
      </div>
    </div>
  );
}
