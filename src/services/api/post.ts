import axios from 'axios';
import { BookingRequest, BookingResponse } from '../../types/Booking';

const API_KEY = import.meta.env.VITE_API_KEY;

axios.defaults.headers.common['x-api-key'] = API_KEY;

export const postBooking = async (data: BookingRequest) => {
  const response = await axios.post<BookingRequest, { data: BookingResponse }>(
    'https://h5jbtjv6if.execute-api.eu-north-1.amazonaws.com',
    data
  );
  return response.data;
};
