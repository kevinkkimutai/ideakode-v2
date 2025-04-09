import { motion } from "framer-motion";

const PortfolioHero = () => {
  return (
     <motion.section 
     initial={{ opacity: 0 }}
     animate={{ opacity: 1 }}
     className="relative py-32 bg-gradient-to-r from-indigo-200 to-purple-300 text-white"
   >
     <div className="container py-20 max-w-[1280px] w-full mx-auto max-lg:px-4 text-center">
       <motion.h1 
         initial={{ y: -50 }}
         animate={{ y: 0 }}
         transition={{ type: 'spring', stiffness: 100 }}
         className="text-5xl font-bold mb-6"
       >
        Our Work Speaks for Itself
       </motion.h1>
       <motion.p
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ delay: 0.3 }}
         className="text-xl max-w-2xl mx-auto"
       >
        Explore our latest projects showcasing innovation, design, and technology at its best.
       </motion.p>
     </div>
     <motion.div 
       animate={{
         x: ['0%', '100%', '0%'],
         transition: { duration: 15, repeat: Infinity }
       }}
       className="absolute bottom-0 left-0 right-0 h-2 bg-green-500"
     />
   </motion.section>
  );
};

export default PortfolioHero;
