'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Code2, Palette, Search, Smartphone, TrendingUp, Layers } from 'lucide-react'

export default function Services() {

  const services = [
    {
      "title": "Web Development",
      "description": "Custom websites, e-commerce platforms, and CMS solutions built for scalability and performance.",
      "icon": <Code2 className="w-10 h-10" />,
      "gradient": "from-blue-500 to-cyan-500",
      "link": "/web-development"
    },
    {
      "title": "Graphic Design",
      "description": "Logos, branding, UI/UX design, and marketing materials that elevate your brand identity.",
      "icon": <Palette className="w-10 h-10" />,
      "gradient": "from-purple-500 to-pink-500",
      "link": "/branding-design"
    },
    {
      "title": "Software Development",
      "description": "Custom software solutions including ERP systems, mobile apps, and automation tools.",
      "icon": <Smartphone className="w-10 h-10" />,
      "gradient": "from-green-500 to-emerald-500",
      "link": "/web-development"
    },
    {
      "title": "SEO & Digital Marketing",
      "description": "Optimize your online presence with SEO, social media marketing, and content strategy.",
      "icon": <Search className="w-10 h-10" />,
      "gradient": "from-orange-500 to-red-500",
      "link": "/seo"
    },
    {
      "title": "IT Consulting & Support",
      "description": "Expert technology guidance to help businesses integrate and optimize IT solutions.",
      "icon": <TrendingUp className="w-10 h-10" />,
      "gradient": "from-indigo-500 to-blue-500",
      "link": "/contact"
    },
    {
      "title": "UI/UX Design",
      "description": "User-focused designs that ensure a seamless experience across web and mobile applications.",
      "icon": <Layers className="w-10 h-10" />,
      "gradient": "from-teal-500 to-green-500",
      "link": "/branding-design"
    }
  ]
      
  return (
    <div className='max-w-[1280px] py-10 md:py-20 w-full mx-auto max-lg:px-4 flex flex-col lg:items-center justify-center'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl text-gray-900 font-bold mb-4">
          Our <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Services</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-blue-600 mx-auto mb-6"></div>
        <p className="text-gray-600 mt-5 lg:w-[70%] mx-auto text-lg max-w-3xl">
          We are a tech-driven company specializing in graphic design, web
          development, and software solutions. With a focus on innovation and
          user experience, we help businesses establish a strong digital
          presence.
        </p>
      </motion.div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-10 md:mt-16 w-full'>
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            className="group relative"
          >
            <Link href={service.link}>
              <div className="relative h-full p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden">
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                
                {/* Icon container */}
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${service.gradient} text-white mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>
                
                {/* Content */}
                <h5 className="mb-3 text-2xl font-bold text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-green-600 group-hover:to-blue-600 transition-all duration-300">
                  {service.title}
                </h5>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {service.description}
                </p>
                
                {/* Arrow indicator */}
                <div className="flex items-center text-green-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="mr-2">Learn More</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
