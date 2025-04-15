'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import StepOne from '@/components/GetAQuote/StepOne';
import StepTwo from '@/components/GetAQuote/StepTwo';
import StepThree from '@/components/GetAQuote/StepThree';
import StepFour from '@/components/GetAQuote/StepFour';
import SuccessMessage from '@/components/GetAQuote/SuccessMessage';
import { toast } from 'react-toastify';
import { useSelectedQuote } from '@/context/SelectedQuoteContext';
import { useCreateQuoteMutation } from '@/redux/actions/quoteActions';

const steps = [StepOne, StepTwo, StepThree, StepFour];

export default function QuoteModal() {
  const [sendQuote] = useCreateQuoteMutation()
  const [currentStep, setCurrentStep] = useState(0);
  const { handleOpenQuote } = useSelectedQuote();
  const [loading, setLoading] = useState(false);
  const [isSucces, setIsSucces] = useState(false)
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    fullname: "",
    phone: "",
    description: "",
    email: "",
    service: "",
    timeline: "",
    budget: ""
  });

  const stepFields = [
    ['name', 'description', 'service'],
    ['timeline', 'budget'],
    ['email', 'phone', 'fullname'], 
  ];
  
  const validateCurrentStep = () => {
    const requiredFields = stepFields[currentStep];
    const emptyFields = requiredFields.filter((field) => !formData[field]?.trim());
    if (emptyFields.length > 0) {
      toast.error("Please fill all required fields for this step");
      return false;
    }
    return true;
  };
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.description || !formData.fullname || !formData.service || !formData.timeline || !formData.budget ) {
      toast.error("Please fill all fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      setIsSucces(true);
      const response = await sendQuote(formData).unwrap();
      
      if (response) {
        toast.success("Contact message sent successfully!");
        setLoading(false);
        setFormData({
          name: "",
          fullname: "",
          phone: "",
          description: "",
          email: "",
          service: "",
          timeline: "",
          budget: ""
        });
      }
    } catch (error) {
      const errorMessage = error?.data?.error || "Failed to send message. Please try again.";
      setError(true);
    } finally {
      setLoading(false);
    }
  };


  const StepComponent = steps[currentStep];


  const nextStep = (data) => {
    if (!validateCurrentStep()) return;
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep((prev) => prev + 1);
  };
  

  const prevStep = () => setCurrentStep((prev) => prev - 1);


  const restartForm = () => {
    setFormData({
      name: "",
      fullname: "",
      phone: "",
      description: "",
      email: "",
      service: "",
      timeline: "",
      budget: ""
    });
    setCurrentStep(0);
    handleOpenQuote()
    console.log("clicked");
    
  };


  return (
    <div className="fixed top-0 right-0 left-0 z-50 justify-center bg-black/60 items-center w-full md:inset-0 h-screen max-h-full">

<div className='h-full w-full flex items-center justify-center'>
            {/* form section */}
            {!isSucces && (
<div className="max-w-3xl w-full mx-auto p-6 ">
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
        <StepComponent nextStep={nextStep} prevStep={prevStep} restartForm={restartForm} handleChange={handleChange} formData={formData} />
      </motion.div>

      {/* Navigation Buttons */}
      {currentStep < steps.length - 1 ? (
  <div className="flex justify-center mt-6 gap-4">
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
) : (
  <div className="flex justify-center mt-6 gap-4">
    <button
      onClick={prevStep}
      className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
    >
      Back
    </button>
    <button
      onClick={handleSubmit}
      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
    >
      Submit
    </button>
  </div>
)}

    </div>
)}
    {/* sucessmasages */}
{isSucces && (
    <SuccessMessage loading={loading} handleCloseModal={handleOpenQuote} error={error} restartForm={restartForm} />
)}
</div>

</div>
  );
}
