import { create } from "zustand";

const defaultValues = { id: "", title: ""};

interface ICalendarModal {
  isOpen: boolean;
  // initialValues: typeof defaultValues;
  onOpen: () => void;
  onClose: () => void;
};

export const useCalendarModal = create<ICalendarModal>((set) => ({
  isOpen: false,
  onOpen: () => set({
    isOpen: true,
    // initialValues: { id, title},
  }),
  onClose: () => set({
    isOpen: false,
    // initialValues: defaultValues,
  }),
  // initialValues: defaultValues,
}))