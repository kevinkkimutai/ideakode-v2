import { motion } from 'framer-motion';

export default function StepNavigation({ step }) {
  const steps = ['Project Details', 'Budget & Timeline', 'Contact Info', 'Review & Submit'];

  return (
    <div className="mb-6">
      <div className="relative flex justify-between items-center">
        {steps.map((label, index) => (
          <div key={index} className="flex flex-col items-center w-1/4">
            <motion.div
              className={`w-10 h-10 flex items-center justify-center rounded-full 
                ${index + 1 <= step ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'}`}
              initial={{ scale: 0.8 }}
              animate={{ scale: index + 1 === step ? 1.2 : 1 }}
              transition={{ duration: 0.3 }}
            >
              {index + 1}
            </motion.div>
            <span className="text-sm text-gray-700 mt-2">{label}</span>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <motion.div
        className="absolute top-5 left-0 w-full h-1 bg-gray-300 rounded-lg"
        initial={{ width: '0%' }}
        animate={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
        transition={{ duration: 0.5 }}
      >
        <div className="h-full bg-green-600 rounded-lg"></div>
      </motion.div>
    </div>
  );
}
