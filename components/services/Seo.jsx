'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Breadcrumb from '../Global/Breadcrumb';

export default function Seo() {
  return (
    <div className="w-full max-w-[1280px] mx-auto px-6 py-12 pt-20 lg:pt-24">
    <Breadcrumb />
 <div className='pt-14'>
 <motion.h1 
      initial={{ opacity: 0, y: -20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.8 }} 
      className="text-3xl lg:text-4xl font-bold text-green-800 text-center"
    >
      SEO(Search Engine Optimization) Services
    </motion.h1>
    <p className="lg:text-lg text-gray-600 text-center mt-4">
      We create high-performing, user-friendly websites tailored to your business needs.
    </p>

    <div className="grid md:grid-cols-2 gap-8 mt-8">
      {['Custom Websites', 'E-Commerce Solutions', 'CMS (WordPress, Next.js, etc.)'].map((item, index) => (
        <motion.div 
          key={index} 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: index * 0.2 }} 
          viewport={{ once: true }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <h3 className="text-xl font-semibold text-green-900">{item}</h3>
          <p className="text-gray-700 mt-2">
            {item === 'Custom Websites' && 'We build custom, scalable, and high-performance websites.'}
            {item === 'E-Commerce Solutions' && 'Boost your online sales with seamless e-commerce solutions.'}
            {item === 'CMS (WordPress, Next.js, etc.)' && 'Manage content easily with tailored CMS solutions.'}
          </p>
        </motion.div>
      ))}
    </div>

    <motion.div 
      initial={{ opacity: 0, y: 30 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.8 }} 
      viewport={{ once: true }}
      className="text-center mt-12 bg-gradient-to-bl from-green-500 via-green-200 to-green-500 p-8 rounded-2xl"
    >
      <h3 className="text-2xl font-bold text-black">Start Your Web Project Today</h3>
      <p className="text-gray-700 mt-2">Let’s build something amazing together.</p>
      <Link href="/get-a-quote" className="mt-4 inline-block bg-green-700 hover:bg-green-800 text-white font-bold py-2.5 px-6 rounded-full transition-all">
        Get a Free Quote
      </Link>
    </motion.div>
 </div>
  </div>
  );
}
