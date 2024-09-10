import { AddToCalendarButton } from "@/components/add-to-calendar";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useApiMutation } from "@/hooks/useApiMutation";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface GetTicketButtonProps {
  eventId: Id<"events">;
  isAttending: boolean | Id<"tickets"> | null,
  event: Doc<"events">
}

export const GetTicketButton = ({
  eventId,
  isAttending,
  event
}: GetTicketButtonProps) => {
  const router = useRouter()
  const { user } = useUser()

  const { mutate, pending } = useApiMutation(api.tickets.addTicket)

  const onEventSignUp = () => {
    if (!user) {
      toast.error("You must be signed in to join an event")
    } else {
      mutate({
        eventId
      })
    }

  }


  if (isAttending) {
    return (
      <>        
        <Button 
          variant="amber" 
          className="w-64 font-semibold text-md" 
          disabled={pending}
          onClick={() => {router.push(`/tickets/${isAttending}`)}}
        >
          View reservation
        </Button>
        <AddToCalendarButton event={event} eventId={eventId} ticketId={isAttending}/>
      </>
    )
  }

  if (!isAttending) {
    return (
      <>        
        Free
        <Button 
          variant="amber" 
          className="w-64 font-semibold text-md" 
          disabled={pending}
          onClick={onEventSignUp}
        >
          Sign up for event
        </Button>
      </>
    )
  }
}



  
