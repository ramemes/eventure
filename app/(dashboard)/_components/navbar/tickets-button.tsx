import { Button } from "@/components/ui/button";
import { btnStyles, iconStyles } from "@/styles/styles";
import { Ticket } from "lucide-react";

export const TicketsButton = () => {
  return (
    <div 
      className="flex items-center gap-2 cursor-pointer p-2 px-3 
      rounded-xl hover:opacity-80 hover:bg-gray-100"
    >
      <Ticket className={iconStyles}/>
      Tickets
    </div>
  )
};

