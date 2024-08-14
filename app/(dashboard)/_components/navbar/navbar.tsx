import { UserHeaderActions } from "./user-header-actions";
import { SearchInput } from "./search-input";
import { NavButton } from "./nav-button";
import { Heart, Plus, Ticket } from "lucide-react";
import { btnStyles, iconStyles } from "@/styles/styles";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";

import { useMutation, useQuery } from "@tanstack/react-query";
import { convexQuery, useConvexMutation } from "@convex-dev/react-query";
import { api } from "@/convex/_generated/api";

export const NavBar = () => {

  const { mutate, isPending } = useMutation({
    mutationFn: useConvexMutation(api.events.createEvent),
  });

  const createEvent = () => {
    mutate({
      title: "Test Title",
      description: "This is an event description"
    })
  } 


  return (
    <nav className="flex items-center justify-between w-full h-16 p-4 gap-4"> 
      <div className="flex items-center gap-4 w-full">
        Eventure
        
        <SearchInput/>
      </div> 
      <div className="flex items-center justify-end w-full gap-x-2 px-2">
        <Button className={cn(btnStyles, "mx-2")} onClick={createEvent}>
          <Plus className={iconStyles}/>
          Create Event
        </Button>

        <NavButton>
          <Ticket className={iconStyles}/>
          Tickets
        </NavButton>

        <NavButton>
          <Heart className={iconStyles}/>
          Likes
        </NavButton>

      </div> 

      <UserHeaderActions/>


  </nav>
  )
};

