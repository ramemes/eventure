import { Loading } from "@/components/auth/loading";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useApiMutation } from "@/hooks/useApiMutation";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";

interface GetTicketButtonProps {
  eventId: Id<"events">;
  isAttending: boolean | Id<"tickets"> | null
}

export const GetTicketButton = ({
  eventId,
  isAttending
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



  
