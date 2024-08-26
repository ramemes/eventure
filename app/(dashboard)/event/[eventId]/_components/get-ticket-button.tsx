import { AddToCalendar } from "@/components/add-to-calendar";
import { Loading } from "@/components/auth/loading";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useApiMutation } from "@/hooks/useApiMutation";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";

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

  const { mutate, pending } = useApiMutation(api.tickets.addTicket)

  const onEventSignUp = () => {
    mutate({
      eventId
    })
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
        <AddToCalendar event={event}/>
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



  
