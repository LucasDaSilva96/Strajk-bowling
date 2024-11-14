import { useConfirmationStore } from '../store/confirmation';
import { Link } from 'react-router-dom';
import Confirmation from '../components/forms/Confirmation';

export default function BookingConfirmation() {
  // Get the recent booking from the store
  const { recentBooking } = useConfirmationStore();

  // If no recent booking found, show a message
  if (!recentBooking) {
    return (
      <section className='w-full h-[80dvh] flex items-center justify-center'>
        <div className='flex flex-col items-center gap-4'>
          <h1 className='text-2xl font-semibold text-[#EC315A]'>
            No booking confirmation found
          </h1>
          <Link
            className='py-2 px-4 bg-black text-[#EC315A] rounded-md font-semibold uppercase mt-4'
            to={'/booking'}
          >
            Book now
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className='w-full h-full flex justify-center flex-col gap-2 items-center '>
      <div className='flex flex-col items-center gap-1 -mt-8'>
        <img
          src='/svgs/logo.svg'
          alt='logo'
          className='max-w-20 h-auto drop-shadow-lg'
        />
        <h1 className='text-[#EC315A] text-4xl font-bold uppercase drop-shadow'>
          See you soon!
        </h1>
      </div>

      <div className='w-[370px] flex items-center uppercase font-semibold text-[#441D81] text-lg justify-evenly'>
        <div className='p-[1px]  min-w-[25%] bg-[#441D81]' />
        <span>booking details</span>
        <div className='p-[1px] min-w-[25%] bg-[#441D81]' />
      </div>

      <Confirmation booking={recentBooking} showBtn={true} />
    </section>
  );
}
