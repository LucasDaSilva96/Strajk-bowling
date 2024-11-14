export const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0,
  },
  in: {
    opacity: 1,
    scale: 1,
  },
  out: {
    opacity: 0,
    scale: 1.2,
  },
  transition: {
    duration: 0.5,
    type: 'linear',
    delay: 0.2,
  },
};

export const textVariants = {
  initial: {
    y: '110%',
    scale: 0.5,
  },
  animate: {
    y: 0,
    scale: 1,
  },
};

export const imageVariants = {
  initial: {
    opacity: 0,
    scale: 0,
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0,
  },
};

export const subHeadingVariants = {
  initial: {
    opacity: 0,
    x: '-100%',
  },
  animate: {
    opacity: 1,
    x: 0,
  },
};

export const boxVariants = {
  initial: {
    opacity: 0,
    scaleY: 0,
  },
  animate: {
    opacity: 1,
    scaleY: 1,
  },
};
