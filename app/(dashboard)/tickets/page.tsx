"use client";

import { TicketList } from "./_components/ticket-list";

const TicketsPage = () => {
  return (
    <div className="flex flex-col items-start w-full h-full p-6 md:p-10 lg:p-12 xl:p-16 max-w-[1600px] mx-auto space-y-8">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Your Tickets
        </h2>
        <p className="text-lg text-gray-500">
          Manage your tickets
        </p>
      </div>
    <TicketList/>
  </div>
  )
};

export default TicketsPage;
