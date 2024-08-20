
import { useQuery } from "convex/react";
import { TicketCard } from "./ticket-card";
import { api } from "@/convex/_generated/api";
import { Loading } from "@/components/auth/loading";
import { Loader, Loader2Icon } from "lucide-react";

export const TicketList = () => {

  const userTickets = useQuery(api.tickets.getUserTickets)



  return (
    <div className="flex flex-col items-center w-full gap-5 mt-8 pb-10">  
    {!userTickets ? <Loader className="animate-spin"/> :
      userTickets.map((ticket) => (
        
        <TicketCard 
          key={ticket._id}
          ticketId={ticket._id}
          eventId={ticket.eventId}
          purchaseDate={ticket._creationTime}
        />
      ))


    }    

    </div>
  )
};

