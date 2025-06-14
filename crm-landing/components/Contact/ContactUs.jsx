'use client'
import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageCircle, 
  Calendar, 
  Users, 
  Zap,
  CheckCircle,
  ArrowRight,
  Globe,
  Headphones,
  FileText
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: 'general',
    message: '',
    budget: '',
    timeline: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Send us an email and we'll respond within 24 hours",
      contact: "hello@netiqa.com",
      action: "Send Email",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak directly with our sales team",
      contact: "+1 (555) 123-4567",
      action: "Call Now",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support team in real-time",
      contact: "Available 24/7",
      action: "Start Chat",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Calendar,
      title: "Book a Demo",
      description: "Schedule a personalized product demonstration",
      contact: "30-minute session",
      action: "Schedule Demo",
      color: "from-orange-500 to-red-500"
    }
  ];

  const officeLocations = [
    {
      city: "New York",
      address: "123 Business Ave, Suite 500",
      zipCode: "New York, NY 10001",
      phone: "+1 (555) 123-4567",
      timezone: "EST"
    },
 
  ];

  const supportOptions = [
    {
      icon: FileText,
      title: "Documentation",
      description: "Comprehensive guides and API documentation"
    },
    {
      icon: Headphones,
      title: "Technical Support",
      description: "Get help with integration and troubleshooting"
    },
    {
      icon: Users,
      title: "Community Forum",
      description: "Connect with other Netiqa users and experts"
    }
  ];

  if (isSubmitted) {
    return (
      <div className="flex min-h-screen fixed bg-green-50 w-full z-50 top-0 items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-black" />
          </div>
          <h2 className="text-3xl font-bold text-black mb-4">Thank You!</h2>
          <p className="text-black/80 mb-8">
            We've received your message and will get back to you within 24 hours.
          </p>
          <button 
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                name: '', email: '', company: '', phone: '', subject: 'general', message: '', budget: '', timeline: ''
              });
            }}
            className="px-6 py-2.5 bg-gradient-to-r from-green-300 to-green-800 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
          >
            Close
          </button>
          
        </div>
      </div>
    );
  }

  return (
    <div className="">
      
      <div className="relative z-10 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1280px]">
          
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 backdrop-blur-md rounded-full text-black/80 text-sm font-medium mb-6 border border-green-400">
              <Zap className="w-4 h-4" />
              Ready to Get Started?
            </div>
            
            <h1 className="text-5xl md:text-6xl flex items-center justify-center font-bold text-black mb-6 leading-tight">
              Get in
              <span className="bg-gradient-to-r from-green-400 to-green-800 bg-clip-text text-transparent block">
                Touch
              </span>
            </h1>
            
            <p className="text-xl text-black/80 max-w-3xl mx-auto leading-relaxed">
              Ready to transform your business with Netiqa? Our team is here to help you get started with the perfect CRM solution for your needs.
            </p>
          </div>

          {/* Contact Methods Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <div
                  key={index}
                  className="group bg-green-100 backdrop-blur-xl rounded-2xl p-6 border border-green-500 hover:bg-green-505 transition-all duration-300 cursor-pointer hover:scale-105"
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${method.color} rounded-xl mb-4`}>
                    <IconComponent className="w-6 h-6 text-black" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-black mb-2">{method.title}</h3>
                  <p className="text-black/60 text-sm mb-3 leading-relaxed">{method.description}</p>
                  <p className="text-black font-medium mb-4">{method.contact}</p>
                  
                  <button className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-400 to-green-800 text-white text-sm font-semibold rounded-lg hover:shadow-lg transition-all duration-300`}>
                    {method.action}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            
            {/* Contact Form */}
            <div className="bg-green-50 backdrop-blur-xl rounded-3xl p-8 border border-green-400">
              <h2 className="text-3xl font-bold text-black mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-black/80 text-sm font-medium mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-green-50 border border-green-500 rounded-xl text-black placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-black/80 text-sm font-medium mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-green-50 border border-green-500 rounded-xl text-black placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-black/80 text-sm font-medium mb-2">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-green-50 border border-green-500 rounded-xl text-black placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="Your Company"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-black/80 text-sm font-medium mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-green-50 border border-green-500 rounded-xl text-black placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-black/80 text-sm font-medium mb-2">Subject *</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-green-50 border border-green-500 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="sales">Sales Question</option>
                    <option value="support">Technical Support</option>
                    <option value="demo">Request Demo</option>
                    <option value="partnership">Partnership</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-black/80 text-sm font-medium mb-2">Budget Range</label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-green-50 border border-green-500 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select budget</option>
                      <option value="under-1k">Under $1,000/month</option>
                      <option value="1k-5k">$1,000 - $5,000/month</option>
                      <option value="5k-10k">$5,000 - $10,000/month</option>
                      <option value="over-10k">Over $10,000/month</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-black/80 text-sm font-medium mb-2">Timeline</label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-green-50 border border-green-500 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select timeline</option>
                      <option value="immediate">Immediate (Within 1 month)</option>
                      <option value="quarter">This Quarter (1-3 months)</option>
                      <option value="half-year">Next 6 months</option>
                      <option value="exploring">Just exploring</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-black/80 text-sm font-medium mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-green-50 border border-green-500 rounded-xl text-black placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                    placeholder="Tell us about your CRM needs and how we can help..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-3 px-8 py-2.5 bg-gradient-to-r from-green-400 to-green-800 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
            
            {/* Office Locations & Support */}
            <div className="space-y-8">
              
              {/* Office Locations */}
              <div className="bg-green-100 backdrop-blur-xl rounded-3xl p-8 border border-green-500">
                <h2 className="text-3xl font-bold text-black mb-6 flex items-center gap-3">
                  <MapPin className="w-8 h-8" />
                  Our Offices
                </h2>
                
                <div className="space-y-6">
                  {officeLocations.map((office, index) => (
                    <div key={index} className="border-b border-white/10 pb-6 last:border-b-0 last:pb-0">
                      <h3 className="text-xl font-bold text-black mb-2">{office.city}</h3>
                      <div className="space-y-2 text-black/70">
                        <p className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {office.address}, {office.zipCode}
                        </p>
                        <p className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          {office.phone}
                        </p>
                        <p className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          Business Hours ({office.timezone})
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Support Options */}
              <div className="bg-green-100 backdrop-blur-xl rounded-3xl p-8 border border-green-500">
                <h2 className="text-3xl font-bold text-black mb-6 flex items-center gap-3">
                  <Headphones className="w-8 h-8" />
                  Need Help?
                </h2>
                
                <div className="space-y-4">
                  {supportOptions.map((option, index) => {
                    const IconComponent = option.icon;
                    return (
                      <div key={index} className="flex items-start gap-4 p-4 bg-green-50 rounded-xl hover:bg-green-300 transition-all cursor-pointer">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-800 rounded-lg flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-black font-semibold mb-1">{option.title}</h3>
                          <p className="text-black/60 text-sm">{option.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
            </div>
          </div>
          
          {/* Bottom CTA */}
          <div className="text-center bg-green-50 backdrop-blur-xl rounded-3xl p-12 border border-green-500">
            <Globe className="w-16 h-16 text-blue-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-black mb-4">
              Ready to Scale Globally?
            </h2>
            <p className="text-black/80 mb-8 max-w-2xl mx-auto">
              Join thousands of companies worldwide that trust Netiqa to power their customer relationships and drive growth across all markets.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-2.5 cursor-pointer bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-green-500/25 transition-all duration-300 hover:scale-105">
                Start Free Trial
              </button>
              <button className="px-8 py-2.5 bg-transparent cursor-pointer border-2 border-green-400 text-black font-bold rounded-xl  hover:border-green-800 transition-all duration-300">
                View Pricing
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

