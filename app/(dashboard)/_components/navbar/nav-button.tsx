import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { btnStyles, iconStyles } from "@/styles/styles";
import { Ticket } from "lucide-react";

interface NavButtonPRops {
  children: React.ReactNode
  className: string
}

export const NavButton = ({
  children,
  className
} : {children: React.ReactNode, className?: string}) => {
  return (
    <div 
      className={cn(`flex items-center gap-2 cursor-pointer p-2 px-3 
      rounded-xl hover:opacity-80 hover:bg-gray-200 transition duration-150`, className)}
    >
      {children}
    </div>
  )
};

