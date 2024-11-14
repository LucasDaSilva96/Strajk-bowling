import { format } from 'date-fns';
import { BookingResponse } from '../../types/Booking';
import { Link } from 'react-router-dom';

type ConfirmationProps = {
  showBtn: boolean;
  booking: BookingResponse;
};

export default function Confirmation({ showBtn, booking }: ConfirmationProps) {
  // Format the date to 'dd MMM' format (e.g. 01 Jan)
  const date = format(new Date(booking.when), 'dd MMM');

  return (
    <div className='w-full max-w-md h-[65dvh]  flex flex-col items-center'>
      <article className='flex flex-col gap-1 items-center justify-center w-[375px] h-full'>
        <div className='relative uppercase p-2 w-[300px]'>
          <label
            htmlFor='when'
            className='text-sm font-semibold text-[#441D81] absolute -top-0.5 left-5 z-10 backdrop-blur-sm bg-[#FFF4F1] px-1'
          >
            When
          </label>
          <input
            type='text'
            name='when'
            id='when'
            disabled
            value={`${booking.when.split('T')[1].slice(0, 5)}, ${date}`}
            className='w-full border-2 rounded-sm py-3 px-4 border-[#441D81] text-xl'
          />
        </div>

        <div className='relative uppercase p-2 w-[300px]'>
          <label
            htmlFor='who'
            className='text-sm font-semibold text-[#441D81] absolute -top-0.5 left-5 z-10 backdrop-blur-sm bg-[#FFF4F1] px-1'
          >
            Who
          </label>
          <input
            type='text'
            name='who'
            id='who'
            disabled
            value={booking.people + ' pers'}
            className='w-full border-2 rounded-sm py-3 px-4 border-[#441D81] text-xl'
          />
        </div>

        <div className='relative uppercase p-2 w-[300px]'>
          <label
            htmlFor='lanes'
            className='text-sm font-semibold text-[#441D81] absolute -top-0.5 left-5 z-10 backdrop-blur-sm bg-[#FFF4F1] px-1'
          >
            Lanes
          </label>
          <input
            type='text'
            name='lanes'
            id='lanes'
            disabled
            value={booking.lanes + (booking.lanes > 1 ? ' lanes' : ' lane')}
            className='w-full border-2 rounded-sm py-3 px-4 border-[#441D81] text-xl'
          />
        </div>

        <div className='relative uppercase p-2 w-[300px]'>
          <label
            htmlFor='bookingNumber'
            className='text-sm font-semibold text-[#441D81] absolute -top-0.5 left-5 z-10 backdrop-blur-sm bg-[#FFF4F1] px-1'
          >
            Booking number
          </label>
          <input
            type='text'
            name='bookingNumber'
            id='bookingNumber'
            disabled
            value={booking.id}
            className='w-full border-2 rounded-sm py-3 px-4 border-[#441D81] text-xl'
          />
        </div>

        <div className='mt-auto flex flex-col gap-2'>
          <div className='border-2 border-[#EC315A] rounded-sm  flex items-center justify-between p-2 w-[285px] text-[#EC315A] text-2xl'>
            <h2 className='font-semibold capitalize'>total</h2>
            <p>{booking.price}sek</p>
          </div>

          {showBtn && (
            <Link
              to='/booking'
              className='bg-[#EC315A] text-white w-fu font-bold text-2xl uppercase p-2 rounded-sm text-center'
            >
              Sweet, lets go!
            </Link>
          )}
        </div>
      </article>
    </div>
  );
}
