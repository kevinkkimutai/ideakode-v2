'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Target, Lightbulb, Users, Award, Code, Palette, TrendingUp, Shield, Zap, Layers, CheckCircle2, Star } from 'lucide-react';

export default function AboutPage() {
  const stats = [
    { value: '100+', label: 'Projects Delivered' },
    { value: '50+', label: 'Happy Clients' },
    { value: '5+', label: 'Years Experience' },
    { value: '24/7', label: 'Support Available' },
  ];

  const values = [
    { 
      icon: Target, 
      title: 'Innovation', 
      description: 'We embrace cutting-edge technologies and creative solutions to deliver exceptional results that drive your business forward.',
      color: 'from-green-500 to-emerald-500'
    },
    { 
      icon: Lightbulb, 
      title: 'Creativity', 
      description: 'Every project is unique. We craft custom solutions tailored to your specific needs, ensuring your brand stands out.',
      color: 'from-teal-500 to-cyan-500'
    },
    { 
      icon: Users, 
      title: 'Collaboration', 
      description: 'We work closely with our clients, building strong partnerships based on trust, transparency, and open communication.',
      color: 'from-green-600 to-emerald-600'
    },
    { 
      icon: Award, 
      title: 'Excellence', 
      description: 'Quality is our priority. We deliver polished, high-performance solutions that exceed expectations every time.',
      color: 'from-emerald-500 to-teal-500'
    },
  ];

  const services = [
    {
      icon: Code,
      title: 'Web Development',
      description: 'Custom web applications and websites built with modern technologies for optimal performance.'
    },
    {
      icon: Palette,
      title: 'Branding & Design',
      description: 'Stunning visual identities that capture your brand essence and resonate with your audience.'
    },
    {
      icon: TrendingUp,
      title: 'SEO Services',
      description: 'Strategic optimization to boost your online visibility and drive organic traffic.'
    },
    {
      icon: Shield,
      title: 'Maintenance & Support',
      description: '24/7 technical support and regular updates to keep your digital assets running smoothly.'
    },
  ];

  const team = [
    {
      name: 'Kelvin Wanjohi',
      role: 'Founder & Lead Developer',
      image: 'https://assets.netiqa.co.ke/netiqa.jpg',
      bio: 'Full-stack developer with 5+ years of experience building scalable web applications.',
    },
    {
      name: 'Creative Team',
      role: 'Design & Strategy',
      image: 'https://assets.netiqa.co.ke/netiqa.jpg',
      bio: 'Award-winning designers crafting compelling visual experiences.',
    },
    {
      name: 'Development Team',
      role: 'Engineering Excellence',
      image: 'https://assets.netiqa.co.ke/netiqa.jpg',
      bio: 'Expert developers specializing in modern web technologies and best practices.',
    },
  ];

  const approach = [
    {
      number: '01',
      title: 'Discovery & Research',
      description: 'We start by understanding your business goals, target audience, and challenges through in-depth consultations.',
    },
    {
      number: '02',
      title: 'Strategy & Planning',
      description: 'Our team develops a comprehensive roadmap with clear milestones, timelines, and deliverables.',
    },
    {
      number: '03',
      title: 'Design & Development',
      description: 'We bring your vision to life with pixel-perfect designs and clean, maintainable code.',
    },
    {
      number: '04',
      title: 'Testing & Launch',
      description: 'Rigorous quality assurance ensures your project performs flawlessly before going live.',
    },
    {
      number: '05',
      title: 'Support & Growth',
      description: 'We provide ongoing maintenance, updates, and optimization to ensure long-term success.',
    },
  ];

  const technologies = [
    { name: 'React & Next.js', category: 'Frontend' },
    { name: 'Node.js & Express', category: 'Backend' },
    { name: 'MongoDB & PostgreSQL', category: 'Database' },
    { name: 'Tailwind CSS', category: 'Styling' },
    { name: 'AWS & Vercel', category: 'Cloud' },
    { name: 'WordPress', category: 'CMS' },
    { name: 'Figma & Adobe Suite', category: 'Design' },
    { name: 'Git & GitHub', category: 'Version Control' },
  ];

  const testimonials = [
    {
      text: 'Netiqa transformed our outdated website into a modern, high-converting platform. Their attention to detail and professionalism exceeded our expectations.',
      author: 'Sarah M.',
      company: 'E-commerce Director',
      rating: 5,
    },
    {
      text: 'Working with this team was seamless. They understood our vision and delivered a product that truly represents our brand. Highly recommended!',
      author: 'James K.',
      company: 'Startup Founder',
      rating: 5,
    },
    {
      text: 'The SEO services boosted our organic traffic by 200% in just 6 months. Their expertise in digital strategy is unmatched.',
      author: 'Linda W.',
      company: 'Marketing Manager',
      rating: 5,
    },
  ];

return (
  <div className="pt-20 lg:pt-32 w-full overflow-clip">
    {/* Hero Section */}
    <section className="relative py-20 overflow-hidden max-w-[1280px] w-full mx-auto">
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 opacity-50 -z-10"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mx-auto max-lg:px-4"
      >
        <div className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-6">
          Your Digital Growth Partner
        </div>
        <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 flex md:flex-col">
          Building Digital Excellence,{' '}
          <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent md:mt-2">
            One Project at a Time
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          We're a passionate team of designers, developers, and digital strategists committed to transforming businesses through innovative technology solutions.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/get-a-quote" 
            className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300"
          >
            Start Your Project
          </Link>
          <Link 
            href="/portfolio" 
            className="px-8 py-3 bg-white border-2 border-green-600 text-green-600 rounded-full font-semibold hover:bg-green-50 transition-all duration-300"
          >
            View Our Work
          </Link>
        </div>
      </motion.div>
    </section>

    {/* Stats */}
    <section className="py-16 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 w-full">
      <div className="container mx-auto px-6 max-w-[1280px] w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-green-100"
            >
              <p className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">{stat.value}</p>
              <p className="mt-2 text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* Our Story */}
    <section className="py-20">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12 max-w-[1280px] w-full">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="md:w-1/2"
        >
          <Image 
            src="https://assets.netiqa.co.ke/netiqa.jpg" 
            alt="Our Team at Work" 
            width={600} 
            height={400} 
            className="rounded-2xl shadow-2xl max-h-[500px] object-cover w-full"
          />
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="md:w-1/2"
        >
          <div className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
            Our Journey
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            From Vision to <span className="text-green-600">Reality</span>
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Founded in 2021 in Nairobi, Kenya, Netiqa was born from a simple belief: every business deserves access to world-class digital solutions. What started as a small team of three passionate developers has grown into a full-service digital agency serving clients across Kenya and beyond.
          </p>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2"></div>
              <p className="text-gray-600"><span className="font-semibold text-gray-900">100+ projects delivered</span> across various industries including e-commerce, education, healthcare, and finance</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2"></div>
              <p className="text-gray-600"><span className="font-semibold text-gray-900">50+ satisfied clients</span> who trust us with their digital presence and continue to grow with us</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2"></div>
              <p className="text-gray-600"><span className="font-semibold text-gray-900">95% client retention rate</span> thanks to our commitment to quality, support, and long-term partnerships</p>
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed">
            Today, we're proud to be a trusted partner for businesses looking to establish or enhance their digital presence through custom web development, compelling design, and strategic SEO services.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Core Values */}
    <section className="py-20 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="container mx-auto px-6 max-w-[1280px] w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
            What Drives Us
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            These principles guide every project we undertake and every relationship we build
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 text-center border border-green-100"
              >
                <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r ${value.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>

    {/* What We Do */}
    <section className="py-20">
      <div className="container mx-auto px-6 max-w-[1280px] w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
            Our Expertise
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What We Do Best</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive digital solutions tailored to your unique business needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-8 bg-gradient-to-br from-white to-green-50 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-green-100"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{service.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>

    {/* Our Approach */}
    <section className="py-20 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="container mx-auto px-6 max-w-[1280px] w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
            How We Work
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Proven Process</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A structured approach that ensures quality results and client satisfaction at every stage
          </p>
        </motion.div>

        <div className="space-y-6">
          {approach.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col md:flex-row gap-6 items-start p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-green-100"
            >
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">{step.number}</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
              <div className="flex-shrink-0 hidden md:block">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Technology Stack */}
    <section className="py-20">
      <div className="container mx-auto px-6 max-w-[1280px] w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
            Our Tools
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Technology Stack</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We leverage the latest technologies and industry-standard tools to build robust, scalable solutions
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4"
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group px-6 py-4 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-green-100 hover:border-green-300"
            >
              <p className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors duration-300">{tech.name}</p>
              <p className="text-sm text-gray-500 mt-1">{tech.category}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* Team Section */}
    <section className="py-20 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="container mx-auto px-6 max-w-[1280px] w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
            Meet Our Team
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">The People Behind Your Success</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A talented group of professionals dedicated to bringing your vision to life
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-green-100"
            >
              <div className="relative h-64 bg-gradient-to-br from-green-100 to-emerald-100">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-green-600 font-semibold mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Testimonials */}
    <section className="py-20">
      <div className="container mx-auto px-6 max-w-[1280px] w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
            Client Stories
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from businesses we've helped grow
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed italic">"{testimonial.text}"</p>
              <div className="border-t border-gray-100 pt-4">
                <p className="font-semibold text-gray-900">{testimonial.author}</p>
                <p className="text-sm text-gray-500">{testimonial.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-20 max-w-[1280px] w-full mx-auto max-2xl:px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-12 text-center shadow-2xl"
      >
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3"></div>
        
        <div className="relative z-10">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Let's collaborate to bring your digital vision to life. Our team is ready to help you succeed.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/get-a-quote"
              className="px-8 py-4 bg-white text-green-700 font-bold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Get Started Today
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-all duration-300"
            >
              Schedule a Call
            </Link>
          </div>
        </div>
      </motion.div>
    </section>

  </div>
);
}
