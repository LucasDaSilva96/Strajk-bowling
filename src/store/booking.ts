import { create } from 'zustand';
import { BookingRequest } from '../types/Booking';

interface BookingState extends BookingRequest {
  setDate: (date: string) => void;
  setLanes: (lanes: number) => void;
  setPeople: (people: number) => void;
  setShoes: (shoes: number[]) => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  when: '',
  lanes: 0,
  people: 0,
  shoes: [],
  setDate: (date) => set({ when: date }),
  setLanes: (lanes) => set({ lanes }),
  setPeople: (people) => set({ people }),
  setShoes: (shoes) => set({ shoes }),
}));
