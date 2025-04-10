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
        console.error("Failed to fetch data", error);
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
console.log("filteredProjects", filteredProjects);

  return (
    <div className="w-full max-w-[1280px] mx-auto px-6 py-12 pt-20 lg:pt-24">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative py-20 text-black"
      >
        <div className="container max-w-[1280px] w-full mx-auto max-lg:px-4 text-center">
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
      </motion.section>

      {/* Filter Section with Skeleton */}
      <PortfolioFilter
        activeCategory={selectedCategory}
        setActiveCategory={setSelectedCategory}
        categories={categories}
        loading={loading}
      />

      {/* Projects Grid with Skeleton */}
      <div className="grid md:grid-cols-3 gap-6 mt-8">
      {loading ? (
          skeletonProjects.map((_, index) => (
            <motion.div
              key={`skeleton-${index}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-200 rounded-xl overflow-hidden h-64 animate-pulse"
            >
              <div className="w-full h-full bg-gray-300 animate-pulse" />
            </motion.div>
          ))
        ) : filteredProjects.length > 0 ? (
          filteredProjects.map(project => (
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
                src={project.image}
                alt={project.title}
                width={400}
                height={300}
                className="w-full h-[300px] object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <FaSearch className="text-white text-3xl" />
              </div>
              <h3 className="absolute bottom-4 left-4 group-hover:text-white font-semibold">{project.title}</h3>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-gray-400 mb-4"
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
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No projects found
              </h3>
              <p className="text-gray-500 max-w-md">
                {selectedCategory === 'All'
                  ? "We couldn't find any projects in our portfolio."
                  : `We couldn't find any projects in the ${selectedCategory} category.`}
              </p>
              {selectedCategory !== 'All' && (
                <button
                  onClick={() => setSelectedCategory('All')}
                  className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  View All Projects
                </button>
              )}
            </motion.div>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightbox && (
        <PortfolioModal onClose={() => setLightbox(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="p-4 rounded-lg max-w-4xl mx-auto px-2"
          >
            <Image
              src={lightbox.image}
              alt={lightbox.title}
              width={600}
              height={400}
              className="rounded-lg"
            />
            <div className='flex justify-between items-center mt-4'>
              <h2 className="text-xl font-semibold line-clamp-1">{lightbox.title}</h2>
              <Link 
                href={lightbox.demolink} 
                className='py-2 px-6 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors'
                target="_blank"
                rel="noopener noreferrer"
              >
                Demo
              </Link>
            </div>
          </motion.div>
        </PortfolioModal>
      )}
    </div>
  );
}