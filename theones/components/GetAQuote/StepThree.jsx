import { motion } from 'framer-motion';

export default function StepThree({ formData, handleChange, nextStep, prevStep }) {

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-semibold text-green-800 mb-4">Your Contact Details</h2>

      {/* Full Name Input */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Full Name</label>
        <input
          type="text"
          name="fullname"
          value={formData.fullname}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-green-500"
          placeholder="John Doe"
        />
      </div>

      {/* Email Input */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-green-500"
          placeholder="example@email.com"
        />
      </div>

      {/* Phone Input */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Phone</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-green-500"
          placeholder="+254 712 345 678"
        />
      </div>

    
    </motion.div>
  );
}
