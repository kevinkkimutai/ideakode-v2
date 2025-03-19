'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaSearch } from 'react-icons/fa';
import PortfolioFilter from '@/components/Portfolio/PortfolioFilter';
import PortfolioHero from '@/components/Portfolio/PortfolioHero';
import PortfolioCarousel from '@/components/Portfolio/PortfolioCarousel';
import PortfolioModal from '@/components/Portfolio/PortfolioModal';

const projects = [
  { id: 1, title: 'E-Commerce Website', category: 'Web', img: '/business-team.webp' },
  { id: 2, title: 'Brand Identity', category: 'Branding', img: '/proj.png' },
  { id: 3, title: 'UI/UX Design', category: 'UI/UX', img: '/proj1.png' },
  { id: 4, title: 'Mobile App', category: 'Mobile', img: '/proj2.png' },
  { id: 5, title: 'Custom Web App', category: 'Web', img: '/business-team.webp' }
];

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  const filteredProjects =
    selectedCategory === 'All' ? projects : projects.filter(p => p.category === selectedCategory);

  return (
    <div className="w-full max-w-[1280px] mx-auto px-6 py-12 pt-32 lg:pt-40">
      {/* Hero Section */}
      {/* <PortfolioHero /> */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-green-800">Our Work Speaks for Itself</h1>
        <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
        Explore our latest projects showcasing innovation, design, and technology at its best.
        </p>
      </motion.div>

      {/* Featured Projects Carousel */}
      <div className="mt-12">
        <PortfolioCarousel projects={projects.slice(0, 3)} />
      </div>

      {/* Filter Section */}
      <PortfolioFilter
        activeCategory={selectedCategory}
        setActiveCategory={setSelectedCategory}
      />

      {/* Projects Grid */}
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {filteredProjects.map(project => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative group cursor-pointer overflow-hidden rounded-xl shadow-md"
            onClick={() => setLightbox(project)}
          >
            <Image
              src={project.img}
              alt={project.title}
              width={400}
              height={300}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <FaSearch className="text-white text-3xl" />
            </div>
            <h3 className="absolute bottom-4 left-4 text-white font-semibold">{project.title}</h3>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightbox && (
        // <PortfolioModal />
        <PortfolioModal onClose={() => setLightbox(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="p-4 bg-white rounded-lg shadow-xl max-w-4xl  mx-auto"
          >
            <Image
              src={lightbox.img}
              alt={lightbox.title}
              width={600}
              height={400}
              className="rounded-lg"
            />
            <div className='flex justify-between items-center'>
            <h2 className="text-xl font-semibold  text-center">{lightbox.title}</h2>
            <button className='py-2 px-4 rounded-full bg-green-400'>
                {lightbox.title}
            </button>
            </div>
          </motion.div>
        </PortfolioModal>
      )}
    </div>
  );
}
