import { useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useCalendarModal } from "@/store/use-calendar-modal";
import { Doc, Id } from "@/convex/_generated/dataModel";
import axios from "axios";


interface AddToCalendarButtonProps {
  event: Doc<"events">;
  eventId: Id<"events">;
}

export const AddToCalendarButton = ({
  event,
  eventId
}: AddToCalendarButtonProps) => {
  
  const {
    isOpen,
    onClose,
    onOpen 
  } = useCalendarModal()




  const addEventToCalendar = async () => {
    await fetch("/api/calendar", {
      method: "POST",
    body:         
      JSON.stringify({
        summary: event.title, 
        description: event.description, 
        date: event.date
      })
    })
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      console.log(data)
    })
  }


  return (
    <div>
      <Button 
        variant="default"
        className={cn("w-64 font-semibold text-md bg-black")} 
        // onClick={() => onOpen()}
        onClick={() => addEventToCalendar()}
      >
        Add To Google Calendar
      </Button>
    </div>
  )
};

