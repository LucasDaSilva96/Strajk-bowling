import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { textVariants } from '../animation/animations';

export default function InitialLoader() {
  const navigate = useNavigate();

  const [animationComplete, setAnimationComplete] = useState(false);

  const logo = 'Strajk';

  useEffect(() => {
    if (animationComplete) {
      navigate('/booking');
    }
  }, [navigate, animationComplete]);

  return (
    <section className='w-full h-screen flex items-center justify-center flex-col gap-1'>
      <motion.img
        initial={{ opacity: 0, scale: 0.5, y: '-100%' }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 2, type: 'spring', bounce: 0.25 }}
        exit={{ opacity: 0, scale: 0.5, y: '100%' }}
        src='/svgs/logo.svg'
        alt='bowling logo'
        className='rounded-md drop-shadow-lg'
      />

      <div className='flex items-center justify-center p-1 relative overflow-hidden'>
        {logo.split('').map((letter, index) => (
          <motion.span
            key={index}
            initial={textVariants.initial}
            animate={textVariants.animate}
            transition={{
              delay: 1 + index * 0.1,
              duration: 0.8,
              type: 'spring',
            }}
            className='text-5xl font-bold text-[#EC315A] tracking-widest uppercase drop-shadow-md'
          >
            {letter}
          </motion.span>
        ))}
      </div>

      <motion.span
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.75, duration: 0.8 }}
        className='text-2xl text-[#441D81] tracking-[8px]'
        onAnimationComplete={() =>
          setTimeout(() => setAnimationComplete(true), 100)
        }
      >
        Bowling
      </motion.span>
    </section>
  );
}
