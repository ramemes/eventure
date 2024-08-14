"use client";

import { Loading } from "@/components/auth/loading";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

interface EventPageProps {
  params: {
    eventId: string;
  }
}

export default function EventPage({
  params,
}: EventPageProps) {

  const event = useQuery(api.events.getEvent, {eventId: params.eventId as Id<"events">})

  if (!event) {
    return <Loading/>
  }

  return (
    <div className="flex flex-col w-full h-full p-8 max-w-7xl">
      {event.title}
    </div>
  );
}
