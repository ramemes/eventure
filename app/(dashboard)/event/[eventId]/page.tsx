"use client";

import { Loading } from "@/components/auth/loading";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { Heart } from "lucide-react";
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


interface EventPageProps {
  params: {
    eventId: string;
  }
}

export default function EventPage({
  params,
}: EventPageProps) {

  const event = useQuery(api.events.getEvent, {eventId: params.eventId as Id<"events">})

  if (!event) {
    return <Loading/>
  }
  const dateString = formatTimestamp(event.date)

  return (
    <div className="flex flex-col w-full h-full p-8 max-w-7xl space-y-2">
      <Image
        alt={event.title}
        src="/event.svg"
        width={1300}
        height={675}
        
        className="rounded-3xl"
      />
      
      <div className="flex flex-col justify-between p-4 gap-3">
        <div className="flex items-center justify-between">
          <p className="bg-green-200 px-3 p-1 rounded-lg font-semibold text-sm">
            Just Added
          </p>

          <TooltipProvider delayDuration={150}>
            <Tooltip>
              <TooltipTrigger>
                <NavButton>
                  <Heart className={iconStyles}/>
                </NavButton>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Like event</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

        </div>
        <div className="flex flex-col gap-3 p-2">
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

      </div>

    </div>
  );
}
