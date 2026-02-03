'use client';

import { motion } from 'framer-motion';
import { Palette, PenTool, MonitorSmartphone, Layers3, Rocket, BarChart, CheckCircle, ArrowRight, Sparkles, Eye, Zap, Star, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumb from '../Global/Breadcrumb';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function GraphicDesign() {
  const services = [
    {
      icon: <Palette className="w-10 h-10" />,
      title: "Brand Identity Design",
      description: "Complete brand identity packages including logo, color palette, typography, and comprehensive brand guidelines",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <PenTool className="w-10 h-10" />,
      title: "UI/UX Design",
      description: "Beautiful, intuitive user interfaces that enhance engagement and deliver exceptional user experiences",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <MonitorSmartphone className="w-10 h-10" />,
      title: "Digital Graphics",
      description: "Social media graphics, banner ads, email templates, and all your digital marketing assets",
      gradient: "from-teal-500 to-green-500"
    },
    {
      icon: <Layers3 className="w-10 h-10" />,
      title: "Print Design",
      description: "Business cards, brochures, flyers, posters, and all print materials that make an impact",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: <Rocket className="w-10 h-10" />,
      title: "Brand Rebranding",
      description: "Breathe new life into your brand with modern, strategic refreshes that resonate with today's audience",
      gradient: "from-pink-500 to-rose-500"
    },
    {
      icon: <ImageIcon className="w-10 h-10" />,
      title: "Packaging Design",
      description: "Eye-catching product packaging and label design that stands out on shelves and online",
      gradient: "from-indigo-500 to-purple-500"
    }
  ];

  const features = [
    "Unlimited revisions",
    "Source files included",
    "Brand style guide",
    "Fast turnaround",
    "Print-ready files",
    "Web-optimized assets",
    "Social media templates",
    "Custom illustrations",
    "Typography selection",
    "Color psychology",
    "Market research",
    "Competitor analysis"
  ];

  const processSteps = [
    { 
      number: "01",
      title: "Brand Discovery", 
      description: "Understanding your vision, values, target audience, and competitive landscape",
      duration: "3-5 days"
    },
    { 
      number: "02",
      title: "Concept Development", 
      description: "Creating mood boards, sketches, and initial design directions for your approval",
      duration: "5-7 days"
    },
    { 
      number: "03",
      title: "Design & Refinement", 
      description: "Crafting high-fidelity designs with multiple revision rounds until perfection",
      duration: "1-2 weeks"
    },
    { 
      number: "04",
      title: "Delivery & Guidelines", 
      description: "Providing all final assets, source files, and comprehensive brand guidelines",
      duration: "2-3 days"
    }
  ];

  const designTools = [
    { name: 'Adobe Illustrator', category: 'Vector Design' },
    { name: 'Adobe Photoshop', category: 'Image Editing' },
    { name: 'Figma', category: 'UI/UX Design' },
    { name: 'Adobe XD', category: 'Prototyping' },
    { name: 'InDesign', category: 'Layout Design' },
    { name: 'After Effects', category: 'Motion Graphics' },
    { name: 'Sketch', category: 'UI Design' },
    { name: 'CorelDRAW', category: 'Vector Graphics' },
  ];

  const pricingTiers = [
    {
      name: "Logo & Branding",
      price: "From KES 30,000",
      description: "Perfect for startups and new businesses",
      features: [
        "3 logo concepts",
        "Unlimited revisions",
        "Color palette",
        "Basic brand guide",
        "Web & print files"
      ],
      popular: false
    },
    {
      name: "Complete Brand Identity",
      price: "From KES 100,000",
      description: "Comprehensive branding solution",
      features: [
        "Logo design package",
        "Business card design",
        "Letterhead & envelope",
        "Social media templates",
        "Brand style guide",
        "Marketing materials",
        "3 months support"
      ],
      popular: true
    },
    {
      name: "Enterprise Branding",
      price: "Custom Quote",
      description: "For established businesses",
      features: [
        "Full brand strategy",
        "Complete visual identity",
        "Packaging design",
        "Marketing collateral",
        "Brand guidelines book",
        "Motion graphics",
        "Ongoing support"
      ],
      popular: false
    }
  ];

  const portfolio = [
    {
      title: "Tech Startup Branding",
      category: "Brand Identity",
      image: "https://assets.netiqa.co.ke/ui%3Aux.jpg"
    },
    {
      title: "Restaurant Brand",
      category: "Logo & Menu Design",
      image: "https://assets.netiqa.co.ke/netiqa.jpg"
    },
    {
      title: "E-commerce Store",
      category: "Product Packaging",
      image: "https://assets.netiqa.co.ke/Asset%209.png"
    }
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative py-24 md:py-32 md:h-screen overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50"
      >
        <div className="container max-w-[1280px] w-full mx-auto max-lg:px-4 pt-20">
          {/* <Breadcrumb /> */}
          
          <div className="text-center">
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4 text-green-600" />
              <span className="text-sm font-semibold text-green-700">Creative Excellence</span>
            </motion.div>

            <motion.h1 
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold mb-6 text-gray-900"
            >
              Design That <br />
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Tells Your Story
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
            >
              We craft unforgettable brand experiences that resonate with your audience. 
              From logos to complete brand identities, we bring your vision to life.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <Link href="/get-a-quote">
                <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-semibold flex items-center gap-2 transition-all transform hover:scale-105">
                  Start Your Project
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link href="/portfolio">
                <button className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-full font-semibold border-2 border-gray-200 transition-all">
                  View Portfolio
                </button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </motion.section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container max-w-[1280px] w-full mx-auto max-lg:px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Our <span className="text-green-600">Design Services</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Comprehensive design solutions that elevate your brand and captivate your audience
            </p>
          </motion.div>

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
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-100 group"
              >
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${service.gradient} text-white mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Checklist */}
      <section className="py-20 bg-gray-50">
        <div className="container max-w-[1280px] w-full mx-auto max-lg:px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold mb-6 text-gray-900">
                What You Get <br />
                <span className="text-green-600">With Every Project</span>
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Our design packages include everything you need to build a strong, 
                memorable brand that stands out in your industry.
              </p>
              <Link href="/contact">
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold transition-all">
                  Discuss Your Project
                </button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm"
                >
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700 font-medium text-sm">{feature}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Design Process */}
      <section className="py-20 bg-white">
        <div className="container max-w-[1280px] w-full mx-auto max-lg:px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Our Creative <span className="text-green-600">Process</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              A systematic approach that ensures your brand identity perfectly captures your vision
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl h-full">
                  <div className="text-6xl font-bold text-green-200 mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    {step.description}
                  </p>
                  <div className="inline-flex items-center gap-2 text-sm text-green-600 font-semibold">
                    <span>{step.duration}</span>
                  </div>
                </div>
                {/* {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-purple-300" />
                  </div>
                )} */}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-purple-900 text-white">
        <div className="container max-w-[1280px] w-full mx-auto max-lg:px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              Recent <span className="text-green-300">Design Work</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Explore some of our latest branding and design projects
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {portfolio.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden group cursor-pointer"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image 
                    src={item.image}
                    alt={item.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-green-300 text-sm">{item.category}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/portfolio">
              <button className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold transition-all inline-flex items-center gap-2">
                View Full Portfolio
                <Eye className="w-5 h-5" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Design Tools */}
      <section className="py-20 bg-white">
        <div className="container max-w-[1280px] w-full mx-auto max-lg:px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Professional <span className="text-green-600">Design Tools</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We use industry-leading software to deliver exceptional results
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {designTools.map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl text-center hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="text-xl font-bold text-gray-900 mb-2">{tool.name}</div>
                <div className="text-sm text-gray-600">{tool.category}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container max-w-[1280px] w-full mx-auto max-lg:px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Transparent <span className="text-green-600">Pricing</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Choose a package that fits your needs. All packages include unlimited revisions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-white rounded-2xl p-8 ${
                  tier.popular 
                    ? 'shadow-2xl border-2 border-green-500 transform scale-105' 
                    : 'shadow-lg border border-gray-200'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-green-600 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      Most Popular
                    </span>
                  </div>
                )}
                
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                <p className="text-gray-600 mb-6">{tier.description}</p>
                <div className="text-4xl font-bold text-gray-900 mb-6">
                  {tier.price}
                </div>
                
                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link href="/get-a-quote">
                  <button className={`w-full py-3 rounded-full font-semibold transition-all ${
                    tier.popular
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}>
                    Get Started
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-gray-600 mb-4">Need a custom design package?</p>
            <Link href="/contact">
              <button className="text-green-600 hover:text-green-700 font-semibold flex items-center gap-2 mx-auto">
                Contact us for a personalized quote
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="container max-w-[1280px] w-full mx-auto max-lg:px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Build Your Brand?
            </h2>
            <p className="text-xl mb-8 text-purple-50 max-w-2xl mx-auto">
              Let's create a visual identity that captures your vision and resonates with your audience.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/get-a-quote">
                <button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold flex items-center gap-2 transition-all transform hover:scale-105">
                  Get Free Quote
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link href="/contact">
                <button className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 rounded-full font-semibold transition-all">
                  Schedule Consultation
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}