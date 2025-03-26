import { motion } from 'framer-motion';

export default function StepOne({ formData, setFormData, nextStep }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-semibold text-green-800 mb-4">Tell us about your project</h2>

      {/* Project Name */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Project Name</label>
        <input
          type="text"
          placeholder="e.g., E-commerce Website"
          value={formData.projectName}
          onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
          className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-green-500"
        />
      </div>

      {/* Project Description */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Project Description</label>
        <textarea
          placeholder="Briefly describe your project..."
          value={formData.projectDescription}
          onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
          className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-green-500"
          rows="4"
        ></textarea>
      </div>

      {/* Service Type Dropdown */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Service Type</label>
        <select
          value={formData.serviceType}
          onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
          className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-green-500"
        >
          <option value="">Select a service</option>
          <option value="Web Development">Web Development</option>
          <option value="UI/UX Design">UI/UX Design</option>
          <option value="Branding">Branding</option>
          <option value="Mobile App">Mobile App Development</option>
        </select>
      </div>

     
    </motion.div>
  );
}
