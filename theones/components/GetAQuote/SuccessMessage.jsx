import { useState } from 'react';
import { motion } from 'framer-motion';

export default function StepFive({ restartForm }) {
  const [isSubmitting, setIsSubmitting] = useState(true);

  // Simulate form submission
  setTimeout(() => setIsSubmitting(false), 2000);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-lg shadow-lg text-center"
    >
      {isSubmitting ? (
        <>
          <h2 className="text-2xl font-semibold text-green-800 mb-4">Submitting Your Request...</h2>
          <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-green-800 mb-4">Thank You! 🎉</h2>
          <p className="text-lg text-gray-700">We've received your request. Our team will contact you soon.</p>

          <button
            onClick={restartForm}
            className="mt-6 px-6 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition"
          >
            Start a New Request
          </button>
        </>
      )}
    </motion.div>
  );
}
