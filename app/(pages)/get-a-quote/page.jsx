'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import StepOne from '@/components/GetAQuote/StepOne';
import StepTwo from '@/components/GetAQuote/StepTwo';
import StepThree from '@/components/GetAQuote/StepThree';
import StepFour from '@/components/GetAQuote/StepFour';
import SuccessMessage from '@/components/GetAQuote/SuccessMessage';

const steps = [StepOne, StepTwo, StepThree, StepFour, SuccessMessage];

export default function GetAQuote() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});

  const StepComponent = steps[currentStep];

  const nextStep = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => setCurrentStep((prev) => prev - 1);
  const restartForm = () => {
    setFormData({});
    setCurrentStep(0);
  };

  return (
    <div className="w-full max-w-[1280px] mx-auto px-6 py-20 mt-20 mb-20 h-[65vh]">
<div className="max-w-4xl mx-auto p-6 ">
      {/* Progress Bar */}
      <div className="relative w-full bg-gray-300 h-2 rounded-full">
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.5 }}
          className="absolute left-0 top-0 h-2 bg-green-600 rounded-full"
        />
      </div>

      {/* Step Content */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.5 }}
        className="mt-6"
      >
        <StepComponent nextStep={nextStep} prevStep={prevStep} restartForm={restartForm} formData={formData} />
      </motion.div>

      {/* Navigation Buttons */}
      {currentStep < steps.length - 1 && (
        <div className="flex justify-between mt-6">
          {currentStep > 0 && (
            <button
              onClick={prevStep}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
            >
              Back
            </button>
          )}
          <button
            onClick={() => nextStep(formData)}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Next
          </button>
        </div>
      )}
    </div>
</div>
  );
}
