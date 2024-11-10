import MenuBar from '../components/MenuBar';
import MenuModal from '../components/MenuModal';
import { Outlet } from 'react-router-dom';

export default function RootLayout() {
  return (
    <main className='bg-[#FFF4F1] relative w-full min-h-screen overflow-x-hidden'>
      <MenuBar />
      <MenuModal />
      <div className='w-full h-full pt-16 px-2 pb-2'>
        <Outlet />
      </div>
    </main>
  );
}
