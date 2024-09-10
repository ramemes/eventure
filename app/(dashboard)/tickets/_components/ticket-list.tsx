import { useQuery } from "convex/react";
import { TicketCard } from "./ticket-card";
import { api } from "@/convex/_generated/api";
import { Loader } from "lucide-react";

export const TicketList = () => {
  const userTickets = useQuery(api.tickets.getUserTickets);

  return (
    <div className="flex flex-col items-center w-full gap-5 mt-8 p-10 max-w-[1200px]">
      {!userTickets ? (
        <Loader className="animate-spin text-gray-500" />
      ) : (
        userTickets.map((ticket) => (
          <TicketCard key={ticket._id} ticket={ticket} />
        ))
      )}
    </div>
  );
};
