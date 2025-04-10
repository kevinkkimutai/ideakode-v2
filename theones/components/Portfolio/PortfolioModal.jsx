'use client';

import { motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

export default function PortfolioModal({ children, onClose }) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 max-md:px-2"
      onClick={onClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()} 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        className="bg-white  rounded-lg max-w-4xl relative"
      >
        <button
          onClick={onClose}
          className="absolute top-0 bg-red-50 rounded-md p-1 right-0 text-red-600 hover:text-red-700"
        >
          <FaTimes size={20} />
        </button>
        {children}
      </motion.div>
    </div>
  );
}
