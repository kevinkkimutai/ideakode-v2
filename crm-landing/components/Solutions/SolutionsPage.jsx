'use client'
import React, { useState } from 'react';
import { BarChart3, Users, Megaphone, Smartphone, Link, Shield, ChevronRight, Star, ArrowUp } from 'lucide-react';

export default function SolutionsPage() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const solutions = [
    {
      id: 1,
      icon: BarChart3,
      title: "Sales Management",
      description: "Accelerate your sales cycle with intelligent lead tracking, automated workflows, and comprehensive pipeline management.",
      features: [
        "Lead scoring and qualification",
        "Automated follow-up sequences", 
        "Sales forecasting and analytics",
        "Team performance tracking"
      ],
      color: "from-blue-500 to-purple-600"
    },
    {
      id: 2,
      icon: Users,
      title: "Customer Service",
      description: "Deliver exceptional customer experiences with unified support tools, ticket management, and knowledge base integration.",
      features: [
        "Multi-channel support hub",
        "Automated ticket routing",
        "Customer satisfaction tracking",
        "Self-service portal"
      ],
      color: "from-green-500 to-teal-600"
    },
    {
      id: 3,
      icon: Megaphone,
      title: "Marketing Automation",
      description: "Create targeted campaigns, nurture leads, and measure ROI with our integrated marketing automation platform.",
      features: [
        "Email campaign builder",
        "Lead nurturing workflows",
        "Campaign performance analytics",
        "Social media integration"
      ],
      color: "from-orange-500 to-red-600"
    },
    {
      id: 4,
      icon: Smartphone,
      title: "Mobile CRM",
      description: "Stay connected to your business anywhere with our mobile-first CRM solution that works seamlessly across all devices.",
      features: [
        "Native mobile apps",
        "Offline data synchronization",
        "Real-time notifications",
        "GPS-enabled check-ins"
      ],
      color: "from-indigo-500 to-blue-600"
    },
    {
      id: 5,
      icon: Link,
      title: "Integrations",
      description: "Connect Netiqa with your existing tools and workflows through our extensive library of integrations and APIs.",
      features: [
        "200+ pre-built integrations",
        "RESTful API access",
        "Custom webhook support",
        "Data migration assistance"
      ],
      color: "from-pink-500 to-rose-600"
    },
    {
      id: 6,
      icon: Shield,
      title: "Security & Compliance",
      description: "Protect your data with enterprise-grade security features and maintain compliance with industry standards.",
      features: [
        "End-to-end encryption",
        "GDPR & CCPA compliance",
        "Role-based access control",
        "Regular security audits"
      ],
      color: "from-emerald-500 to-green-600"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Active Users" },
    { number: "95%", label: "Customer Satisfaction" },
    { number: "40%", label: "Average Sales Increase" },
    { number: "24/7", label: "Support Available" }
  ];

  return (
    <div className="">

      <div className="relative z-10 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-300/50 backdrop-blur-md rounded-full text-black/80 text-sm font-medium mb-6 border border-white/20">
              <Star className="w-4 h-4" />
              Trusted by 10,000+ Companies
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-black mb-6 leading-tight">
              Powerful CRM
              <span className="bg-gradient-to-r from-green-300 to-green-700 bg-clip-text text-transparent block">
                Solutions
              </span>
            </h1>
            
            <p className="text-xl text-black/80 max-w-3xl mx-auto leading-relaxed">
              Transform your business relationships with Netiqa's comprehensive CRM platform designed to streamline operations, boost productivity, and drive exponential growth
            </p>
          </div>

          {/* Solutions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {solutions.map((solution) => {
              const IconComponent = solution.icon;
              return (
                <div
                  key={solution.id}
                  className={`group relative bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 transition-all duration-500 hover:scale-105 hover:bg-white/15 cursor-pointer ${
                    hoveredCard === solution.id ? 'shadow-2xl shadow-purple-500/25' : 'shadow-xl'
                  }`}
                  onMouseEnter={() => setHoveredCard(solution.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Gradient Border Effect */}
                  <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`}></div>
                  
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${solution.color} rounded-xl mb-6 shadow-lg`}>
                    <IconComponent className="w-8 h-8 text-black" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-2xl font-bold text-black mb-4 group-hover:text-green-400 transition-colors">
                    {solution.title}
                  </h3>
                  
                  <p className="text-black/70 mb-6 leading-relaxed">
                    {solution.description}
                  </p>
                  
                  {/* Features List */}
                  <ul className="space-y-3 mb-8">
                    {solution.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-black/60 text-sm">
                        <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-3 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  {/* CTA Button */}
                  <button className={`group/btn inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-800 to-green-400 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105`}>
                    Learn More
                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA Section */}
          <div className="bg-green-100 backdrop-blur-xl rounded-3xl p-12 border border-white/20 text-center">
            <h2 className="text-4xl font-bold text-black mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-black/80 mb-8 max-w-2xl mx-auto">
              Join thousands of companies that trust Netiqa to manage their customer relationships and drive unprecedented growth
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-black mb-2 flex items-center justify-center gap-1">
                    {stat.number}
                    {stat.label === "Average Sales Increase" && <ArrowUp className="w-6 h-6 text-green-400" />}
                  </div>
                  <div className="text-black/60 text-sm font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-800 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 w-full sm:w-auto">
                Start Free Trial
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-green-600 text-black font-bold rounded-xl hover:bg-green-50 hover:border-green-800 transition-all duration-300 w-full sm:w-auto">
                Schedule Demo
              </button>
            </div>
          </div>
          
      
        </div>
      </div>
    </div>
  );
};

