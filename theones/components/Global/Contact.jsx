'use client';
import { useState } from 'react';
import { useCreateContactMutation } from '@/redux/actions/contactActions';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { CheckCircle2, Mail, Phone, MapPin, Clock, Send, Linkedin, Instagram, Twitter, Facebook } from 'lucide-react';
import Link from 'next/link';

export default function ContactUs() {
  const [sendContact] = useCreateContactMutation();
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    description: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.description) {
      toast.error("Please fill all fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      const response = await sendContact(formData).unwrap();
      
      if (response) {
        toast.success("Contact message sent successfully!");
        setShowSuccessModal(true);
        // Reset form
        setFormData({
          name: "",
          phone: "",
          description: "",
          email: "",
        });
      }
    } catch (error) {
      const errorMessage = error?.data?.error || "Failed to send message. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      value: 'kelvin@netiqa.co.ke',
      href: 'mailto:kelvin@netiqa.co.ke',
      description: 'Send us an email anytime'
    },
    {
      icon: Phone,
      title: 'Call Us',
      value: '+254 722 214 567',
      href: 'tel:+254722214567',
      description: 'Mon-Fri from 8am to 6pm'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      value: 'Nairobi, Kenya',
      href: null,
      description: 'Come say hello at our office'
    },
    {
      icon: Clock,
      title: 'Working Hours',
      value: 'Mon - Fri: 8AM - 6PM',
      href: null,
      description: 'Weekend support available'
    },
  ];

  const socialLinks = [
    { icon: Linkedin, href: '#', color: 'hover:bg-blue-600' },
    { icon: Instagram, href: '#', color: 'hover:bg-pink-600' },
    { icon: Twitter, href: '#', color: 'hover:bg-blue-400' },
    { icon: Facebook, href: '#', color: 'hover:bg-blue-700' },
  ];

  const quickFAQs = [
    {
      question: 'How quickly can you start my project?',
      answer: 'Most projects can start within 1-2 weeks after initial consultation and agreement.'
    },
    {
      question: 'Do you offer free consultations?',
      answer: 'Yes! We offer free initial consultations to discuss your project needs and provide recommendations.'
    },
    {
      question: 'What are your payment terms?',
      answer: 'We typically work with a 50% upfront deposit and 50% upon completion, with flexible payment plans available.'
    },
    {
      question: 'Do you provide ongoing support?',
      answer: 'Yes, we offer maintenance packages and 24/7 support to keep your digital assets running smoothly.'
    },
  ];

  return (
    <div className="pt-20 lg:pt-32 w-full overflow-clip">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 opacity-50 -z-10"></div>
        
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
              Netiqa™ - Your Digital Growth Partner
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Let's Start a <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Conversation</span>
            </h1>
            <p className="text-lg text-gray-600 mb-2">
              Have a question or ready to start your project? We'd love to hear from you.
            </p>
            <p className="text-sm text-gray-500">
              Based in Nairobi, Kenya | Serving clients globally | Response time: Within 24 hours
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 flex items-center justify-center mb-4">
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{info.title}</h3>
                  {info.href ? (
                    <a href={info.href} className="text-green-600 hover:text-green-700 font-semibold block mb-1">
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-gray-900 font-semibold mb-1">{info.value}</p>
                  )}
                  <p className="text-sm text-gray-500">{info.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick FAQs Section */}
      <section className="py-12 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Quick Answers</h2>
            <p className="text-gray-600">Common questions we receive from our clients</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {quickFAQs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-green-100"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-8"
          >
            <Link
              href="/faqs"
              className="inline-block text-green-600 hover:text-green-700 font-semibold"
            >
              View All FAQs →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Main Contact Form Section */}
      <section className="py-12 pb-20">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:sticky lg:top-24"
            >
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Send Us a Message</h2>
                <p className="text-gray-600 leading-relaxed mb-3">
                  Fill out the form and our team will get back to you within 24 hours. We're excited to learn about your project and how we can help bring your vision to life.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Web Development</span>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">Branding & Design</span>
                  <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-semibold">SEO Services</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Support & Maintenance</span>
                </div>
              </div>

              {/* Why Choose Us */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Why Work With Netiqa?</h3>
                <ul className="space-y-3">
                  {[
                    '24-hour response guarantee',
                    'Free project consultation and detailed quote',
                    '5+ years of industry experience',
                    'Transparent pricing with no hidden fees',
                    'Ongoing support and maintenance included',
                    '100+ successful projects delivered',
                    'Based in Nairobi, serving global clients'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.href}
                        className={`w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center transition-all duration-300 ${social.color} hover:text-white`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Right Column - Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-lg border border-green-100">
                <div className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+254 712 345 678"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Message *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      rows="6"
                      placeholder="Tell us about your project or inquiry..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition resize-none"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  <p className="text-sm text-gray-500 text-center">
                    We respect your privacy and will never share your information.
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-3xl p-12 max-w-md w-full mx-auto text-center shadow-2xl"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 flex items-center justify-center"
            >
              <CheckCircle2 className="w-12 h-12 text-white" />
            </motion.div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Message Sent!</h3>
            <p className="text-gray-600 mb-8">
              Thank you for reaching out. We'll get back to you within 24 hours.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:shadow-lg text-white font-semibold py-3 px-6 rounded-full transition-all duration-300"
              >
                Close
              </button>
              <Link
                href="/"
                className="block text-green-600 hover:text-green-700 font-medium"
              >
                Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}