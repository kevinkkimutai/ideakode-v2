import { useState } from "react";
import { motion } from "framer-motion";

const categories = ["All", "Branding","E-Commerce",  "UI/UX Design", "Web Development"];

const PortfolioFilter = ({ activeCategory, setActiveCategory }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-wrap justify-center gap-4 py-6"
    >
      {categories.map((category, index) => (
        <motion.button
          key={index}
          onClick={() => setActiveCategory(category)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`px-6 py-2 rounded-full font-medium transition-all ${
            activeCategory === category
              ? "bg-green-700 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-green-600 hover:text-white"
          }`}
        >
          {category}
        </motion.button>
      ))}
    </motion.div>
  );
};

export default PortfolioFilter;
