import { z } from 'zod';
import { bookingSchema } from '../schema/booking';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { catchError } from '../services/catchError';
import { postBooking } from '../services/api/post';
import { BookingRequest } from '../types/Booking';
import { useConfirmationStore } from '../store/confirmation';
import { useNavigate } from 'react-router-dom';
import Book from '../components/forms/Book';
import { format } from 'date-fns';

export default function Booking() {
  // This is the addBooking function from the confirmation store
  const { addBooking } = useConfirmationStore();
  // This is the state for the shoes array
  const [shoesArray, setShoesArray] = useState([0]);
  // This is the state for the loading statement in the form button
  const [isLoading, setIsLoading] = useState(false);

  // This is the function to navigate to the confirmation page
  const navigate = useNavigate();

  // This is the function to submit the form
  async function onSubmit(values: z.infer<typeof bookingSchema>) {
    // Getting the values from the form
    const { when, time, lanes, people } = values;
    // Creating the date string (yyyy-MM-ddTHH:mm) for the API
    const DATE = format(new Date(when), 'yyyy-MM-dd') + 'T' + time;
    // Creating the object to post to the API
    const postObject: BookingRequest = {
      when: DATE,
      lanes: Number(lanes),
      people: Number(people),
      shoes: shoesArray,
    };

    try {
      // Setting the loading state to true
      setIsLoading(true);
      // Posting the booking to the API
      const res = await postBooking(postObject);
      // Adding the booking-response to the confirmation store
      addBooking(res);
      // Showing a success toast
      toast.success('Booking successfully created!🎉');
      return navigate('/booking/confirmation');
    } catch (error) {
      toast.error(catchError(error));
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <section className='w-full h-full flex flex-col items-center'>
      <div className='flex flex-col items-center gap-1 -mt-8'>
        <img
          src='/svgs/logo.svg'
          alt='logo'
          className='max-w-20 h-auto drop-shadow-lg'
        />
        <h1 className='text-[#EC315A] text-4xl font-bold uppercase drop-shadow'>
          Booking
        </h1>
      </div>

      <div className='w-[370px] flex items-center uppercase font-semibold text-[#441D81] text-lg justify-evenly'>
        <div className='p-[1px]  min-w-[20%] bg-[#441D81]' />
        <span>when,</span>
        <span>what & who</span>
        <div className='p-[1px] min-w-[20%] bg-[#441D81]' />
      </div>

      <Book
        onSubmit={onSubmit}
        setShoesArray={setShoesArray}
        shoesArray={shoesArray}
        isLoading={isLoading}
      />
    </section>
  );
}
