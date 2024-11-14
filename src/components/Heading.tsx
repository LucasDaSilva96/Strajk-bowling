import { motion } from 'motion/react';
import {
  imageVariants,
  subHeadingVariants,
  textVariants,
} from '../animation/animations';
type HeadingProps = {
  logo: string;
  subHeading: string;
};

export default function Heading({ logo, subHeading }: HeadingProps) {
  return (
    <>
      <motion.div
        initial={imageVariants.initial}
        animate={imageVariants.animate}
        transition={{ duration: 1, type: 'tween' }}
        className='flex flex-col items-center gap-1 -mt-8'
      >
        <img
          src='/svgs/logo.svg'
          alt='logo'
          className='max-w-20 h-auto drop-shadow-lg'
        />
        <div className='flex items-center justify-center p-0.5 relative overflow-hidden'>
          {logo.split('').map((letter, index) => (
            <motion.span
              key={index}
              initial={textVariants.initial}
              animate={textVariants.animate}
              transition={{
                delay: 1 + index * 0.1,
                duration: 0.3,
                type: 'spring',
              }}
              className='text-4xl md:text-5xl font-bold text-[#EC315A] tracking-widest uppercase drop-shadow-md'
            >
              {letter === '#' ? <span>&nbsp;</span> : letter}
            </motion.span>
          ))}
        </div>

        <motion.div
          initial={subHeadingVariants.initial}
          animate={subHeadingVariants.animate}
          transition={{ delay: 1.8, duration: 0.3 }}
          className='w-[370px] flex items-center uppercase font-semibold text-[#441D81] text-lg justify-evenly'
        >
          <div className='p-[1px]  min-w-[25%] bg-[#441D81]' />
          <span>{subHeading}</span>
          <div className='p-[1px] min-w-[25%] bg-[#441D81]' />
        </motion.div>
      </motion.div>
    </>
  );
}
