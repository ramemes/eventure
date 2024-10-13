import { useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useCalendarModal } from "@/store/use-calendar-modal";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useApiMutation } from "@/hooks/useApiMutation";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { formatTimestampToISO8601 } from "@/utils";


interface AddToCalendarButtonProps {
  event: Doc<"events">;
  eventId: Id<"events">;
  ticketId: boolean | Id<"tickets">;
}

export const AddToCalendarButton = ({
  event,
  eventId,
  ticketId
}: AddToCalendarButtonProps) => {
  
  const {
    isOpen,
    onClose,
    onOpen 
  } = useCalendarModal()


  const { mutate, pending } = useApiMutation(api.tickets.addGoogleEvent)

  // const addEventToCalendar = async () => {
  //   await fetch("/api/calendar", {
  //     method: "POST",
  //   body:         
  //     JSON.stringify({
  //       summary: event.title, 
  //       description: event.description, 
  //       startTime: event.startTime,
  //       endTime: event.endTime
  //     })
  //   })
  //   .then((res) => {
  //     return res.json()
  //   })
  //   .then((data) => {
  //     console.log(data)
  //     mutate({
  //       ticketId,
  //       googleEventId: data.message.id
  //     })
  //   })
  //   .catch((err)=>{
  //     console.log(err)
  //   })
  // }


  
  const eventName = event.title.split(" ").join("+")
  const eventDescription = event.description.split(" ").join("+")
  const startTime = formatTimestampToISO8601(event.startTime)
  const endTime = formatTimestampToISO8601(event.endTime)

  const redirectUrl = `https://calendar.google.com/calendar/r/eventedit?text=${eventName}&dates=${startTime}Z/${endTime}Z&details=${eventDescription}&sf=true&output=xml`


  const redirectToCalendar = () => {

  }


  return (
    <div>
      <Button 
        variant="default"
        className={cn("w-64 font-semibold text-md bg-black")} 
        // onClick={() => addEventToCalendar()}
        // onClick={() => redirectToCalendar()}
        asChild
      >
        <Link href={redirectUrl} rel="noopener noreferrer" target="_blank"> 
          Add To Google Calendar
        </Link>
        
      </Button>
    </div>
  )
};

