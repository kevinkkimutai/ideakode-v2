'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

const HeroSection = () => (
  <motion.div
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="text-center relative h-[400px] md:h-[500px] bg-[url('/business-team.webp')] bg-no-repeat bg-cover rounded-4xl flex items-center justify-center overflow-clip"
  >

   <div className='bg-gradient-to-br from-green-200 via-white to-green-200 h-full w-full flex items-center justify-center'>
  <div className=''>
  <h1 className="text-4xl font-bold text-green-800">About Ezeed</h1>
    <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
      We are a Kenyan-based tech company specializing in web and software development, bringing innovative digital solutions to businesses of all sizes.
    </p>
  </div>
   </div>
  </motion.div>
);

const MissionVision = () => (
  <div className="grid md:grid-cols-2 gap-8 mt-16">
    {[ 
      { title: 'Our Mission', text: 'Empowering businesses through cutting-edge technology, design, and seamless user experiences.' }, 
      { title: 'Our Vision', text: 'To be Kenya\'s leading digital solutions provider, fostering innovation and excellence.' } 
    ].map((item, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-green-100 p-6 rounded-xl shadow-lg"
      >
        <h3 className="text-2xl font-semibold text-green-900">{item.title}</h3>
        <p className="text-gray-700 mt-2">{item.text}</p>
      </motion.div>
    ))}
  </div>
);

const WhyChooseUs = () => (
  <div className="mt-16">
    <h2 className="text-center text-3xl font-bold text-green-800">Why Choose Us?</h2>
    <div className="grid md:grid-cols-3 gap-6 mt-8">
      {[ 'Innovative Solutions', 'Expert Team', 'Customer Focused' ].map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          viewport={{ once: true }}
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
        >
          <h3 className="text-xl font-semibold text-green-900">{item}</h3>
          <p className="text-gray-700 mt-2">We bring creativity, expertise, and dedication to every project.</p>
        </motion.div>
      ))}
    </div>
  </div>
);

const CallToAction = () => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    className="text-center mt-16 bg-gradient-to-bl from-green-500 via-green-200 to-green-500 px-8 py-20 rounded-2xl"
  >
    <h3 className="text-2xl font-bold text-black">Let's Build Something Great Together</h3>
    <p className="text-gray-700 mt-2">Get in touch and let's start your digital journey today.</p>
    <Link
      href="/contact"
      className="mt-4 inline-block bg-green-700 hover:bg-green-800 text-white font-bold py-2.5 px-6 rounded-full transition-all"
    >
      Contact Us
    </Link>
  </motion.div>
);

export default function AboutPage() {
  return (
    <div className="w-full max-w-[1280px] mx-auto px-6 py-12 pt-32">
      <HeroSection />
      <MissionVision />
      <WhyChooseUs />
      <CallToAction />
    </div>
  );
}
