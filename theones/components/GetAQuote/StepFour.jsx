import { motion } from 'framer-motion';

export default function StepFour({ formData, handleSubmit, prevStep, nextStep }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-semibold text-green-800 mb-4">Review Your Details</h2>

      {/* Project Details */}
      <div className="mb-4 p-4 border border-gray-200 rounded-md">
        <h3 className="font-semibold text-green-700">Project Type:</h3>
        <p className="text-gray-700">{formData.service || 'N/A'}</p>
      </div>

      {/* Budget */}
      <div className="mb-4 p-4 border border-gray-200 rounded-md">
        <h3 className="font-semibold text-green-700">Budget:</h3>
        <p className="text-gray-700">{formData.budget || 'N/A'}</p>
      </div>
      <div className="mb-4 p-4 border border-gray-200 rounded-md">
        <h3 className="font-semibold text-green-700">Project Description:</h3>
        <p className="text-gray-700">{formData.description || 'N/A'}</p>
      </div>

      {/* Contact Information */}
      <div className="mb-4 p-4 border border-gray-200 rounded-md">
        <h3 className="font-semibold text-green-700">Contact Information:</h3>
        <p className="text-gray-700">
          <strong>Name:</strong> {formData.fullname || 'N/A'}
        </p>
        <p className="text-gray-700">
          <strong>Email:</strong> {formData.email || 'N/A'}
        </p>
        <p className="text-gray-700">
          <strong>Phone:</strong> {formData.phone || 'N/A'}
        </p>
      </div>

      <div>
        <button 
        onClick={handleSubmit}
        className='px-4 py-2 rounded-lg bg-blue-600 text-white'>
          Submit 
        </button>
      </div>

    </motion.div>
  );
}
