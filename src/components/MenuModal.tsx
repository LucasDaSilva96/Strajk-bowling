import { Link } from 'react-router-dom';
import { useNavToggleStore } from '../store/navToggle';
import { motion, stagger } from 'motion/react';
import { animate } from 'motion';
import { useEffect } from 'react';

export default function MenuModal() {
  const { isOpen, setClose } = useNavToggleStore();

  const handleClose = () => {
    setClose();
  };

  useEffect(() => {
    if (isOpen) {
      animate(
        '.nav-link',
        { opacity: 1, y: 0, scale: 1 },
        {
          delay: stagger(0.1),
          duration: 0.8,
          type: 'spring',
        }
      );
    } else {
      animate(
        '.nav-link',
        { opacity: 0, y: 50, scale: 0.5 },
        {
          delay: stagger(0.1),
          duration: 0.8,
          type: 'spring',
        }
      );
    }
  }, [isOpen]);

  return (
    <nav
      className={`absolute z-40 inset-0 bg-[#1C1919] text-[#EC315A] transition-all will-change-transform transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } flex items-center justify-center`}
    >
      <div className='w-full min-h-[200px] flex flex-col justify-evenly items-center'>
        <motion.span className='nav-link' whileTap={{ scale: 0.9 }}>
          <Link
            className='uppercase text-3xl font-bold tracking-wide'
            onClick={handleClose}
            to={'/booking'}
          >
            Booking
          </Link>
        </motion.span>
        <motion.span className='nav-link' whileTap={{ scale: 0.9 }}>
          <Link
            className='uppercase text-3xl font-bold tracking-wide'
            onClick={handleClose}
            to={'/booking/confirmation'}
          >
            Confirmation
          </Link>
        </motion.span>

        <motion.span className='nav-link' whileTap={{ scale: 0.9 }}>
          <Link
            className='uppercase text-3xl font-bold tracking-wide'
            onClick={handleClose}
            to={'/booking/overview'}
          >
            Overview of bookings
          </Link>
        </motion.span>
      </div>
    </nav>
  );
}
