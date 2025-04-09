'use client'; // Required for Framer Motion

import { Metadata } from 'next';
import { motion } from 'framer-motion';
import { Code, Globe, Smartphone, Rocket, BarChart, Database } from 'lucide-react';


const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Webdevelopment() {
  const services = [
    {
      icon: <Code className="w-8 h-8 text-green-500" />,
      title: "Custom Web Apps",
      description: "Tailored solutions with React, Next.js, and Node.js"
    },
    {
      icon: <Globe className="w-8 h-8 text-green-500" />,
      title: "E-Commerce",
      description: "Shopify, WooCommerce & custom storefronts"
    },
    {
      icon: <Smartphone className="w-8 h-8 text-purple-500" />,
      title: "Mobile-First",
      description: "Responsive designs that work everywhere"
    },
    {
      icon: <Rocket className="w-8 h-8 text-orange-500" />,
      title: "Performance",
      description: "90+ Lighthouse scores guaranteed"
    },
    {
      icon: <BarChart className="w-8 h-8 text-red-500" />,
      title: "SEO Optimized",
      description: "Built to rank on Google from day one"
    },
    {
      icon: <Database className="w-8 h-8 text-teal-500" />, // NEW SERVICE
      title: "Green Hosting",
      description: "Carbon-neutral cloud infrastructure"
    },
  ];

  const processSteps = [
    { title: "Discovery", duration: "1-2 weeks" },
    { title: "Design", duration: "2-3 weeks" },
    { title: "Development", duration: "4-8 weeks" },
    { title: "Launch", duration: "1 week" }
  ];

  return (
    <div className=" ">
      {/* Hero with animated gradient */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative py-32 overflow-hidden bg-gradient-to-r from-green-100  via-purple-100 to-green-100"
      >
        <div className="container max-w-[1280px] w-full mx-auto max-lg:px-4 text-center text-purple-950 pt-20">
          <motion.h1 
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 100 }}
            className="text-5xl font-bold mb-6"
          >
            Web Development <span className="text-yellow-500">That Converts</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl max-w-2xl mx-auto"
          >
            We build fast, secure, and scalable web experiences that grow your business
          </motion.p>
        </div>
        <motion.div 
          animate={{
            x: ['0%', '100%', '0%'],
            transition: { duration: 15, repeat: Infinity }
          }}
          className="absolute bottom-0 left-0 right-0 h-1 bg-white/20"
        />
      </motion.section>

      {/* Services with staggered animation */}
      <section className="py-20 max-w-[1280px] w-full mx-auto max-lg:px-4 ">
        <div className="container mx-auto px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
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

      {/* Animated process timeline */}
      <section className="py-20 bg-green-50 ">
        <div className="container max-w-[1280px] w-full mx-auto max-lg:px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-900 ">
            Our <span className="text-green-500">Process</span>
          </h2>
          <div className="relative">
            <div className="absolute left-1/2 h-full w-0.5 bg-green-300  transform -translate-x-1/2"></div>
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`mb-12 flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center justify-between`}
              >
                <div className={`w-5/12  ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <h3 className="text-xl font-bold text-gray-900 ">
                    {step.title}
                  </h3>
                  <p className="text-gray-500">
                    {step.duration}
                  </p>
                </div>
                <div className="w-1/12 flex justify-center">
                  <div className="w-8 h-8 rounded-full bg-green-500 border-4 border-white z-20 "></div>
                </div>
                <div className="w-5/12"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech stack carousel */}
      <section className="py-20">
        <div className="container max-w-[1280px] w-full mx-auto max-lg:px-4 ">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-900 ">
            Our <span className="text-purple-500">Tech Stack</span>
          </h2>
          <motion.div
            className="flex overflow-hidden"
          >
            <motion.div
              animate={{
                x: ['0%', '-100%'],
                transition: { duration: 20, repeat: Infinity, ease: 'linear' }
              }}
              className="flex space-x-12"
            >
              {['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'GraphQL', 'MongoDB', 'AWS'].map((tech, index) => (
                <div key={index} className="text-2xl font-bold text-gray-700  whitespace-nowrap">
                  {tech}
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}