import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';

const loadingVariants = {
  initial: {opacity: 0},
  animate: {
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeInOut' },
  }
};

const textVariants = {
  initial: {opacity: 0.1},
  animate: {
    opacity: [0.2, 1, 0.2],
    transition: {
      repeat: Infinity,
      duration: 1,
      ease: 'easeInOut',
    },
  },
  exit: {
    opacity: 1,
    scale: 0,
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
};

const LoadingScreen = ({ isVisible, onExitComplete }) => {
  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {isVisible && (
        <motion.div
          className="fixed inset-0 bg-[var(--dark-void)] flex items-center justify-center z-50"
          variants={loadingVariants}
          initial="initial"
          animate="animate"
        >
          <motion.h1
            className="text-[var(--lime-green)] font-aalto text-[150px] sm:text-[400px]"
            variants={textVariants}
            animate="animate"
            exit="exit"
          >
            Loading
          </motion.h1>

        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
