import { useEffect, useState } from 'react';
import Confirmation from '../components/forms/Confirmation';
import { useConfirmationStore } from '../store/confirmation';
import { BookingResponse } from '../types/Booking';
import { motion } from 'motion/react';
import { boxVariants, pageVariants } from '../animation/animations';
import Heading from '../components/Heading';

export default function BookingOverview() {
  const { bookings } = useConfirmationStore();
  const [bookingsArray, setBookingsArray] =
    useState<BookingResponse[]>(bookings);

  const logo = 'Overview';

  useEffect(() => {
    if (bookings.length === 0) return;
    sortBookingsByDate();
  }, []);

  function sortBookingsByDate() {
    const sortedBookings = [...bookingsArray].sort((a, b) => {
      return new Date(a.when).getTime() - new Date(b.when).getTime();
    });
    setBookingsArray(sortedBookings);
  }

  function sortBookingsByAmountOfPeople() {
    const sortedBookings = [...bookingsArray].sort((a, b) => {
      return a.people - b.people;
    });
    setBookingsArray(sortedBookings);
  }

  function sortBookingsByLanes() {
    const sortedBookings = [...bookingsArray].sort((a, b) => {
      return a.lanes - b.lanes;
    });
    setBookingsArray(sortedBookings);
  }

  function onchange(e: React.ChangeEvent<HTMLSelectElement>) {
    if (e.target.value === 'Sort by date') {
      sortBookingsByDate();
    } else if (e.target.value === 'Sort by nr of players') {
      sortBookingsByAmountOfPeople();
    } else if (e.target.value === 'Sort by lanes') {
      sortBookingsByLanes();
    }
  }

  if (bookings.length === 0) {
    return (
      <motion.section
        className='w-full h-full flex flex-col items-center'
        initial={pageVariants.initial}
        animate={pageVariants.in}
        transition={pageVariants.transition}
        exit={pageVariants.out}
      >
        <div className='flex flex-col items-center gap-1 -mt-8'>
          <img
            src='/svgs/logo.svg'
            alt='logo'
            className='max-w-20 h-auto drop-shadow-lg'
          />
          <h1 className='text-[#EC315A] text-4xl font-bold uppercase drop-shadow'>
            Overview
          </h1>
        </div>

        <div className='w-[370px] flex items-center uppercase font-semibold text-[#441D81] text-lg justify-evenly'>
          <div className='p-[1px]  min-w-[20%] bg-[#441D81]' />
          <span>Overview of bookings</span>
          <div className='p-[1px] min-w-[20%] bg-[#441D81]' />
        </div>

        <div className='w-[370px] flex items-center uppercase font-semibold text-[#441D81] text-lg justify-evenly'>
          <div className='p-[1px]  min-w-[20%] bg-[#441D81]' />
          <span>No bookings yet</span>
          <div className='p-[1px] min-w-[20%] bg-[#441D81]' />
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      initial={pageVariants.initial}
      animate={pageVariants.in}
      transition={pageVariants.transition}
      exit={pageVariants.out}
      className='w-full h-full flex flex-col items-center'
    >
      <Heading logo={logo} subHeading='of bookings' />

      <motion.div
        initial={boxVariants.initial}
        animate={boxVariants.animate}
        transition={{ delay: 2, duration: 0.3, type: 'tween' }}
      >
        <select
          className='w-full max-w-sm p-2 rounded-sm border-2 border-[#441D81] text-xl uppercase font-semibold text-[#441D81] bg-[#FFF4F1] shadow-sm'
          name='sort bookings'
          id='sort-bookings'
          onChange={onchange}
          defaultValue={'Sort by date'}
        >
          <option value={'Sort by date'}>Sort by date</option>
          <option value={'Sort by nr of players'}>
            Sort by number of players
          </option>
          <option value={'Sort by lanes'}>Sort by lanes</option>
        </select>

        <div className='max-h-[400px] p-2 overflow-y-auto flex flex-col items-center gap-6'>
          {bookingsArray.map((booking) => (
            <div
              key={booking.id}
              className='py-2.5 rounded-sm shadow-sm border-[0.3px]'
            >
              <Confirmation booking={booking} showBtn={false} height='300px' />
            </div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}
