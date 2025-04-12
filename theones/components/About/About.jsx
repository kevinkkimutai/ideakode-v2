'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaRocket, FaLightbulb, FaUsers, FaGlobe } from 'react-icons/fa';
import CallToAction from '../Home/CallToAction';


export default function AboutPage() {const stats = [
  { value: '100+', label: 'Projects Delivered' },
  { value: '50+', label: 'Clients Worldwide' },
  { value: '2025', label: 'Founded In' },
  { value: '24/7', label: 'Support' },
];

const values = [
  { icon: <FaRocket className="text-green-500" />, title: 'Innovation', description: 'We push boundaries to create transformative solutions.' },
  { icon: <FaLightbulb className="text-yellow-500" />, title: 'Creativity', description: 'Original ideas drive our problem-solving approach.' },
  { icon: <FaUsers className="text-green-500" />, title: 'Collaboration', description: 'Great things happen when we work together.' },
  { icon: <FaGlobe className="text-purple-500" />, title: 'Impact', description: 'We build technology that makes a difference.' },
];

return (
  <div className="pt-20 lg:pt-32 w-full overflow-clip">
    {/* Hero Section */}
    <section className="relativ py-20 overflow-hidden max-w-[1280px] w-full mx-auto">
      <div className="text-center mx-auto max-lg:px-4 ">
        <h1 className="text-5xl font-bold text-gray-900  mb-6">
          Building the Future, <span className="text-green-600">Today</span>
        </h1>
        <p className="text-xl text-gray-600  max-w-3xl mx-auto">
          We’re a team of innovators, engineers, and dreamers committed to solving the world’s toughest challenges through technology.
        </p>
      </div>
     
    </section>

    {/* Stats */}
    <section className="py-16 bg-green-50 w-full">
      <div className="container mx-auto px-6 max-w-[1280px] w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <p className="text-4xl font-bold text-green-600 ">{stat.value}</p>
              <p className="mt-2 text-gray-600 ">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Our Story */}
    <section className="py-20">
      <div className="containe mx-auto px-6 flex flex-col md:flex-row items-cente max-w-[1280px] w-full">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <Image 
            src="https://assets.netiqa.co.ke/netiqa.jpg" 
            alt="Our Team" 
            width={600} 
            height={300} 
            className="rounded-xl shadow-xl max-h-[500px] object-cover"
          />
        </div>
        <div className="md:w-1/2 md:pl-12">
  <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
  <p className="text-gray-600 mb-4">
    Born in a Bangalore coworking space in 2023, we're a passionate team of engineers and designers solving real-world problems with lean tech. We've grown from 3 founders to 12 dedicated specialists - all united by one goal: building solutions that matter.
  </p>
  
  <ul className="list-disc pl-5 space-y-2 mb-4 text-gray-600">
    <li><span className="font-medium">15+ happy clients</span> across Kenya</li>
    <li><span className="font-medium">Bootstrapped to profitability</span> within 18 months</li>
    {/* <li><span className="font-medium">Featured at TechSpark'24</span> as top emerging startup</li> */}
    <li><span className="font-medium">100% client retention</span> since our first project</li>
  </ul>

  <p className="text-gray-600">
    We specialize in helping SMEs digitize through:
  </p>
  <ul className="list-disc pl-5 mt-2 text-gray-600">
    <li>Affordable web/app solutions (50% cheaper than enterprise alternatives)</li>
    <li>Process automation that saves 20+ hours/week</li>
    <li>Practical AI tools tailored for non-tech users</li>
  </ul>
</div>
      </div>
    </section>

    {/* Core Values */}
    <section className="py-20 bg-green-50 ">
      <div className="container mx-auto px-6 max-w-[1280px] w-full">
        <h2 className="text-3xl font-bold text-center text-gray-900  mb-16">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="p-8 bg-white  rounded-xl shadow-sm hover:shadow-lg transition-shadow text-center">
              <div className="text-4xl mb-4 flex justify-center">{value.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 ">{value.title}</h3>
              <p className="text-gray-600 ">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <div className='max-w-[1280px] w-full mx-auto max-2xl:px-4 py-10'>


<div className="w-full p-6 text-center bg-gradient-to-bl from-green-500 via-green-200 to-green-500 rounded-2xl sm:p-8">
<h2 className="text-3xl font-bold mb-6">Ready to Transform Your Business?</h2>
<p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
          Let’s build something amazing together. Get in touch with our team today.
        </p>
  <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
    <Link
      href="/contact"
      className="bg-green-700 hover:bg-green-800 text-white font-bold py-2.5 px-6 rounded-full transition-all"
    >
      Contact Us
    </Link>
    <Link
      href="/contact"
      className="bg-white text-green-800 hover:text-green-900 border border-green-700 hover:bg-green-100 font-bold py-2.5 px-6 rounded-full transition-all"
    >
      Schedule a Consultation
    </Link>
  </div>
</div>
    </div>

  </div>
);
}
