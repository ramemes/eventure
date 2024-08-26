import { useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useCalendarModal } from "@/store/use-calendar-modal";
import { Doc } from "@/convex/_generated/dataModel";
import { formatDateToGoogleCalendar } from "@/utils";

interface AddToCalendarProps {
  event: Doc<"events">
}

export const AddToCalendar = ( {
  event
}: AddToCalendarProps) => {
  
 const {
  isOpen,
  onClose,
  onOpen 
 } = useCalendarModal()

  const eventObj = {
    summary: event.title,
    description: event.description,
    start: {
      dateTime: formatDateToGoogleCalendar(event.date) ,
      timeZone: 'America/Los_Angeles',
    },
    end: {
      dateTime: '2024-01-01T17:00:00-07:00',
      timeZone: 'America/Los_Angeles',
    },
    location: '800 Howard St., San Francisco, CA 94103',
  };

  return (
    <div>
      <Button 
        variant="default"
        className={cn("w-64 font-semibold text-md bg-black")} 
        onClick={() => onOpen()}
      >
        Add To Google Calendar
      </Button>
    </div>
  )
};

