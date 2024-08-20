import { Loading } from "@/components/auth/loading";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { Loader, Loader2Icon } from "lucide-react";
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
    <Link href={`/tickets/${ticketId}`}>

      {event.title} 
      {event.description}
      {event.date} 
      {event.creatorName} 
      Date ordered: {purchaseDate}

    </Link>
  )
};

