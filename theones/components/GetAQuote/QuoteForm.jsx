'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import StepNavigation from './StepNavigation';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';

export default function QuoteForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { register, handleSubmit, setValue, getValues } = useForm();

  // Function to update form data when navigating steps
  const handleNext = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep((prev) => prev + 1);
  };

  const handlePrev = () => setStep((prev) => prev - 1);

  // Submit final form
  const onSubmit = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setIsSubmitted(true);
  };

//   if (isSubmitted) return <SuccessMessage />;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-lg">
      <StepNavigation step={step} />

      <motion.div
        key={step}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
      >
        {step === 1 && <StepOne onNext={handleNext} register={register} getValues={getValues} />}
        {step === 2 && <StepTwo onNext={handleNext} onPrev={handlePrev} register={register} getValues={getValues} />}
        {step === 3 && <StepThree onNext={handleNext} onPrev={handlePrev} register={register} getValues={getValues} />}
        {step === 4 && <StepFour onSubmit={handleSubmit(onSubmit)} onPrev={handlePrev} register={register} getValues={getValues} />}
      </motion.div>
    </div>
  );
}
