import { motion } from "framer-motion";
import Image from "next/image";

const PortfolioGrid = ({ projects }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          viewport={{ once: true }}
          className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all"
        >
          {/* Image */}
          <Image
            src={project.image}
            alt={project.title}
            width={400}
            height={300}
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-4">
            <div>
              <h3 className="text-xl font-semibold text-white">{project.title}</h3>
              <p className="text-sm text-gray-300">{project.category}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default PortfolioGrid;
