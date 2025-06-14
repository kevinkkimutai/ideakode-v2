'use client'
import React, { useState } from 'react';
import { Check, Star } from 'lucide-react';

export default function Pricing(){
  const [isAnnual, setIsAnnual] = useState(false);
  const [openItems, setOpenItems] = useState({ 0: true });
  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for small teams getting started',
      monthlyPrice: 2900,
      annualPrice: 2300,
      features: [
        'Up to 1,000 contacts',
        'Basic pipeline management',
        'Email integration',
        'Mobile app access',
        'Basic reporting',
        '24/7 support'
      ],
      popular: false,
      ctaText: 'Start Free Trial',
      ctaStyle: 'secondary'
    },
    {
      name: 'Professional',
      description: 'Advanced features for growing businesses',
      monthlyPrice: 5900,
      annualPrice: 4700,
      features: [
        'Unlimited contacts',
        'Advanced pipeline automation',
        'Custom fields & workflows',
        'Advanced reporting & analytics',
        'API access',
        'Priority support'
      ],
      popular: true,
      ctaText: 'Start Free Trial',
      ctaStyle: 'primary'
    },
    {
      name: 'Enterprise',
      description: 'Complete solution for large organizations',
      monthlyPrice: 9900,
      annualPrice: 7900,
      features: [
        'Everything in Professional',
        'Advanced security & compliance',
        'Custom integrations',
        'Dedicated account manager',
        'White-label options',
        '24/7 phone support'
      ],
      popular: false,
      ctaText: 'Contact Sales',
      ctaStyle: 'secondary'
    }
  ];

  const faqs = [
    {
      question: 'Do you offer a free trial?',
      answer: 'Yes! We offer a 14-day free trial for all plans. No credit card required to get started.'
    },
    {
      question: 'Can I change my plan anytime?',
      answer: 'Absolutely. You can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes, we use enterprise-grade security with 256-bit SSL encryption, regular backups, and SOC 2 compliance to keep your data safe.'
    },
    {
      question: 'Do you offer discounts for nonprofits?',
      answer: 'Yes, we offer special pricing for qualified nonprofit organizations. Contact our sales team for more information.'
    }
  ];

  const handleCTAClick = (ctaText) => {
    if (ctaText === 'Contact Sales') {
      alert('Thank you for your interest! Our sales team will contact you within 24 hours.');
    } else {
      alert('Redirecting to free trial signup...');
    }
  };


  const toggleAccordion = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const PlusIcon = ({ isOpen }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42" className="w-3 fill-current ml-auto shrink-0">
      <path 
        className={`${isOpen ? 'hidden' : 'block'}`}
        d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z" 
      />
      <path
        d="M37.059 16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5h32.118C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z" 
      />
    </svg>
  );

  return (
    <div className="">
      <div className="max-w-[1280px] w-fu mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="pt-16 pb-20 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-black mb-6 ">
            Choose Your Plan
          </h1>
          <p className="text-xl text-black/90 max-w-3xl mx-auto mb-12 leading-relaxed">
            Powerful CRM solutions designed to grow with your business. Start your free trial today and transform how you manage customer relationships.
          </p>
          
          {/* Pricing Toggle */}
          <div className="flex justify-center mb-12">
            <div className="bg-green-200 backdrop-blur-lg rounded-full p-1 border border-white/30">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  !isAnnual 
                    ? 'bg-white text-indigo-600 shadow-lg' 
                    : 'text-black hover:bg-white/10'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  isAnnual 
                    ? 'bg-white text-indigo-600 shadow-lg' 
                    : 'text-black hover:bg-white/10'
                }`}
              >
                Annual (Save 20%)
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-20">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative bg-green-100 backdrop-blur-lg rounded-2xl p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                plan.popular 
                  ? 'ring-2 ring-blue-800 scale-105 shadow-2xl' 
                  : 'shadow-xl hover:shadow-2xl'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current" />
                    MOST POPULAR
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <div className="mb-2">
                  <span className="text-4xl font-extrabold text-indigo-600">
                    ksh {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                  </span>
                </div>
                <p className="text-gray-500">per user/month</p>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                onClick={() => handleCTAClick(plan.ctaText)}
                className={`w-full py-2 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                  plan.ctaStyle === 'primary'
                    ? 'bg-gradient-to-r from-green-600 to-green-800 text-white shadow-lg hover:shadow-xl'
                    : 'bg-transparent text-indigo-600 border-2 border-blue-800 hover:border-none hover:bg-gradient-to-r from-green-600 to-green-800 hover:text-white'
                }`}
              >
                {plan.ctaText}
              </button>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className=" backdrop-blur-lg rounded-2xl p-8 md:p-12 mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="divide-y divide-gray-200">
        {faqs.map((item, index) => {
          const isOpen = openItems[index];
          
          return (
            <div key={index} className="accordion" role="accordion">
              <button
                type="button"
                onClick={() => toggleAccordion(index)}
                className={`toggle-button cursor-pointer w-full text-md outline-none text-left font-semibold py-6 hover:text-green-700 flex items-center ${
                  isOpen ? 'text-green-700' : 'text-slate-900'
                }`}
              >
                <span className="mr-4">{item.question}</span>
                <PlusIcon isOpen={isOpen} />
              </button>
              
              <div 
                className={`content overflow-hidden transition-all duration-300 ${
                  isOpen 
                    ? 'pb-6 max-h-[1000px]' 
                    : 'invisible max-h-0'
                }`}
              >
                <p className="text-md text-slate-600 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
        </div>

      

      </div>
        {/* Enterprise CTA */}
        <div className="text-center bg-green-100 pb-10">
          <div className="rounded-2xl p-8 md:p-12 max-w-2xl mx-auto ">
            <h2 className="text-3xl font-bold text-black mb-4">
              Need a Custom Solution?
            </h2>
            <p className="text-black/90 text-lg mb-8">
              We offer custom enterprise solutions with dedicated support, advanced security, and tailored integrations for your specific needs.
            </p>
            <button
              onClick={() => handleCTAClick('Contact Sales')}
              className="bg-gradient-to-r from-green-600 to-green-800 text-white px-8 py-2.5 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105"
            >
              Contact Enterprise Sales
            </button>
          </div>
        </div>
    </div>
  );
};
