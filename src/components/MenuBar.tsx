import { BiMenuAltLeft } from 'react-icons/bi';
import { TfiClose } from 'react-icons/tfi';
import { useNavToggleStore } from '../store/navToggle';

export default function MenuBar() {
  const { isOpen, toggle } = useNavToggleStore();
  return (
    <header className='fixed top-2 left-2 z-50 w-full'>
      <button className='bg-[#EC315A1F] text-[#EC315A] p-1 rounded-md shadow-sm'>
        {isOpen ? (
          <TfiClose onClick={toggle} size={32} />
        ) : (
          <BiMenuAltLeft onClick={toggle} size={32} />
        )}
      </button>
    </header>
  );
}
