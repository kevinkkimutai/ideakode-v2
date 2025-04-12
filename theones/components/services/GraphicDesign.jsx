'use client';

import { motion } from 'framer-motion';
import { Palette, PenTool, MonitorSmartphone, Layers3, Rocket, BarChart } from 'lucide-react';
import Image from 'next/image';

export default function GraphicDesign() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const services = [
    {
      icon: <Palette className="w-8 h-8 text-purple-500" />,
      title: "Brand Identity",
      description: "Logo, color palette, typography & visual style guides"
    },
    {
      icon: <PenTool className="w-8 h-8 text-blue-500" />,
      title: "UI/UX Design",
      description: "Intuitive interfaces that enhance user engagement"
    },
    {
      icon: <MonitorSmartphone className="w-8 h-8 text-teal-500" />,
      title: "Responsive Design",
      description: "Flawless experiences across all devices"
    },
    {
      icon: <Layers3 className="w-8 h-8 text-orange-500" />,
      title: "Motion Design",
      description: "Micro-interactions & animated branding"
    },
    {
      icon: <Rocket className="w-8 h-8 text-pink-500" />,
      title: "Rebranding",
      description: "Modern refreshes for outdated brands"
    },
    {
      icon: <BarChart className="w-8 h-8 text-green-500" />,
      title: "Design Systems",
      description: "Scalable component libraries for consistency"
    }
  ];

  const processSteps = [
    { title: "Discovery", description: "Research & strategy" },
    { title: "Concept", description: "Moodboards & wireframes" },
    { title: "Design", description: "High-fidelity mockups" },
    { title: "Delivery", description: "Assets & guidelines" }
  ];

  return (
    <div className="bg-whit">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative py-32 bg-gradient-to-r from-indigo-200 to-purple-300 text-white"
      >
        <div className="container pt-20 max-w-[1280px] w-full mx-auto max-lg:px-4 text-center">
          <motion.h1 
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 100 }}
            className="text-5xl font-bold mb-6"
          >
            Design That <span className="text-yellow-400">Tells Your Story</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl max-w-2xl mx-auto"
          >
            We craft unforgettable brand experiences that resonate with your audience.
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

      {/* Services Grid */}
      <section className="py-20">
        <div className="containe max-w-[1280px] w-full mx-auto max-lg:px-4 ">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl font-bold text-center mb-16 text-gray-900 "
          >
            Our <span className="text-purple-600">Design Services</span>
          </motion.h2>
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            initial="hidden"
            whileInView="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ 
                  y: -5,
                  boxShadow: '0 20px 25px -5px rgba(124, 58, 237, 0.1)'
                }}
                className="bg-white p-8 rounded-xl border border-green-300  hover:border-purple-300 transition-all"
              >
                <div className="flex items-center mb-4">
                  <motion.div 
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className="mr-4"
                  >
                    {service.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 ">
                    {service.title}
                  </h3>
                </div>
                <p className="text-gray-600 ">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Design Process */}
      <section className="py-20 bg-green-50 mb-20">
        <div className="container max-w-[1280px] w-full mx-auto max-lg:px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-900 ">
            Our <span className="text-indigo-600">Design Process</span>
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
            <div className=''>
            <Image 
            src="https://assets.netiqa.co.ke/ui%3Aux.jpg" 
            alt="design brand" 
            width={600} 
            height={300} 
            className="rounded-xl shadow-xl max-h-[430px] object-cover"
          />
            </div>
            <div className="relative mx-auto">
            <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-indigo-400 to-purple-500 rounded-full"></div>
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="relative pl-12 mb-16 last:mb-0"
              >
                <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-indigo-500 border-4 border-white flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold text-gray-900  mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 ">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
          </div>
        </div>
      </section>

      {/* Portfolio Showcase */}
      <section className="py-20 hidden">
        <div className="container max-w-[1280px] w-full mx-auto max-lg:px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-900 ">
            Recent <span className="text-teal-500">Branding Projects</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <motion.div
                key={item}
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg"
              >
                <div className="h-52 bg-gradient-to-r from-blue-400 to-purple-500"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 ">
                    Client Brand {item}
                  </h3>
                  <p className="text-gray-600">
                    Comprehensive rebranding with new visual identity
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}