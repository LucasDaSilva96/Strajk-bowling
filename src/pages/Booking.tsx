export default function Booking() {
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
    </section>
  );
}
