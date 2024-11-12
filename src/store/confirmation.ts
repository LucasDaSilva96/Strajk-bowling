import { create } from 'zustand';
import { BookingResponse } from '../types/Booking';
import { getLocalStorage, setLocalStorage } from '../services/localStorage';

interface ConfirmationState {
  bookings: BookingResponse[];
  recentBooking: BookingResponse | null;
  addBooking: (booking: BookingResponse) => void;
  deleteBooking: (bookingId: string) => void;
}

export const useConfirmationStore = create<ConfirmationState>((set) => ({
  bookings: getLocalStorage(),
  recentBooking: getLocalStorage().length > 0 ? getLocalStorage()[0] : null,
  addBooking: (booking) => {
    set((state) => {
      const updatedBookings = [...state.bookings, booking];
      setLocalStorage(updatedBookings);
      return { bookings: updatedBookings, recentBooking: booking };
    });
  },
  deleteBooking: (bookingId) =>
    set((state) => {
      const updatedBookings = state.bookings.filter(
        (booking) => booking.id !== bookingId
      );
      setLocalStorage(updatedBookings);
      return { bookings: updatedBookings };
    }),
}));
