import { Link } from 'react-router-dom';
import { useNavToggleStore } from '../store/navToggle';

export default function MenuModal() {
  const { isOpen, setClose } = useNavToggleStore();

  const handleClose = () => {
    setClose();
  };

  return (
    <nav
      className={`absolute z-40 inset-0 bg-[#1C1919] text-[#EC315A] transition-all will-change-transform transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } flex items-center justify-center`}
    >
      <div className='w-full min-h-[200px] flex flex-col justify-evenly items-center'>
        <Link
          className='uppercase text-3xl font-bold tracking-wide'
          onClick={handleClose}
          to={'/booking'}
        >
          Booking
        </Link>
        <Link
          className='uppercase text-3xl font-bold tracking-wide'
          onClick={handleClose}
          to={'/booking/confirmation'}
        >
          Confirmation
        </Link>
      </div>
    </nav>
  );
}
