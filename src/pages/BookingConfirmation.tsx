import { useConfirmationStore } from '../store/confirmation';
import { Link } from 'react-router-dom';
import Confirmation from '../components/forms/Confirmation';
import { motion } from 'motion/react';
import { boxVariants, pageVariants } from '../animation/animations';
import Heading from '../components/Heading';

export default function BookingConfirmation() {
  // Get the recent booking from the store
  const { recentBooking } = useConfirmationStore();

  const logo = 'See#you#soon!';

  // If no recent booking found, show a message
  if (!recentBooking) {
    return (
      <motion.section
        initial={pageVariants.initial}
        animate={pageVariants.in}
        transition={pageVariants.transition}
        exit={pageVariants.out}
        className='w-full h-[80dvh] flex items-center justify-center'
      >
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
      </motion.section>
    );
  }

  return (
    <motion.section
      className='w-full h-full flex justify-center flex-col gap-1 items-center'
      initial={pageVariants.initial}
      animate={pageVariants.in}
      transition={pageVariants.transition}
      exit={pageVariants.out}
    >
      <Heading logo={logo} subHeading='booking details' />

      <motion.div
        initial={boxVariants.initial}
        animate={boxVariants.animate}
        transition={{ delay: 2, duration: 0.3, type: 'tween' }}
      >
        <Confirmation booking={recentBooking} showBtn={true} />
      </motion.div>
    </motion.section>
  );
}
