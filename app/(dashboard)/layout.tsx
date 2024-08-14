"use client";

import { NavBar } from "./_components/navbar/navbar";

const DashboardLayout = ( {
  children
}: { children: React.ReactNode } ) => {
  return (
    <main className="flex flex-col items-center h-full w-full">
      <NavBar/>
      {children}
    </main>
  )
};

export default DashboardLayout;
