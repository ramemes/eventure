import { Button } from "@/components/ui/button";
import { SignIn, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { UserHeaderActions } from "./user-header-actions";

export default function Home() {


  return (
    <main className="flex flex-col items-center  h-full w-full">
      <nav className="flex items-center justify-between w-full h-16 p-4"> 
        <div>
          Eventure
        </div> 
        <div>
 

          <UserHeaderActions/>
          
        </div>
      </nav>
      <div>
        awdaw
      </div>
    </main>
  );
}
