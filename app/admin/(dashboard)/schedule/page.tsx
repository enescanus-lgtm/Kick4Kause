import type { Metadata } from "next";
import { ScheduleEditor } from "@/components/admin/schedule-editor";
import { readSchedule } from "@/lib/schedule";

export const metadata: Metadata = {
  title: "Edit schedule",
};

export default async function AdminSchedulePage() {
  const schedule = await readSchedule();

  return (
    <div>
      <h1 className="font-display text-3xl text-k4k-forest">
        Weekly schedule ✏️
      </h1>
      <p className="mt-1 max-w-2xl text-sm font-semibold text-k4k-black/65">
        Edits save to{" "}
        <code className="rounded bg-k4k-spring/60 px-1 font-mono text-xs">
          data/schedule.json
        </code>{" "}
        and show up on the public Schedule page immediately after refresh.
      </p>
      <ScheduleEditor initial={schedule} />
    </div>
  );
}
