import axios from 'axios';
import { BookingRequest, BookingResponse } from '../../types/Booking';

const API_KEY = import.meta.env.VITE_API_KEY;

export const postBooking = async (data: BookingRequest) => {
  if (!API_KEY) return Promise.reject('API key not found');
  const response = await axios.post<BookingRequest, { data: BookingResponse }>(
    'https://h5jbtjv6if.execute-api.eu-north-1.amazonaws.com',
    data,
    {
      headers: {
        'x-api-key': API_KEY,
        'Content-Type': 'text/plain',
      },
    }
  );
  return response.data;
};
