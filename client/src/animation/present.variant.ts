export const horizontalPresent = {
   initial: {
      x: -10,
   },
   animate: {
      x: 0,
      transition: {
         duration: .01,
      },
   },
};

export const fadePresent = {
   initial: {
      opacity: 0,
   },
   animate: {
      opacity: 1,
      transition: {
         duration: .2,
      },
   },
   exit: {
      opacity: 0,
      transition: {
         duration: .2,
      },
   },
};
