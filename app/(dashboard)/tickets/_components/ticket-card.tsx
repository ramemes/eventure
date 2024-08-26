import { Loading } from "@/components/auth/loading";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { formatTimestamp } from "@/utils";
import { useQuery } from "convex/react";
import { Loader, Loader2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface TicketCardProps {
  eventId: Id<"events">;
  ticketId: Id<"tickets">;
  purchaseDate: number
}

export const TicketCard = ({
  eventId,
  ticketId,
  purchaseDate
}: TicketCardProps) => {
  const event = useQuery(api.events.getEvent, {eventId})

  if (!event) {
    return (
      <Loader className="animate-spin"/>
    )
  }  

  return (
    <Link 
      href={`/tickets/${ticketId}`}
      className="flex bg-red-200 w-full p-4 rounded-lg"
    >
      <Image
        alt={event.title}
        src="/event.svg"
        width={300}
        height={25}
        className="rounded-3xl"
      />
      <div className="flex flex-col p-4">
        <p className="text-xl font-bold">{event.title} </p>
        <p>{event.description}</p>
        <p>{formatTimestamp(event.date)}</p> 
        <p>by {event.creatorName}</p> 
        <p>Date ordered: {formatTimestamp(purchaseDate)}</p>
      </div>

    </Link>
  )
};

