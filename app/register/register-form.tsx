"use client";

import { useState } from "react";

function inputClass() {
  return "k4k-focus mt-2 w-full rounded-2xl border-2 border-k4k-grass/30 bg-white px-4 py-3.5 font-semibold text-k4k-forest outline-none placeholder:font-medium placeholder:text-k4k-black/35 focus:border-k4k-sky-deep";
}

function radioRow() {
  return "flex cursor-pointer items-start gap-3 rounded-xl border border-k4k-grass/20 bg-white/80 px-3 py-2.5 has-[:checked]:border-k4k-leaf has-[:checked]:bg-k4k-spring/40";
}

export function RegisterForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");
  const [childIdentity, setChildIdentity] = useState("");
  const [position, setPosition] = useState("");
  const [attendance, setAttendance] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    const form = e.currentTarget;
    const fd = new FormData(form);

    const parentEmail = String(fd.get("parentEmail") ?? "");
    const parentPhone = String(fd.get("parentPhone") ?? "");
    const emergencyContact = String(fd.get("emergencyContact") ?? "");
    const childName = String(fd.get("childName") ?? "");
    const childIdentityVal = String(fd.get("childIdentity") ?? "");
    const childIdentityOther = String(fd.get("childIdentityOther") ?? "");
    const gradeEntering = String(fd.get("gradeEntering") ?? "");
    const soccerLevel = String(fd.get("soccerLevel") ?? "");
    const positionVal = String(fd.get("position") ?? "");
    const positionOther = String(fd.get("positionOther") ?? "");
    const attendanceVal = String(fd.get("attendance") ?? "");
    const attendanceDetail = String(fd.get("attendanceDetail") ?? "");
    const authorize911 = fd.get("authorize911") === "on";
    const healthNotes = String(fd.get("healthNotes") ?? "");

    if (childIdentityVal === "other" && !childIdentityOther.trim()) {
      setStatus("error");
      setMessage("Please specify how your child identifies.");
      return;
    }
    if (positionVal === "other" && !positionOther.trim()) {
      setStatus("error");
      setMessage("Please describe your child’s position.");
      return;
    }
    if (attendanceVal === "other" && !attendanceDetail.trim()) {
      setStatus("error");
      setMessage("Please state which drop-in day(s) your child will attend.");
      return;
    }

    const payload = {
      parentEmail,
      parentPhone,
      emergencyContact,
      childName,
      childIdentity: childIdentityVal,
      childIdentityOther,
      gradeEntering,
      soccerLevel,
      position: positionVal,
      positionOther,
      attendance: attendanceVal,
      attendanceDetail,
      authorize911,
      healthNotes,
    };

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { error?: string; id?: string };
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong.");
        return;
      }
      setStatus("ok");
      setMessage(
        "You’re in! 🎉 We received your registration. The Kick4Kause team will follow up by email with payment and camp details. (This demo also saved a copy locally.)",
      );
      form.reset();
      setChildIdentity("");
      setPosition("");
      setAttendance("");
    } catch {
      setStatus("error");
      setMessage("Network error. Check your connection and try again.");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="k4k-card space-y-8 border-k4k-sun/35 p-8 sm:p-10"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="text-sm font-extrabold text-k4k-forest">
            Parent email *
          </span>
          <input
            name="parentEmail"
            type="email"
            required
            autoComplete="email"
            className={inputClass()}
            placeholder="you@example.com"
          />
        </label>

        <label className="block sm:col-span-2">
          <span className="text-sm font-extrabold text-k4k-forest">
            Parent phone number *
          </span>
          <input
            name="parentPhone"
            type="tel"
            required
            autoComplete="tel"
            className={inputClass()}
            placeholder="(555) 000-0000"
          />
        </label>

        <label className="block sm:col-span-2">
          <span className="text-sm font-extrabold text-k4k-forest">
            Emergency contact (name, phone number) *
          </span>
          <input
            name="emergencyContact"
            required
            autoComplete="off"
            className={inputClass()}
            placeholder="Jane Doe — (555) 123-4567"
          />
        </label>

        <label className="block sm:col-span-2">
          <span className="text-sm font-extrabold text-k4k-forest">
            What is your child&apos;s name (first / last)? *
          </span>
          <input
            name="childName"
            required
            autoComplete="name"
            className={inputClass()}
            placeholder="First Last"
          />
        </label>

        <fieldset className="sm:col-span-2">
          <legend className="text-sm font-extrabold text-k4k-forest">
            What does your child identify as? *
          </legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <label className={radioRow()}>
              <input
                type="radio"
                name="childIdentity"
                value="female"
                required
                className="k4k-focus mt-0.5 h-4 w-4 shrink-0 border-k4k-grass text-k4k-grass"
                onChange={() => setChildIdentity("female")}
              />
              <span className="text-sm font-semibold text-k4k-black/80">
                Female
              </span>
            </label>
            <label className={radioRow()}>
              <input
                type="radio"
                name="childIdentity"
                value="male"
                className="k4k-focus mt-0.5 h-4 w-4 shrink-0 border-k4k-grass text-k4k-grass"
                onChange={() => setChildIdentity("male")}
              />
              <span className="text-sm font-semibold text-k4k-black/80">
                Male
              </span>
            </label>
            <label className={radioRow()}>
              <input
                type="radio"
                name="childIdentity"
                value="prefer-not"
                className="k4k-focus mt-0.5 h-4 w-4 shrink-0 border-k4k-grass text-k4k-grass"
                onChange={() => setChildIdentity("prefer-not")}
              />
              <span className="text-sm font-semibold text-k4k-black/80">
                Prefer not to say
              </span>
            </label>
            <label className={radioRow()}>
              <input
                type="radio"
                name="childIdentity"
                value="other"
                className="k4k-focus mt-0.5 h-4 w-4 shrink-0 border-k4k-grass text-k4k-grass"
                onChange={() => setChildIdentity("other")}
              />
              <span className="text-sm font-semibold text-k4k-black/80">
                Other
              </span>
            </label>
          </div>
          {childIdentity === "other" ? (
            <label className="mt-3 block">
              <span className="text-xs font-semibold text-k4k-leaf">
                Please specify *
              </span>
              <input
                name="childIdentityOther"
                required
                className={inputClass()}
                placeholder="How your child identifies"
              />
            </label>
          ) : (
            <input type="hidden" name="childIdentityOther" value="" />
          )}
        </fieldset>

        <label className="block sm:col-span-2">
          <span className="text-sm font-extrabold text-k4k-forest">
            What grade is your child entering? (elementary through 7th grade) *
          </span>
          <select
            name="gradeEntering"
            required
            defaultValue=""
            className={`${inputClass()} focus:border-k4k-mint`}
          >
            <option value="" disabled>
              Select grade
            </option>
            <option value="1">1st grade</option>
            <option value="2">2nd grade</option>
            <option value="3">3rd grade</option>
            <option value="4">4th grade</option>
            <option value="5">5th grade</option>
            <option value="6">6th grade</option>
            <option value="7">7th grade</option>
          </select>
        </label>

        <fieldset className="sm:col-span-2">
          <legend className="text-sm font-extrabold text-k4k-forest">
            What level of soccer does your child play? *
          </legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            <label className={radioRow()}>
              <input
                type="radio"
                name="soccerLevel"
                value="none"
                required
                className="k4k-focus mt-0.5 h-4 w-4 shrink-0 border-k4k-grass text-k4k-grass"
              />
              <span className="text-sm font-semibold text-k4k-black/80">
                No prior experience
              </span>
            </label>
            <label className={radioRow()}>
              <input
                type="radio"
                name="soccerLevel"
                value="recreational"
                className="k4k-focus mt-0.5 h-4 w-4 shrink-0 border-k4k-grass text-k4k-grass"
              />
              <span className="text-sm font-semibold text-k4k-black/80">
                Recreational
              </span>
            </label>
            <label className={radioRow()}>
              <input
                type="radio"
                name="soccerLevel"
                value="competitive"
                className="k4k-focus mt-0.5 h-4 w-4 shrink-0 border-k4k-grass text-k4k-grass"
              />
              <span className="text-sm font-semibold text-k4k-black/80">
                Competitive
              </span>
            </label>
          </div>
        </fieldset>

        <fieldset className="sm:col-span-2">
          <legend className="text-sm font-extrabold text-k4k-forest">
            What position does your child play? *
          </legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {(
              [
                ["center-back", "Center back"],
                ["wing-back", "Wing back (right or left back)"],
                ["midfielder", "Midfielder"],
                ["winger", "Winger"],
                ["striker", "Striker / forward"],
                ["goalkeeper", "Goal keeper"],
                ["not-sure", "Not sure"],
                ["other", "Other"],
              ] as const
            ).map(([value, label], i) => (
              <label key={value} className={radioRow()}>
                <input
                  type="radio"
                  name="position"
                  value={value}
                  required={i === 0}
                  className="k4k-focus mt-0.5 h-4 w-4 shrink-0 border-k4k-grass text-k4k-grass"
                  onChange={() => setPosition(value)}
                />
                <span className="text-sm font-semibold text-k4k-black/80">
                  {label}
                </span>
              </label>
            ))}
          </div>
          {position === "other" ? (
            <label className="mt-3 block">
              <span className="text-xs font-semibold text-k4k-leaf">
                Please specify *
              </span>
              <input
                name="positionOther"
                required
                className={inputClass()}
                placeholder="Position or role"
              />
            </label>
          ) : (
            <input type="hidden" name="positionOther" value="" />
          )}
        </fieldset>

        <fieldset className="sm:col-span-2">
          <legend className="text-sm font-extrabold text-k4k-forest">
            Whole week or single-day drop-in? (If drop-in, say which day.) *
          </legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <label className={radioRow()}>
              <input
                type="radio"
                name="attendance"
                value="whole-week"
                required
                className="k4k-focus mt-0.5 h-4 w-4 shrink-0 border-k4k-grass text-k4k-grass"
                onChange={() => setAttendance("whole-week")}
              />
              <span className="text-sm font-semibold text-k4k-black/80">
                Whole week
              </span>
            </label>
            <label className={radioRow()}>
              <input
                type="radio"
                name="attendance"
                value="other"
                className="k4k-focus mt-0.5 h-4 w-4 shrink-0 border-k4k-grass text-k4k-grass"
                onChange={() => setAttendance("other")}
              />
              <span className="text-sm font-semibold text-k4k-black/80">
                Other (single day / partial week)
              </span>
            </label>
          </div>
          {attendance === "other" ? (
            <label className="mt-3 block">
              <span className="text-xs font-semibold text-k4k-leaf">
                Which day(s)? *
              </span>
              <input
                name="attendanceDetail"
                required
                className={inputClass()}
                placeholder="e.g. Wednesday Aug 6 only"
              />
            </label>
          ) : (
            <input type="hidden" name="attendanceDetail" value="" />
          )}
        </fieldset>

        <label className="flex items-start gap-3 rounded-2xl bg-k4k-spring/50 p-4 sm:col-span-2">
          <input
            name="authorize911"
            type="checkbox"
            value="on"
            required
            className="k4k-focus mt-1 h-5 w-5 shrink-0 rounded-md border-2 border-k4k-grass text-k4k-grass"
          />
          <span className="text-sm font-semibold leading-relaxed text-k4k-black/75">
            I authorize Kick4Kause to contact medical emergency authorities, such
            as 911, in case of any emergency situation regarding the player(s).
            *
          </span>
        </label>

        <label className="block sm:col-span-2">
          <span className="text-sm font-extrabold text-k4k-forest">
            Anything else we should know (health problems, allergies, etc.)?
          </span>
          <textarea
            name="healthNotes"
            rows={4}
            className={`${inputClass()} resize-y focus:border-k4k-pop`}
            placeholder="Optional — medications, allergies, accommodations…"
          />
        </label>
      </div>

      {message ? (
        <p
          role="status"
          className={
            status === "ok"
              ? "rounded-2xl border-2 border-k4k-grass/40 bg-k4k-mist px-4 py-3 text-sm font-extrabold text-k4k-forest"
              : "rounded-2xl border-2 border-red-200 bg-red-50 px-4 py-3 text-sm font-extrabold text-red-800"
          }
        >
          {message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "loading"}
        className="k4k-focus k4k-btn-bounce inline-flex w-full items-center justify-center rounded-full bg-k4k-sun px-8 py-4 text-sm font-extrabold text-k4k-forest shadow-[0_6px_0_rgba(20,83,45,0.35)] hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:scale-100 sm:w-auto"
      >
        {status === "loading" ? "Sending… ⚙️" : "Send it in! 🚀"}
      </button>
    </form>
  );
}
