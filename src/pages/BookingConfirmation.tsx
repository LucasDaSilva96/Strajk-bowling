import { format } from 'date-fns';
import { useConfirmationStore } from '../store/confirmation';
import { useNavigate } from 'react-router-dom';

export default function BookingConfirmation() {
  const { recentBooking } = useConfirmationStore();
  const navigate = useNavigate();

  if (!recentBooking) return null;

  function handleGoBack() {
    navigate('/');
  }

  const date = format(new Date(recentBooking.when), 'dd MMM');

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

      <div className='w-full max-w-md h-[65dvh] overflow-y-auto flex flex-col items-center'>
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
              value={`${recentBooking.when.split('T')[1].slice(0, 5)}, ${date}`}
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
              value={recentBooking.people + ' pers'}
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
              value={
                recentBooking.lanes +
                (recentBooking.lanes > 1 ? ' lanes' : ' lane')
              }
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
              value={recentBooking.id}
              className='w-full border-2 rounded-sm py-3 px-4 border-[#441D81] text-xl'
            />
          </div>

          <div className='mt-auto space-y-3'>
            <div className='border-2 border-[#EC315A] rounded-sm  flex items-center justify-between p-2 w-[285px] text-[#EC315A] text-2xl'>
              <h2 className='font-semibold capitalize'>total</h2>
              <p>{recentBooking.price}sek</p>
            </div>

            <button
              onClick={handleGoBack}
              className='bg-[#EC315A] text-white w-[285px] font-bold text-2xl uppercase p-2 rounded-sm '
            >
              Sweet, lets go!
            </button>
          </div>
        </article>
      </div>
    </section>
  );
}
