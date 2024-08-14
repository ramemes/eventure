"use client";

import { AuthLoading, Authenticated, ConvexReactClient, Unauthenticated } from "convex/react";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { Loading } from "@/components/auth/loading";

import { ConvexQueryClient } from "@convex-dev/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface ConvexClientProviderProps {
  children: React.ReactNode
}


const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL
const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

const convex = new ConvexReactClient(convexUrl as string)

const convexQueryClient = new ConvexQueryClient(convex);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryKeyHashFn: convexQueryClient.hashFn(),
      queryFn: convexQueryClient.queryFn(),
    },
  },
});
convexQueryClient.connect(queryClient);

export const ConvexClientProvider = ( {
  children
}: ConvexClientProviderProps) => {
  return (
    <ClerkProvider publishableKey={publishableKey}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <QueryClientProvider client={queryClient}>
          <Authenticated>
            {children}
          </Authenticated>
          <Unauthenticated>
            {children}
          </Unauthenticated>
          <AuthLoading>
            <Loading />
          </AuthLoading>
        </QueryClientProvider>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  )
};

