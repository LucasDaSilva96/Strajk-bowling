import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function InitialLoader() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/booking');
    }, 2000);
  }, [navigate]);

  return (
    <section className='w-full h-screen flex items-center justify-center flex-col gap-1'>
      <img
        src='/svgs/logo.svg'
        alt='bowling logo'
        className='shadow-sm rounded-md'
      />
      <img
        src='/Images/Strajk-logo.jpg'
        alt='Strajk Bowling logo'
        className='shadow-sm rounded-md'
      />
    </section>
  );
}
