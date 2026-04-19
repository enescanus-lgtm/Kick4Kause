export type ScheduleBlock = { time: string; label: string };
export type ScheduleDay = { day: string; blocks: ScheduleBlock[] };

export type ScheduleData = {
  weekdays: ScheduleDay[];
  sidebarTitle: string;
  sidebarBody: string;
};

const session =
  "Summer camp on the grass field — age-appropriate coaching, teamwork, and scrimmages.";

/** Safe to import from client components (no Node fs). */
export const DEFAULT_SCHEDULE: ScheduleData = {
  weekdays: [
    {
      day: "Monday, Aug 4",
      blocks: [{ time: "9:00 AM – 12:00 PM", label: session }],
    },
    {
      day: "Tuesday, Aug 5",
      blocks: [{ time: "9:00 AM – 12:00 PM", label: session }],
    },
    {
      day: "Wednesday, Aug 6",
      blocks: [{ time: "9:00 AM – 12:00 PM", label: session }],
    },
    {
      day: "Thursday, Aug 7",
      blocks: [{ time: "9:00 AM – 12:00 PM", label: session }],
    },
    {
      day: "Friday, Aug 8",
      blocks: [{ time: "9:00 AM – 12:00 PM", label: session }],
    },
  ],
  sidebarTitle: "Location & cause",
  sidebarBody:
    "Leigh High School (grass field). All camp proceeds go to Xavier Jesuit School. Daily drop-ins are welcome at $40 per day. Pack cleats or turf shoes, shin guards, water, and sunscreen — we will share arrival and parking details after sign-up.",
};
