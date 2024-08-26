"use client";

import { useEffect, useState } from "react";


import { RenameModal } from "@/components/modals/rename-modal";
import { CalendarModal } from "@/components/modals/calendar-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CalendarModal />
      <RenameModal />
    </>
  )
}