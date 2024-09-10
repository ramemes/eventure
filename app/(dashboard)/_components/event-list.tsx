import { useQuery } from "convex/react";
import { EventCard } from "./event-card";
import { api } from "@/convex/_generated/api";

interface EventListProps {
  query: {
    search?: string;
  };
}

export const EventList = ({
  query
}: EventListProps) => {
  const data = useQuery(api.events.getEvents, {
    ...query
  }) || [];

  return (
    <div className="container mx-auto mt-12 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((event) => (
          <EventCard
            key={event._id}
            id={event._id}
            creationTime={event._creationTime}
            title={event.title}
            startTime={event.startTime}
            endTime={event.endTime}
            description={event.description}
            creatorId={event.creatorId}
            creatorName={event.creatorName}
          />
        ))}
      </div>
    </div>
  );
};
