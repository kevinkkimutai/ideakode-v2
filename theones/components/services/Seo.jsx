'use client';

import { motion } from 'framer-motion';
import { Search, TrendingUp, Target, LineChart, Globe, FileText, Link2, Users, ArrowRight, Zap, CheckCircle, Award, BarChart3, Star } from 'lucide-react';
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

export default function Seo() {
  const services = [
    {
      icon: <Search className="w-10 h-10" />,
      title: "Keyword Research & Strategy",
      description: "In-depth keyword analysis to target the right audience and drive qualified traffic to your website",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <FileText className="w-10 h-10" />,
      title: "On-Page SEO",
      description: "Optimize content, meta tags, headers, and site structure for maximum search engine visibility",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <Link2 className="w-10 h-10" />,
      title: "Link Building",
      description: "Quality backlink acquisition from authoritative sites to boost your domain authority",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Globe className="w-10 h-10" />,
      title: "Local SEO",
      description: "Dominate local search results with Google My Business optimization and local citations",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: <LineChart className="w-10 h-10" />,
      title: "Technical SEO",
      description: "Improve site speed, mobile-friendliness, crawlability, and Core Web Vitals for better rankings",
      gradient: "from-teal-500 to-cyan-500"
    },
    {
      icon: <BarChart3 className="w-10 h-10" />,
      title: "SEO Analytics & Reporting",
      description: "Comprehensive tracking and monthly reports showing your ROI and ranking improvements",
      gradient: "from-indigo-500 to-blue-500"
    }
  ];

  const features = [
    "Comprehensive SEO audit",
    "Competitor analysis",
    "Monthly progress reports",
    "Google Analytics setup",
    "Content optimization",
    "Schema markup",
    "XML sitemap creation",
    "Robots.txt optimization",
    "Page speed optimization",
    "Mobile optimization",
    "Keyword tracking",
    "24/7 support"
  ];

  const processSteps = [
    { 
      number: "01",
      title: "SEO Audit & Analysis", 
      description: "Comprehensive analysis of your current SEO performance, competitors, and opportunities",
      duration: "1 week"
    },
    { 
      number: "02",
      title: "Strategy Development", 
      description: "Custom SEO roadmap with targeted keywords, content plan, and technical improvements",
      duration: "1 week"
    },
    { 
      number: "03",
      title: "Implementation & Optimization", 
      description: "Execute on-page, off-page, and technical SEO improvements across your website",
      duration: "Ongoing"
    },
    { 
      number: "04",
      title: "Monitoring & Reporting", 
      description: "Track rankings, traffic, conversions with detailed monthly reports and adjustments",
      duration: "Monthly"
    }
  ];

  const seoTools = [
    { name: 'Google Analytics', category: 'Analytics' },
    { name: 'Google Search Console', category: 'Monitoring' },
    { name: 'SEMrush', category: 'Research' },
    { name: 'Ahrefs', category: 'Backlinks' },
    { name: 'Screaming Frog', category: 'Technical SEO' },
    { name: 'Moz Pro', category: 'Rankings' },
    { name: 'PageSpeed Insights', category: 'Performance' },
    { name: 'Yoast SEO', category: 'On-Page' },
  ];

  const pricingTiers = [
    {
      name: "Starter SEO",
      price: "From KES 30,000/mo",
      description: "Perfect for small businesses",
      features: [
        "Up to 10 keywords",
        "Monthly SEO audit",
        "On-page optimization",
        "Basic link building",
        "Monthly reports"
      ],
      popular: false
    },
    {
      name: "Professional SEO",
      price: "From KES 80,000/mo",
      description: "Ideal for growing businesses",
      features: [
        "Up to 30 keywords",
        "Complete SEO audit",
        "Advanced optimization",
        "Content strategy",
        "Quality link building",
        "Weekly reports",
        "Dedicated manager"
      ],
      popular: true
    },
    {
      name: "Enterprise SEO",
      price: "Custom Quote",
      description: "For large-scale businesses",
      features: [
        "Unlimited keywords",
        "Multi-location SEO",
        "Custom strategy",
        "Priority support",
        "Advanced analytics",
        "Reputation management",
        "Real-time reporting"
      ],
      popular: false
    }
  ];

  const stats = [
    { value: "200+", label: "Clients Ranked" },
    { value: "450%", label: "Avg. Traffic Increase" },
    { value: "95%", label: "Client Retention" },
    { value: "3-6 mo", label: "Avg. Time to Results" }
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
          
          <div className="text-center">
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full mb-6"
            >
              <Zap className="w-4 h-4 text-green-600" />
              <span className="text-sm font-semibold text-green-700">Proven SEO Results</span>
            </motion.div>

            <motion.h1 
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold mb-6 text-gray-900"
            >
              SEO Services <br />
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                That Drive Real Traffic
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
            >
              Dominate search results and attract more customers. Our data-driven SEO strategies 
              help you rank higher on Google and convert visitors into loyal customers.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <Link href="/get-a-quote">
                <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-semibold flex items-center gap-2 transition-all transform hover:scale-105">
                  Get Free SEO Audit
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link href="/portfolio">
                <button className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-full font-semibold border-2 border-gray-200 transition-all">
                  View Case Studies
                </button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">{stat.value}</div>
                  <div className="text-gray-600 text-sm md:text-base">{stat.label}</div>
                </div>
              ))}
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
              Our SEO <span className="text-green-600">Services</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Comprehensive search engine optimization strategies to boost your online presence
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
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100"
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center text-white mb-6`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="container max-w-[1280px] w-full mx-auto max-lg:px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Why Choose <span className="text-green-600">Our SEO Services</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We combine technical expertise with proven strategies to deliver measurable results
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm"
              >
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                <span className="text-gray-700 font-medium">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-white">
        <div className="container max-w-[1280px] w-full mx-auto max-lg:px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Our SEO <span className="text-green-600">Process</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              A systematic approach to improve your search engine rankings
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 h-full border-2 border-green-100">
                  <div className="text-5xl font-bold text-green-200 mb-4">{step.number}</div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 mb-4">{step.description}</p>
                  <div className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {step.duration}
                  </div>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-green-200"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Tools */}
      <section className="py-20 bg-gray-50">
        <div className="container max-w-[1280px] w-full mx-auto max-lg:px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Tools We <span className="text-green-600">Use</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Industry-leading SEO tools for the best results
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {seoTools.map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all"
              >
                <div className="font-bold text-gray-900 mb-2">{tool.name}</div>
                <div className="text-sm text-green-600">{tool.category}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-white">
        <div className="container max-w-[1280px] w-full mx-auto max-lg:px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              SEO <span className="text-green-600">Pricing</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Flexible packages designed to fit your business needs and budget
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative rounded-2xl p-8 ${
                  tier.popular 
                    ? 'bg-gradient-to-br from-green-600 to-emerald-600 text-white shadow-2xl scale-105 border-4 border-green-400' 
                    : 'bg-white border-2 border-gray-200 shadow-lg'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    Most Popular
                  </div>
                )}
                
                <h3 className={`text-2xl font-bold mb-2 ${tier.popular ? 'text-white' : 'text-gray-900'}`}>
                  {tier.name}
                </h3>
                <p className={`text-sm mb-6 ${tier.popular ? 'text-green-100' : 'text-gray-600'}`}>
                  {tier.description}
                </p>
                
                <div className="mb-6">
                  <div className={`text-3xl font-bold ${tier.popular ? 'text-white' : 'text-gray-900'}`}>
                    {tier.price}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-2">
                      <CheckCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${tier.popular ? 'text-green-200' : 'text-green-600'}`} />
                      <span className={tier.popular ? 'text-green-50' : 'text-gray-700'}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/get-a-quote">
                  <button className={`w-full py-3 rounded-full font-semibold transition-all ${
                    tier.popular
                      ? 'bg-white text-green-600 hover:bg-green-50'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}>
                    Get Started
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green-600 to-emerald-600">
        <div className="container max-w-[1280px] w-full mx-auto max-lg:px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <Award className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4">Ready to Rank Higher on Google?</h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Let's boost your online visibility and drive more qualified traffic to your website
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/get-a-quote">
                <button className="bg-white text-green-600 hover:bg-green-50 px-8 py-4 rounded-full font-semibold flex items-center gap-2 transition-all transform hover:scale-105">
                  Get Free SEO Consultation
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link href="/contact">
                <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 rounded-full font-semibold transition-all">
                  Contact Us
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
