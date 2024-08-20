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
import { useRouter } from "next/navigation";
import Link from "next/link";

export const NavBar = () => {
  const router = useRouter()
  const user = useUser()

  const { mutate, isPending } = useMutation({
    mutationFn: useConvexMutation(api.events.createEvent),
  });

  const createEvent = () => {
    router.push("/manage/create-event")
  } 


  return (
    <nav className="flex items-center justify-between w-full h-18 p-4 gap-4  border-b border-gray-100"> 
      <Link href="/">

        <p>Eventure</p>
      </Link>
        
      <div className="w-full min-w-72 ">
        <SearchInput/>
      </div> 
      {(user.isSignedIn &&
        <div className="flex items-center justify-end w-full gap-x-2">
          <Button  className={cn(btnStyles, "mx-2")} onClick={createEvent}>
            <Plus className={iconStyles}/>
            Create Event
          </Button>

          <NavButton className="max-lg:flex-col gap-1" onClick={() => {router.push("/tickets")}}>
            <Ticket className={iconStyles}/>
            Tickets
          </NavButton>

          <NavButton className="max-lg:flex-col gap-1">
            <Heart className={iconStyles}/>
            Likes
          </NavButton>
        </div> 
      )}
      

      <UserHeaderActions/>


  </nav>
  )
};

