"use client";

import { Loading } from "@/components/auth/loading";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { Delete, Heart, Loader, TrashIcon } from "lucide-react";
import Image from "next/image";
import { NavButton } from "../../_components/navbar/nav-button";
import { btnStyles, iconStyles } from "@/styles/styles";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { formatTimestamp } from "@/utils";
import { Button } from "@/components/ui/button";
import { GetTicketButton } from "./_components/get-ticket-button";
import { useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { createEvent } from "@/convex/events";
import { useApiMutation } from "@/hooks/useApiMutation";
import { useRouter } from "next/navigation";

interface EventPageProps {
  params: {
    eventId: string;
  }
}

export default function EventPage({
  params,
}: EventPageProps) {

  const router = useRouter()
  const user = useUser()
  const publicMetadata = user.user?.publicMetadata

  const isAttending = useQuery(api.tickets.isAttending, {
    eventId: params.eventId as Id<"events">
  })  
  
  const event = useQuery(api.events.getEvent, {eventId: params.eventId as Id<"events">})
  const {mutate, pending} = useApiMutation(api.events.deleteEvent)


  if (!event) {
    return <Loading/>
  }

  const onDeleteEvent = () => {
    mutate({eventId: event._id})
    router.push("/")
  }
  
  const dateString = `${formatTimestamp(event.startTime, false)} ${formatTimestamp(event.endTime, true)}`
  console.log(event.startTime)
  return (
    <div className="flex flex-col w-full h-full p-8 max-w-7xl space-y-2">

      <div className="aspect-video bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl">
        <span>{event.title.charAt(0)}</span>
      </div>
      <div className="flex justify-between w-full h-full">

        <div className="flex flex-col w-full max-w-[70%] h-full gap-3 py-4 pt-8">

          <p className="font-medium text-sm text-gray-600">
            {dateString}
          </p>

          <p className="font-extrabold text-3xl mb-3 mr-10 text-wrap break-words max-w-full ">
            {event.title}
          </p>
          
          <p className="font-medium text-sm">
            {event.description}
          </p>
        </div>

        <div className="flex flex-col py-8 gap-3 items-end">

          <div className="flex flex-col items-center gap-4 border rounded-lg border-gray-300 sticky top-8 p-6 bg-white shadow-md ">
            {isAttending === undefined ? (
              <Loader className="animate-spin text-gray-500" />
            ) : (
              <GetTicketButton eventId={event._id} isAttending={isAttending} event={event} />
            )}
          </div>

          {
            publicMetadata && publicMetadata.role === "admin" ?
              <Button variant="destructive" disabled={pending} className="gap-3 my-1" onClick={onDeleteEvent}>
                <TrashIcon className={iconStyles}/>
                Delete Event
              </Button>
              :
              null
          }
        </div>

      </div>
      
    </div>
  );
}