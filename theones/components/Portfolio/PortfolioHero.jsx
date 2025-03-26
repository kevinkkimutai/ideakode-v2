import { motion } from "framer-motion";

const PortfolioHero = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center bg-gradient-to-r from-green-700 via-green-500 to-green-700 text-white"
    >
      {/* Animated Background Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Text Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative text-center max-w-3xl px-4"
      >
        <h1 className="text-4xl md:text-5xl font-bold">Our Work Speaks for Itself</h1>
        <p className="mt-4 text-lg text-gray-200">
          Explore our latest projects showcasing innovation, design, and technology at its best.
        </p>
      </motion.div>
    </motion.section>
  );
};

export default PortfolioHero;
