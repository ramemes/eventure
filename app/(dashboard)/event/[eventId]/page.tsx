"use client";

import { Loading } from "@/components/auth/loading";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { Heart, Loader } from "lucide-react";
import Image from "next/image";
import { NavButton } from "../../_components/navbar/nav-button";
import { iconStyles } from "@/styles/styles";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { formatTimestamp } from "@/utils";
import { Button } from "@/components/ui/button";
import { GetTicketButton } from "./_components/get-ticket-button";


interface EventPageProps {
  params: {
    eventId: string;
  }
}

export default function EventPage({
  params,
}: EventPageProps) {

  const isAttending = useQuery(api.tickets.isAttending, {
    eventId: params.eventId as Id<"events">
  })  
  const event = useQuery(api.events.getEvent, {eventId: params.eventId as Id<"events">})

  if (!event) {
    return <Loading/>
  }
  const dateString = formatTimestamp(event.date)

  return (
    <div className="flex flex-col w-full  h-full p-8 max-w-7xl space-y-2">
      <Image
        alt={event.title}
        src="/event.svg"
        width={1300}
        height={675}
        className="rounded-3xl"
      />
      
      <div className="flex justify-between w-full h-full">

        <div className="flex flex-col w-full h-full gap-3 py-4">
          <p className="bg-green-200 px-3 p-1 rounded-lg font-semibold text-sm w-fit">
            Just Added
          </p>
          <p className="font-medium text-sm">
              {dateString}
            </p>
            <p className="font-extrabold text-3xl mb-3">
              {event.title}
            </p>
            <p className="font-medium text-sm">
              {event.description}
            </p>
          </div>

        <div className="flex flex-col py-4 gap-3 items-end ">
          <TooltipProvider delayDuration={150}>
              <Tooltip>
                <TooltipTrigger>
                  <NavButton className="px-4">
                    <Heart className={iconStyles}/>
                  </NavButton>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Like event</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <div className="flex flex-col items-center gap-4 border rounded-lg border-gray-300 sticky top-8 p-5">

              {isAttending === undefined ? <Loader className="animate-spin"/> :
                <GetTicketButton
                  eventId={event._id}
                  isAttending={isAttending}
                />
              }

            </div>
        </div>

      </div>
      
    </div>

  );
}
