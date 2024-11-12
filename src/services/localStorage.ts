import { BookingResponse } from '../types/Booking';

const localStorageKey = import.meta.env.VITE_LOCAL_STORAGE_KEY;

export const setLocalStorage = (booking: BookingResponse[]) => {
  localStorage.setItem(localStorageKey, JSON.stringify(booking));
};

export const getLocalStorage = (): BookingResponse[] => {
  const booking = localStorage.getItem(localStorageKey);
  return booking ? JSON.parse(booking) : [];
};
