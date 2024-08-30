"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"


// import { useRenameModal } from "@/store/use-rename-modal";

import { FormEventHandler, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { toast } from "sonner";
import { useCalendarModal } from "@/store/use-calendar-modal";



export const CalendarModal = () => {

  const {
    isOpen,
    onClose,
    // initialValues,
  } = useCalendarModal()


  // const [title, setTitle] = useState(initialValues.title);

  // useEffect(() => {
  //   setTitle(initialValues.title);
  // },[initialValues.title]);


  const onSubmit = () => {}


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Title</DialogTitle>
          <DialogDescription>
            Enter a new title for your board
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4">
          <DialogFooter>
            <Button disabled={true} type="submit">Save changes</Button>
          </DialogFooter>
        </form>

      </DialogContent>
    </Dialog>
  )
}
