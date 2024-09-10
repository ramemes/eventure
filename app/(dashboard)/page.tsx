"use client";

import { EventList } from "./_components/event-list";

interface DashboardPageProps {
  searchParams: {
    search?: string;
  }
}

export default function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  return (
    <div className="flex flex-col items-start w-full h-full p-6 md:p-10 lg:p-12 xl:p-16 max-w-[1600px] mx-auto space-y-8">

      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Events
        </h2>
        <p className="text-lg text-gray-500">
          Explore upcoming events and stay updated.
        </p>
      </div>

      <div className="w-full">
        <EventList query={searchParams}/>
      </div>
    </div>
  );
}
