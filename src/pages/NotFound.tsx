import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <section className='w-full h-screen flex flex-col items-center justify-center gap-2'>
      <h1 className='text-3xl font-bold'>404</h1>
      <p className='text-lg'>Page not found</p>

      <button
        onClick={() => navigate('/')}
        className='px-4 py-2 bg-[#363636] text-white rounded-md shadow-sm'
      >
        Home
      </button>
    </section>
  );
}
