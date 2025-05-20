import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Notification({ alertData, onClose }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [contentWidth, setContentWidth] = useState(0);

  // Calculate content width when alertData changes
  useEffect(() => {
    if (alertData) {
      // Temporary element to measure text width
      const temp = document.createElement('div');
      temp.style.visibility = 'hidden';
      temp.style.whiteSpace = 'nowrap';
      temp.style.position = 'absolute';
      temp.style.fontSize = '14px'; // Match your text-sm size
      temp.innerText = alertData.message;
      document.body.appendChild(temp);
      setContentWidth(temp.clientWidth + 62); // Add padding
      document.body.removeChild(temp);

      setIsOpen(true);
      const timer = setTimeout(() => {
        handleClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alertData]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      onClose?.();
      setIsClosing(false);
    }, 500);
  };

  // Animation variants
  const containerVariants = {
    initial: { 
      opacity: 0,
      y: -20,
      width: 50, // Start with just icon width
      transformOrigin: 'left center'
    },
    animate: {
      opacity: 1,
      y: 0,
      width: contentWidth > 0 ? contentWidth : 300, // Expand to content width
      transition: {
        opacity: { duration: 0.3 },
        y: { 
          type: 'spring', 
          stiffness: 400,
          damping: 25,
          mass: 0.5
        },
        width: { 
          delay: 0.4, // Wait for initial reveal
          duration: 0.3,
          ease: [0.2, 0.8, 0.4, 1] // Smooth easing
        }
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      width: 50, // Shrink back to icon width
      transition: {
        width: { duration: 0.2 },
        opacity: { duration: 0.3, delay: 0.1 },
        y: { duration: 0.3 }
      }
    }
  };

  const contentVariants = {
    initial: { opacity: 0, x: -10 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: { delay: 0.3 } 
    },
    exit: { 
      opacity: 0,
      x: -10,
      transition: { duration: 0.1 } 
    }
  };

  const variantClasses = {
    success: {
      container:
        "border-success-500 bg-green-50 dark:border-green-100 dark:bg-green-50",
      icon: "text-success-500",
    },
    error: {
      container:
        "border-error-500 bg-red-50 dark:border-red-100 dark:bg-error-50",
      icon: "text-error-500",
    },
    warning: {
      container:
        "border-warning-500 bg-warning-50 dark:border-warning-500/30 dark:bg-warning-500",
      icon: "text-warning-500",
    },
    info: {
      container:
        "border-blue-light-500 bg-blue-light-50 dark:border-blue-light-500/30 dark:bg-blue-light-500",
      icon: "text-blue-light-500",
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
      <div className='fixed top-5 max-w-[1280px] w-full z-[9999999]'>
          <motion.div
          initial="initial"
          animate={isClosing ? "exit" : "animate"}
          exit="exit"
          variants={containerVariants}
          className={`flex flex-row items-center border mx-auto rounded-lg shadow overflow-hidden ${variantClasses[alertData.variant].container} `}
          style={{ minWidth: 50 }} // Minimum width for icon
        >
          {/* Icon - appears immediately */}
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              transition: { duration: 0.2 }
            }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="flex-shrink-0 inline-flex mx-3 item-center justify-center leading-none rounded-full bg-white dark:bg-violet-600 dark:text-gray-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
            </svg>
          </motion.span>

          {/* Content - appears after initial animation */}
          <motion.div
            variants={contentVariants}
            className="flex-1 pr-4 py-2 overflow-hidden"
          >
            <p className={`text-sm  whitespace-nowrap pr-10 ${variantClasses[alertData.variant].icon}`}>
              {alertData?.message}
            </p>
          </motion.div>

          {/* Close button - appears with content */}
          {/* <motion.button
            variants={contentVariants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type="button"
            onClick={handleClose}
            className="flex-shrink-0 p-2 dark:text-gray-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
          </motion.button> */}
        </motion.div>
      </div>
      )}
    </AnimatePresence>
  );
}