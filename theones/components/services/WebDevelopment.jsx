'use client';

import { motion } from 'framer-motion';
import { Code, Globe, Smartphone, Rocket, BarChart, Database, CheckCircle, ArrowRight, Zap, Shield, Layers, Star } from 'lucide-react';
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

export default function Webdevelopment() {
  const services = [
    {
      icon: <Code className="w-10 h-10" />,
      title: "Custom Web Apps",
      description: "Tailored solutions built with React, Next.js, and Node.js for your unique business needs",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Globe className="w-10 h-10" />,
      title: "E-Commerce Platforms",
      description: "Powerful online stores with Shopify, WooCommerce, or custom solutions that drive sales",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <Smartphone className="w-10 h-10" />,
      title: "Responsive Design",
      description: "Mobile-first development ensuring flawless experiences on all devices and screen sizes",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <Rocket className="w-10 h-10" />,
      title: "Performance Optimization",
      description: "Lightning-fast load times with 90+ Lighthouse scores and optimized user experiences",
      gradient: "from-teal-500 to-cyan-500"
    },
    {
      icon: <BarChart className="w-10 h-10" />,
      title: "SEO & Analytics",
      description: "Built-in SEO best practices and comprehensive analytics integration from day one",
      gradient: "from-teal-500 to-green-500"
    },
    {
      icon: <Database className="w-10 h-10" />,
      title: "Scalable Architecture",
      description: "Cloud-native infrastructure designed to grow with your business seamlessly",
      gradient: "from-indigo-500 to-blue-500"
    },
  ];

  const features = [
    "Modern, clean codebase",
    "Responsive & mobile-first",
    "SEO optimized structure",
    "Fast loading times",
    "Security best practices",
    "Regular backups",
    "SSL certificates",
    "Analytics integration",
    "Admin dashboard",
    "Content management",
    "Payment integration",
    "API development"
  ];

  const processSteps = [
    { 
      number: "01",
      title: "Discovery & Planning", 
      description: "We dive deep into your business goals, target audience, and technical requirements",
      duration: "1-2 weeks" 
    },
    { 
      number: "02",
      title: "Design & Prototyping", 
      description: "Creating wireframes and interactive prototypes for your approval",
      duration: "2-3 weeks" 
    },
    { 
      number: "03",
      title: "Development & Testing", 
      description: "Building your website with clean code and rigorous testing at every stage",
      duration: "4-8 weeks" 
    },
    { 
      number: "04",
      title: "Launch & Support", 
      description: "Deploying to production with ongoing maintenance and support",
      duration: "1 week+" 
    }
  ];

  const technologies = [
    { name: 'React', category: 'Frontend' },
    { name: 'Next.js', category: 'Framework' },
    { name: 'TypeScript', category: 'Language' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'Tailwind CSS', category: 'Styling' },
    { name: 'PostgreSQL', category: 'Database' },
    { name: 'MongoDB', category: 'Database' },
    { name: 'AWS', category: 'Cloud' },
    { name: 'Docker', category: 'DevOps' },
    { name: 'GraphQL', category: 'API' },
  ];

  const pricingTiers = [
    {
      name: "Starter",
      price: "From KES 50,000",
      description: "Perfect for small businesses and startups",
      features: [
        "Up to 5 pages",
        "Responsive design",
        "Contact form",
        "Basic SEO",
        "1 month support"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "From KES 150,000",
      description: "Ideal for growing businesses",
      features: [
        "Up to 15 pages",
        "Custom design",
        "CMS integration",
        "Advanced SEO",
        "E-commerce ready",
        "3 months support"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom Quote",
      description: "For complex business needs",
      features: [
        "Unlimited pages",
        "Custom features",
        "API development",
        "Advanced integrations",
        "Priority support",
        "12 months support"
      ],
      popular: false
    }
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative py-24 md:py-32 overflow-hidden md:h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50"
      >
        <div className="container max-w-[1280px] w-full mx-auto max-lg:px-4 pt-20">
          {/* <Breadcrumb /> */}
          
          <div className="text-center ">
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full mb-6"
            >
              <Zap className="w-4 h-4 text-green-600" />
              <span className="text-sm font-semibold text-green-700">Fast, Secure & Scalable</span>
            </motion.div>

            <motion.h1 
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold mb-6 text-gray-900"
            >
              Web Development <br />
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                That Drives Results
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
            >
              We build fast, secure, and scalable web applications that help your business grow. 
              From simple websites to complex web platforms, we deliver excellence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <Link href="/get-a-quote">
                <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-semibold flex items-center gap-2 transition-all transform hover:scale-105">
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link href="/portfolio">
                <button className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-full font-semibold border-2 border-gray-200 transition-all">
                  View Our Work
                </button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
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
              Our <span className="text-green-600">Services</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Comprehensive web development solutions tailored to your business needs
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
                Everything You Need <br />
                <span className="text-green-600">Out of the Box</span>
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Our web development services include all the essential features you need 
                to succeed online. No hidden costs, no surprises.
              </p>
              <Link href="/contact">
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold transition-all">
                  Let's Talk About Your Project
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

      {/* Process Timeline */}
      <section className="py-20 bg-white">
        <div className="container max-w-[1280px] w-full mx-auto max-lg:px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Our Development <span className="text-green-600">Process</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              A proven methodology that ensures your project is delivered on time and exceeds expectations
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
                <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-2xl h-full">
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
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:bloc absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-green-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container max-w-[1280px] w-full mx-auto max-lg:px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              Cutting-Edge <span className="text-green-400">Technology</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              We use the latest and most reliable technologies to build your web applications
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-800 p-6 rounded-xl text-center hover:bg-gray-700 transition-all cursor-pointer"
              >
                <div className="text-2xl font-bold mb-2">{tech.name}</div>
                <div className="text-sm text-gray-400">{tech.category}</div>
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
              Choose a package that fits your needs. All packages include hosting setup and training.
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
            <p className="text-gray-600 mb-4">Need a custom solution?</p>
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
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container max-w-[1280px] w-full mx-auto max-lg:px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-xl mb-8 text-green-50 max-w-2xl mx-auto">
              Let's turn your vision into reality. Get a free consultation and project estimate today.
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
                  Schedule a Call
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