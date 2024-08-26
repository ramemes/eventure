"use client";

import { EventList } from "./_components/event-list";

export default function DashboardPage() {

  return (
    <div className="flex flex-col w-full h-full p-8 max-w-[1600px]">
      <h2 className="text-2xl font-semibold">Events</h2>
      <EventList/>
    </div>
  );
}
