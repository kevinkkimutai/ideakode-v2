'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, ArrowRight } from 'lucide-react';

export default function About() {
  const wedo = [
    "Web Development",
    "Graphic Design",
    "Software Development",
    "SEO & Digital Marketing",
    "Branding & Identity",
    "UI/UX Design"
  ];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-[1280px] w-full mx-auto max-2xl:px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='max-lg:hidden rounded-2xl flex'
        >
          <Image 
            src="/Business Plan-bro1.png"
            alt="netiqa-illustration-about"
            className='-ms-10'
            width={1000}
            height={1000}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full mb-6">
            <span className="text-sm font-semibold text-green-700">About Netiqa</span>
          </div>
          
          <h2 className="text-4xl font-bold mb-4">
            Who <span className="text-green-600">We Are</span>
          </h2>
          
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            We are a tech-driven company specializing in graphic design, web
            development, and software solutions. With a focus on innovation and
            user experience, we help businesses establish a strong digital
            presence and achieve measurable growth.
          </p>

          <div className="mb-8">
            <h3 className='text-xl font-bold text-gray-900 mb-4'>What We Do</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {wedo.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className='flex items-center gap-3 bg-gradient-to-br from-green-50 to-emerald-50 p-3 rounded-lg'
                >
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className='text-gray-700 font-medium'>{item}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <Link href="/about">
            <button className="bg-purple-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full transition-all flex items-center gap-2">
              Learn More About Us
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='lg:hidden rounded-2xl'
        >
          <Image 
            src="/Business Plan-bro1.png"
            alt="netiqa-illustration-about"
            className='w-full'
            width={1000}
            height={1000}
          />
        </motion.div>
      </div>
    </div>
  );
}
