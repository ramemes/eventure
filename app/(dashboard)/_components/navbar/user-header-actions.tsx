"use client";

import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { AuthLoading, Authenticated, Unauthenticated } from "convex/react";

export const UserHeaderActions = () => {
  return (
    <div className="space-x-2 flex items-center">
      <Unauthenticated>
        <Button asChild>
          <SignInButton />
        </Button>
        <Button variant="outline" asChild>
          <SignUpButton />
        </Button>
      </Unauthenticated>
      <Authenticated>
        <UserButton />
      </Authenticated>
      <AuthLoading>
        Loading...
      </AuthLoading>
    </div>
  )
};

