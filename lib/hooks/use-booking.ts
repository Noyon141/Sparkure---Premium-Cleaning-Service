import { BookingDetailsFormValues } from "@/lib/validations/booking-validation";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BookingState {
  booking: BookingDetailsFormValues | null;
  setBooking: (data: BookingDetailsFormValues) => void;
  clearBooking: () => void;
}

export const useBooking = create<BookingState>()(
  persist(
    (set) => ({
      booking: null,
      setBooking: (data) => set({ booking: data }),
      clearBooking: () => set({ booking: null }),
    }),
    {
      name: "booking-storage",
    }
  )
);
