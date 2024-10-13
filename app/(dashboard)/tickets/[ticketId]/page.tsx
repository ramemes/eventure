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
  };
}

const TicketPage = ({ params }: TicketPageProps) => {
  const router = useRouter();

  const ticketEvent = useQuery(api.tickets.getTicketEvent, {
    ticketId: params.ticketId as Id<"tickets">,
  });

  const { mutate, pending } = useApiMutation(api.tickets.deleteTicket);

  if (!ticketEvent || !ticketEvent.event) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader className="animate-spin text-gray-500" />
      </div>
    );
  }

  const onCancelOrder = async () => {
    mutate({ ticketId: ticketEvent._id });
    router.push("/tickets");
  };

  return (
    <div className="flex flex-col p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">{ticketEvent.event.title}</h1>
      <div className="text-sm text-gray-600 mb-6">
        <p>
          <strong>Event Time:</strong> {formatTimestamp(ticketEvent.event.startTime, false)} {formatTimestamp(ticketEvent.event.endTime, true)}
        </p>
        <p>
          <strong>Order Placed:</strong> {formatTimestamp(ticketEvent._creationTime, false)}
        </p>
      </div>

      <div className="flex items-center justify-between mt-6">
        <ConfirmModal
          header="Cancel Order"
          description="Are you sure you want to cancel this order? This action cannot be undone."
          onConfirm={onCancelOrder}
        >
          <Button
            variant="destructive"
            className="bg-red-500 text-white hover:bg-red-600 focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
            disabled={pending}
          >
            {pending ? "Cancelling..." : "Cancel Order"}
          </Button>
        </ConfirmModal>
      </div>
    </div>
  );
};

export default TicketPage;
