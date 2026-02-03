'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaSearch } from 'react-icons/fa';
import PortfolioFilter from '@/components/Portfolio/PortfolioFilter';
import PortfolioHero from '@/components/Portfolio/PortfolioHero';
import PortfolioCarousel from '@/components/Portfolio/PortfolioCarousel';
import PortfolioModal from '@/components/Portfolio/PortfolioModal';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { useGetAllProjectsMutation } from '@/redux/actions/projectActions';
import { setProjects } from '@/redux/reducers/projectReducers';
import { useGetAllProjectCategoriesMutation } from '@/redux/actions/projectCategoryActions';
import { setProjectCategories } from '@/redux/reducers/projectCategoryReducers';

export default function PortfolioCompiler() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightbox, setLightbox] = useState(null);
  const dispatch = useDispatch();
  const [getProjects] = useGetAllProjectsMutation();
  const [getCategories] = useGetAllProjectCategoriesMutation();
  const [allProjects, setAllProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch categories
        const categoriesResponse = await getCategories();
        if (categoriesResponse.data) {
          dispatch(setProjectCategories(categoriesResponse.data));
          setCategories(categoriesResponse.data);
        }
        
        // Fetch projects
        const projectsResponse = await getProjects();
        if (projectsResponse.data) {
          dispatch(setProjects(projectsResponse.data));
          setAllProjects(projectsResponse.data);
        }
      } catch (error) {
        // console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [dispatch, getProjects, getCategories]);

  const filteredProjects = 
    selectedCategory === 'All' 
      ? allProjects 
      : allProjects.filter(p => p.category?.name === selectedCategory);

  // Skeleton array for projects
  const skeletonProjects = Array(6).fill({ id: 'skeleton' });
// console.log("filteredProjects", filteredProjects);

  return (
    <div className="w-full overflow-clip">
      {/* Hero Section */}
      <section className="relative pt-20 lg:pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 opacity-50 -z-10"></div>
        
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
              Our Portfolio
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Our Work Speaks{' '}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                for Itself
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              Explore our latest projects showcasing innovation, design, and technology at its best.
            </p>
            <p className="text-sm text-gray-500">
              100+ successful projects delivered | 50+ happy clients | 5+ years of excellence
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-[1280px] mx-auto px-6 py-12">
      {/* Filter Section with Skeleton */}
      <PortfolioFilter
        activeCategory={selectedCategory}
        setActiveCategory={setSelectedCategory}
        categories={categories}
        loading={loading}
      />

      {/* Projects Grid with Skeleton */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
      {loading ? (
          skeletonProjects.map((_, index) => (
            <motion.div
              key={`skeleton-${index}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-200 rounded-2xl overflow-hidden h-80 animate-pulse"
            >
              <div className="w-full h-64 bg-gray-300 animate-pulse" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2 animate-pulse"></div>
              </div>
            </motion.div>
          ))
        ) : filteredProjects.length > 0 ? (
          filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white border border-green-100"
              onClick={() => setLightbox(project)}
            >
              <div className="relative overflow-hidden h-64">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-center">
                    <FaSearch className="text-white text-4xl mb-2 mx-auto" />
                    <p className="text-white font-semibold">View Project</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                </div>
                {project.category && (
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                    {project.category.name}
                  </span>
                )}
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-20">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center"
            >
              <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No projects found
              </h3>
              <p className="text-gray-600 max-w-md mb-6">
                {selectedCategory === 'All'
                  ? "We couldn't find any projects in our portfolio at the moment."
                  : `We couldn't find any projects in the ${selectedCategory} category.`}
              </p>
              {selectedCategory !== 'All' && (
                <button
                  onClick={() => setSelectedCategory('All')}
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300"
                >
                  View All Projects
                </button>
              )}
            </motion.div>
          </div>
        )}
      </div>

      {/* Call to Action */}
      {!loading && filteredProjects.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 py-16 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Let's collaborate to bring your vision to life with innovative solutions and exceptional design.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/get-a-quote"
                className="px-8 py-4 bg-white text-green-700 font-bold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Get a Free Quote
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </motion.section>
      )}
      </div>

      {/* Lightbox Modal */}
      {lightbox && (
        <PortfolioModal onClose={() => setLightbox(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl overflow-hidden max-w-4xl mx-auto"
          >
            <div className="relative">
              <Image
                src={lightbox.image}
                alt={lightbox.title}
                width={800}
                height={600}
                className="w-full h-auto"
              />
            </div>
            <div className='bg-white p-6'>
              <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{lightbox.title}</h2>
                  {lightbox.category && (
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                      {lightbox.category.name}
                    </span>
                  )}
                </div>
                <Link 
                  href={lightbox.demolink} 
                  className='px-8 py-3 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 hover:shadow-lg text-white font-semibold transition-all duration-300 whitespace-nowrap'
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Live Demo →
                </Link>
              </div>
            </div>
          </motion.div>
        </PortfolioModal>
      )}
    </div>
  );
}