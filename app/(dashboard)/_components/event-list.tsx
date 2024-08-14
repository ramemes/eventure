import { useQuery } from "convex/react";
import { EventCard } from "./event-card";
import { api } from "@/convex/_generated/api";

export const EventList = () => {

  const data = useQuery(api.events.getEvents) || []



  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3
      xl:grid-cols-4 2xl:grid-cols-4 gap-5 mt-8 pb-10">
        {data.map((event) => (
          <EventCard
            key={event._id}
            id={event._id}
            creationTime={event._creationTime}
            title={event.title}
            date={event.date}
            description={event.description}
            creatorId={event.creatorId}
            creatorName={event.creatorName}
          />
        ))}
      </div>
  )
};

