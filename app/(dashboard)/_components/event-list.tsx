import { EventCard } from "./event-card";
import { useQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "@/convex/_generated/api";

export const EventList = () => {

  const { data, isPending, error } = useQuery({
    ...convexQuery(api.events.getEvents, { id: 123 } as any),
    initialData: []
  })

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
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

