"use client";

import { NavBar } from "./_components/navbar/navbar";

const DashboardLayout = ( {
  children
}: { children: React.ReactNode } ) => {
  return (
    <main className="flex flex-col items-center h-full w-full gap-4 min-w-80">
      <NavBar/>
      {children}
    </main>
  )
};

export default DashboardLayout;
