import { Loading } from "@/components/auth/loading";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { formatTimestamp } from "@/utils";
import { useQuery } from "convex/react";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface TicketCardProps {
  // eventId: Id<"events">;
  // ticketId: Id<"tickets">;
  // purchaseDate: number
  ticket: Doc<"tickets">
}

export const TicketCard = ({
  // eventId,
  // ticketId,
  // purchaseDate
  ticket
}: TicketCardProps) => {
  const event = useQuery(api.events.getEvent, {eventId: ticket.eventId })

  if (!event) {
    return (
      <Loader className="animate-spin"/>
    )
  }  

  return (
    <Link 
      href={{
        pathname:`/tickets/${ticket._id}`      
      }}
      className="flex w-full p-4 rounded-lg"

    >
      <Image
        alt={event.title}
        src="/event.svg"
        width={300}
        height={25}
        className="rounded-3xl"
      />
      <div className="flex flex-col p-5 justify-center">
        <p className="text-xl font-semibold py-1">{event.title} </p>
        <p className="text-sm text-zinc-500">
          {formatTimestamp(event.startTime, false)} {formatTimestamp(event.endTime, true)}
        </p> 
        <p className="text-sm text-zinc-500">placed on: {formatTimestamp(ticket._creationTime, false)}</p>
      </div>
    </Link>
  )
};

