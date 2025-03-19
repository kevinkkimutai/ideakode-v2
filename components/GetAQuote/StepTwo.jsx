import { motion } from 'framer-motion';

export default function StepTwo({ formData, setFormData, nextStep, prevStep }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-semibold text-green-800 mb-4">Project Budget & Timeline</h2>

      {/* Budget Selection */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">What’s your estimated budget?</label>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {['Under ksh:35,000', 'ksh:35,000 - ksh:50,000', 'ksh:50,000 - ksh:100,000', 'Over ksh:100,000'].map((budget) => (
            <label key={budget} className="flex items-center gap-2 p-3 border border-gray-300 rounded-md cursor-pointer hover:border-green-500 transition">
              <input
                type="radio"
                name="budget"
                value={budget}
                checked={formData.budget === budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="hidden"
              />
              <span className={`w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center ${formData.budget === budget ? 'bg-green-500' : 'bg-white'}`}>
                {formData.budget === budget && <span className="w-2 h-2 bg-white rounded-full"></span>}
              </span>
              {budget}
            </label>
          ))}
        </div>
      </div>

      {/* Timeline Selection */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Expected Timeline</label>
        <select
          value={formData.timeline}
          onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
          className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-green-500"
        >
          <option value="">Select a timeline</option>
          <option value="1-2 Weeks">1-2 Weeks</option>
          <option value="1-2 Months">1-2 Months</option>
          <option value="3-6 Months">3-6 Months</option>
          <option value="6+ Months">6+ Months</option>
        </select>
      </div>

     
    </motion.div>
  );
}
