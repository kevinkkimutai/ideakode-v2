import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const PortfolioFilter = ({ activeCategory, setActiveCategory, categories, loading }) => {
  // Add "All" category at the beginning
  const allCategories = [
    { id: 'All', name: 'All' },
    ...(categories || [])
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-wrap justify-center gap-4 py-6"
    >
      {allCategories?.map((category) => (
        <motion.button
          key={category.id}
          onClick={() => setActiveCategory(category.id === 'All' ? 'All' : category.name)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-6 py-2 rounded-full font-medium transition-all ${
            (activeCategory === 'All' && category.id === 'All') || 
            (activeCategory === category.name)
              ? "bg-green-700 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-green-600 hover:text-white"
          }`}
        >
          {category.name}
        </motion.button>
      ))}
    </motion.div>
  );
};

export default PortfolioFilter;