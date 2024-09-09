"use client";

import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { formatTimestamp } from '@/utils';
import { useQuery } from 'convex/react';
import { Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApiMutation } from '@/hooks/useApiMutation';
import { useRouter } from 'next/navigation';
import { ConfirmModal } from '@/components/modals/confirm-modal';


interface TicketPageProps {
  params: {
    ticketId: string;
  }
}

export const TicketPage = ({
  params
}: TicketPageProps) => {

  const router = useRouter()

  const ticketEvent = useQuery(api.tickets.getTicketEvent, {
    ticketId: params.ticketId as Id<"tickets">
  })

  const { mutate, pending } = useApiMutation(api.tickets.deleteTicket)

  if (!ticketEvent || !ticketEvent.event) {
    return (
      <Loader className="animate-spin"/>
    )
  }  

  const onCancelOrder = async () => {
    mutate({ ticketId: ticketEvent._id})

    await fetch("/api/calendar", {
      method: "DELETE",
    body:         
      JSON.stringify({
        calendarEventId: ticketEvent.googleEventId
      })
    })
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      console.log(data)
    })
    .catch((err)=>{
      console.log(err)
    })
    router.push("/tickets")

    }
    
  return (
    <div className="flex flex-col p-5 justify-center">
      <p className="text-xl font-semibold py-1">{ticketEvent.event.title} </p>
      <p className="text-sm text-zinc-500">
        {formatTimestamp(ticketEvent.event.startTime, false)} {formatTimestamp(ticketEvent.event.endTime, true)}
      </p> 
      <p className="text-sm text-zinc-500">placed on: {formatTimestamp(ticketEvent._creationTime, false)}</p>

      <div>
        <ConfirmModal 
          header="Cancel Order"
          description="Are you sure you want to cancel this order?"
          onConfirm={() => onCancelOrder()}
        >
          <Button>
            Cancel Order
          </Button>
        </ConfirmModal>

      </div>
    </div>
  )
};

export default TicketPage

