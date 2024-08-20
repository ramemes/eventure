"use client";

import { TicketList } from "./_components/ticket-list";

const TicketsPage = () => {
  return (
    <div className="flex flex-col w-full h-full p-8 max-w-[1600px]">
    <h2 className="text-2xl font-semibold">Your Tickets</h2>
    <TicketList/>
  </div>
  )
};

export default TicketsPage;
