"use client";

import { UserHeaderActions } from "./user-header-actions";
import { SearchInput } from "./search-input";
import { NavButton } from "./nav-button";
import { Heart, Plus, Ticket } from "lucide-react";
import { btnStyles, iconStyles } from "@/styles/styles";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export const NavBar = () => {
  const router = useRouter()
  const user = useUser()
  const publicMetadata = user.user?.publicMetadata


  const createEvent = () => {
    router.push("/manage/create-event")
  } 


  return (
    <nav className="flex items-center justify-between w-full h-18 p-4 gap-4  border-b border-gray-100"> 
      <Link href="/" className="flex items-center gap-3  mr-1 flex-shrink-0">
      <Image
          src="/logo.svg"
          alt="Eventure Logo"
          width={40}
          height={40}
          className="object-contain"
        />
        <p className="text-xl font-bold text-gray-900">Eventure</p>
      </Link>

      <div className="w-full min-w-72 max-sm:hidden">
        <SearchInput/>
      </div> 
      {(user.isSignedIn &&
        <div className="flex items-center justify-end w-full gap-x-2">
          {
          publicMetadata && publicMetadata.role === "admin" ?
            <Button  className={cn(btnStyles, "mx-2 bg-blue-500 hover:bg-blue-400")} onClick={createEvent}>
              <Plus className={iconStyles}/>
              Create Event
            </Button>
            :
            null
        }


          <NavButton className="max-lg:flex-col gap-1" onClick={() => {router.push("/tickets")}}>
            <Ticket className={iconStyles}/>
            Tickets
          </NavButton>


        </div> 
      )}
      

      <UserHeaderActions/>


  </nav>
  )
};

