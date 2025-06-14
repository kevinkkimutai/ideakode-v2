'use client'
import React, { useState } from 'react';
import { 
  Users, 
  BarChart3, 
  Mail, 
  Phone, 
  Calendar, 
  Target, 
  Zap, 
  Shield, 
  Globe, 
  Smartphone, 
  Database, 
  Settings,
  CheckCircle,
  ArrowRight,
  Play,
  Star,
  TrendingUp,
  MessageSquare,
  FileText,
  Clock,
  Lock
} from 'lucide-react';

const FeaturesPage = () => {
  const [activeTab, setActiveTab] = useState('sales');

  const heroFeatures = [
    {
      icon: Users,
      title: 'Contact Management',
      description: 'Organize and manage all your customer data in one centralized location'
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Get deep insights into your sales performance with comprehensive reporting'
    },
    {
      icon: Zap,
      title: 'Automation',
      description: 'Streamline your workflow with intelligent automation and triggers'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-grade security with encryption and compliance certifications'
    }
  ];

  const featureCategories = {
    sales: {
      title: 'Sales Management',
      description: 'Close more deals with powerful sales tools',
      features: [
        {
          icon: Target,
          title: 'Pipeline Management',
          description: 'Visual pipeline to track deals through every stage',
          benefits: ['Drag-and-drop interface', 'Custom stages', 'Deal forecasting', 'Win/loss analysis']
        },
        {
          icon: TrendingUp,
          title: 'Sales Forecasting',
          description: 'Predict revenue with AI-powered forecasting',
          benefits: ['Predictive analytics', 'Quota tracking', 'Territory management', 'Performance metrics']
        },
        {
          icon: FileText,
          title: 'Proposal Management',
          description: 'Create and send professional proposals',
          benefits: ['Template library', 'E-signature integration', 'Approval workflows', 'Version control']
        }
      ]
    },
    marketing: {
      title: 'Marketing Automation',
      description: 'Nurture leads and drive conversions',
      features: [
        {
          icon: Mail,
          title: 'Email Marketing',
          description: 'Create and send targeted email campaigns',
          benefits: ['Template builder', 'A/B testing', 'Automated sequences', 'Deliverability optimization']
        },
        {
          icon: MessageSquare,
          title: 'Lead Scoring',
          description: 'Automatically score and prioritize leads',
          benefits: ['Behavioral tracking', 'Custom scoring rules', 'Lead qualification', 'Sales handoff']
        },
        {
          icon: Globe,
          title: 'Multi-channel Campaigns',
          description: 'Reach customers across all channels',
          benefits: ['Social media integration', 'SMS campaigns', 'Landing pages', 'Campaign attribution']
        }
      ]
    },
    support: {
      title: 'Customer Support',
      description: 'Deliver exceptional customer service',
      features: [
        {
          icon: Phone,
          title: 'Help Desk',
          description: 'Manage support tickets efficiently',
          benefits: ['Ticket routing', 'SLA management', 'Knowledge base', 'Customer satisfaction surveys']
        },
        {
          icon: Clock,
          title: 'Live Chat',
          description: 'Real-time customer support',
          benefits: ['Chat widgets', 'Canned responses', 'File sharing', 'Chat history']
        },
        {
          icon: Calendar,
          title: 'Appointment Scheduling',
          description: 'Let customers book appointments easily',
          benefits: ['Calendar integration', 'Automated reminders', 'Time zone handling', 'Booking forms']
        }
      ]
    }
  };


  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Sales Director',
      company: 'TechCorp',
      quote: 'Our sales team productivity increased by 40% after implementing this CRM. The automation features are game-changing.',
      rating: 5
    },
    {
      name: 'Mike Chen',
      role: 'Marketing Manager',
      company: 'GrowthLab',
      quote: 'The marketing automation tools helped us nurture leads more effectively. Our conversion rate doubled.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'Customer Success',
      company: 'ServicePro',
      quote: 'Customer support has never been easier. The unified dashboard gives us complete visibility into customer interactions.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <section className="py-20 px-4 md:mt-16">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Powerful Features for
              <span className="text-green-600 block">Modern Businesses</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Everything you need to manage customers, close deals, and grow your business. 
              Our comprehensive CRM platform adapts to your workflow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-green-600 text-white px-8 py-2.5 rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                <Play className="w-5 h-5" />
                Watch Demo
              </button>
              <button className="bg-white text-green-600 px-8 py-2.5 rounded-xl font-semibold border-2 border-green-600 hover:bg-green-50 transition-colors">
                Start Free Trial
              </button>
            </div>
          </div>

          {/* Hero Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {heroFeatures.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-green-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Categories */}
      <section className=" px-4">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Complete Business Solution
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our comprehensive feature set designed to streamline every aspect of your customer relationships.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-2xl p-2 shadow-lg">
              {Object.entries(featureCategories).map(([key, category]) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                    activeTab === key
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {category.title}
                </button>
              ))}
            </div>
          </div>

          {/* Active Tab Content */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                {featureCategories[activeTab].title}
              </h3>
              <p className="text-xl text-gray-600">
                {featureCategories[activeTab].description}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {featureCategories[activeTab].features.map((feature, index) => (
                <div key={index} className="bg-green-50 p-6 rounded-2xl">
                  <div className="bg-green-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h4>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Advanced Analytics & Reporting
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Make data-driven decisions with our comprehensive analytics suite. 
                  Track performance, identify trends, and optimize your processes.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 w-8 h-8 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <span className="text-gray-700">Real-time dashboards and KPI tracking</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 w-8 h-8 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <span className="text-gray-700">Custom report builder with drag-and-drop</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 w-8 h-8 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <span className="text-gray-700">Automated report scheduling and sharing</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 w-8 h-8 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <span className="text-gray-700">AI-powered insights and recommendations</span>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-100 to-green-200 p-8 rounded-2xl">
                <div className="text-center mb-6">
                  <BarChart3 className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-xl">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Sales Performance</span>
                      <span className="text-sm font-semibold text-green-600">+24%</span>
                    </div>
                    <div className="bg-green-200 h-2 rounded-full">
                      <div className="bg-green-600 h-2 rounded-full w-3/4"></div>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-xl">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Lead Conversion</span>
                      <span className="text-sm font-semibold text-green-600">+18%</span>
                    </div>
                    <div className="bg-green-200 h-2 rounded-full">
                      <div className="bg-green-600 h-2 rounded-full w-2/3"></div>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-xl">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Customer Satisfaction</span>
                      <span className="text-sm font-semibold text-green-600">96%</span>
                    </div>
                    <div className="bg-green-200 h-2 rounded-full">
                      <div className="bg-green-600 h-2 rounded-full w-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

 

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-xl text-gray-600">
              See what our customers have to say about our CRM platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}, {testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Compliance */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
            <div className="text-center mb-12">
              <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Lock className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Enterprise-Grade Security
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Your data is protected with bank-level security and compliance certifications.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-green-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">SSL Encryption</h3>
                <p className="text-sm text-gray-600">256-bit SSL encryption for all data transmission</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Database className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Data Backup</h3>
                <p className="text-sm text-gray-600">Automated daily backups with 99.9% uptime</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Settings className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">SOC 2 Compliant</h3>
                <p className="text-sm text-gray-600">Certified for security and availability</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">GDPR Ready</h3>
                <p className="text-sm text-gray-600">Full compliance with data protection regulations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of companies that trust our CRM to manage their customer relationships and drive growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-green-600 text-white px-8 py-2.5 rounded-xl font-semibold hover:bg-green-700 transition-colors">
              Start Free Trial
            </button>
            <button className="bg-white text-green-600 px-8 py-2.5 rounded-xl font-semibold border-2 border-green-600 hover:bg-green-50 transition-colors">
              Schedule Demo
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;