"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  DEFAULT_SCHEDULE,
  type ScheduleBlock,
  type ScheduleData,
  type ScheduleDay,
} from "@/lib/schedule-model";

function cloneSchedule(s: ScheduleData): ScheduleData {
  return JSON.parse(JSON.stringify(s)) as ScheduleData;
}

export function ScheduleEditor({ initial }: { initial: ScheduleData }) {
  const router = useRouter();
  const baseline = useMemo(() => cloneSchedule(initial), [initial]);
  const [data, setData] = useState<ScheduleData>(() => cloneSchedule(initial));
  const [status, setStatus] = useState<"idle" | "saving" | "ok" | "err">("idle");
  const [msg, setMsg] = useState("");

  function setDay(i: number, patch: Partial<ScheduleDay>) {
    setData((d) => {
      const weekdays = d.weekdays.map((x, j) =>
        j === i ? { ...x, ...patch } : x,
      );
      return { ...d, weekdays };
    });
  }

  function setBlock(dayIdx: number, blockIdx: number, patch: Partial<ScheduleBlock>) {
    setData((d) => {
      const weekdays = d.weekdays.map((day, di) => {
        if (di !== dayIdx) return day;
        const blocks = day.blocks.map((b, bi) =>
          bi === blockIdx ? { ...b, ...patch } : b,
        );
        return { ...day, blocks };
      });
      return { ...d, weekdays };
    });
  }

  function addBlock(dayIdx: number) {
    setData((d) => {
      const weekdays = d.weekdays.map((day, di) => {
        if (di !== dayIdx) return day;
        return {
          ...day,
          blocks: [...day.blocks, { time: "—", label: "New activity" }],
        };
      });
      return { ...d, weekdays };
    });
  }

  function removeBlock(dayIdx: number, blockIdx: number) {
    setData((d) => {
      const weekdays = d.weekdays.map((day, di) => {
        if (di !== dayIdx) return day;
        const blocks = day.blocks.filter((_, bi) => bi !== blockIdx);
        return { ...day, blocks: blocks.length ? blocks : [{ time: "—", label: "—" }] };
      });
      return { ...d, weekdays };
    });
  }

  function addDay() {
    setData((d) => ({
      ...d,
      weekdays: [
        ...d.weekdays,
        { day: "New day", blocks: [{ time: "—", label: "—" }] },
      ],
    }));
  }

  function removeDay(dayIdx: number) {
    setData((d) => ({
      ...d,
      weekdays: d.weekdays.filter((_, i) => i !== dayIdx),
    }));
  }

  async function save() {
    setStatus("saving");
    setMsg("");
    try {
      const res = await fetch("/api/admin/schedule", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const j = (await res.json()) as { error?: string };
      if (!res.ok) {
        setStatus("err");
        setMsg(j.error ?? "Could not save.");
        return;
      }
      setStatus("ok");
      setMsg("Saved! Public schedule updated.");
      router.refresh();
    } catch {
      setStatus("err");
      setMsg("Network error.");
    }
  }

  function resetLocal() {
    setData(cloneSchedule(baseline));
    setStatus("idle");
    setMsg("");
  }

  function restoreDefaults() {
    if (
      !window.confirm(
        "Replace schedules with the built-in default template? This does not save until you click Save changes.",
      )
    ) {
      return;
    }
    setData(cloneSchedule(DEFAULT_SCHEDULE));
    setStatus("idle");
    setMsg("Loaded defaults into the editor — click Save to write to disk.");
  }

  return (
    <div className="mt-8 space-y-8">
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={save}
          disabled={status === "saving"}
          className="k4k-focus k4k-btn-bounce rounded-full bg-k4k-sun px-6 py-3 text-sm font-extrabold text-k4k-forest shadow-[0_4px_0_rgba(20,83,45,0.35)] disabled:opacity-60"
        >
          {status === "saving" ? "Saving…" : "Save changes"}
        </button>
        <button
          type="button"
          onClick={resetLocal}
          className="k4k-focus rounded-full border-2 border-k4k-grass/40 bg-white px-5 py-3 text-sm font-extrabold text-k4k-forest hover:bg-k4k-spring/50"
        >
          Undo unsaved
        </button>
        <button
          type="button"
          onClick={restoreDefaults}
          className="k4k-focus rounded-full border-2 border-k4k-pop/40 bg-k4k-pop/10 px-5 py-3 text-sm font-extrabold text-k4k-pop-deep hover:bg-k4k-pop/20"
        >
          Load default template
        </button>
        <button
          type="button"
          onClick={addDay}
          className="k4k-focus rounded-full bg-k4k-pine px-5 py-3 text-sm font-extrabold text-white hover:bg-k4k-forest"
        >
          + Add day
        </button>
      </div>

      {msg ? (
        <p
          role="status"
          className={
            status === "err"
              ? "rounded-xl border-2 border-red-200 bg-red-50 px-4 py-2 text-sm font-bold text-red-800"
              : "rounded-xl border-2 border-k4k-grass/35 bg-k4k-mist px-4 py-2 text-sm font-bold text-k4k-pine"
          }
        >
          {msg}
        </p>
      ) : null}

      <div className="k4k-card space-y-3 p-5 sm:p-6">
        <p className="text-sm font-extrabold text-k4k-forest">
          Sidebar (right column on public page)
        </p>
        <label className="block">
          <span className="text-xs font-bold text-k4k-pine">Title</span>
          <input
            value={data.sidebarTitle}
            onChange={(e) =>
              setData((d) => ({ ...d, sidebarTitle: e.target.value }))
            }
            className="k4k-focus mt-1 w-full rounded-xl border-2 border-k4k-grass/30 px-3 py-2 font-semibold"
          />
        </label>
        <label className="block">
          <span className="text-xs font-bold text-k4k-pine">Body</span>
          <textarea
            value={data.sidebarBody}
            onChange={(e) =>
              setData((d) => ({ ...d, sidebarBody: e.target.value }))
            }
            rows={3}
            className="k4k-focus mt-1 w-full resize-y rounded-xl border-2 border-k4k-grass/30 px-3 py-2 font-semibold"
          />
        </label>
      </div>

      <div className="space-y-5">
        {data.weekdays.map((row, di) => (
          <div key={`${row.day}-${di}`} className="k4k-card p-5 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <label className="flex flex-1 items-center gap-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-k4k-pine">
                  Day name
                </span>
                <input
                  value={row.day}
                  onChange={(e) => setDay(di, { day: e.target.value })}
                  className="k4k-focus flex-1 rounded-xl border-2 border-k4k-grass/30 px-3 py-2 font-display text-xl text-k4k-forest"
                />
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => addBlock(di)}
                  className="rounded-full bg-k4k-spring px-3 py-1.5 text-xs font-extrabold text-k4k-forest ring-2 ring-k4k-grass/25"
                >
                  + Time slot
                </button>
                <button
                  type="button"
                  onClick={() => removeDay(di)}
                  className="rounded-full bg-k4k-pop/15 px-3 py-1.5 text-xs font-extrabold text-k4k-pop-deep ring-2 ring-k4k-pop/30"
                >
                  Remove day
                </button>
              </div>
            </div>
            <ul className="mt-4 space-y-3">
              {row.blocks.map((b, bi) => (
                <li
                  key={`${di}-${bi}`}
                  className="flex flex-col gap-2 rounded-xl border-2 border-k4k-grass/15 bg-k4k-cream/80 p-3 sm:flex-row sm:items-center"
                >
                  <input
                    value={b.time}
                    onChange={(e) =>
                      setBlock(di, bi, { time: e.target.value })
                    }
                    placeholder="Time"
                    className="k4k-focus w-full rounded-lg border border-k4k-grass/30 px-2 py-2 text-sm font-bold sm:w-40"
                  />
                  <input
                    value={b.label}
                    onChange={(e) =>
                      setBlock(di, bi, { label: e.target.value })
                    }
                    placeholder="What’s happening"
                    className="k4k-focus min-w-0 flex-1 rounded-lg border border-k4k-grass/30 px-2 py-2 text-sm font-semibold"
                  />
                  <button
                    type="button"
                    onClick={() => removeBlock(di, bi)}
                    className="shrink-0 rounded-lg bg-white px-2 py-2 text-xs font-extrabold text-k4k-pop-deep ring-1 ring-k4k-pop/30"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
