import React from 'react'

export default function BuiltForRole() {
  const roles = [
    {
      role: "Sales Teams",
      description: "Track leads, manage pipelines, and close deals faster with automated follow-ups and smart insights.",
      color: "bg-blue-500",
      icon: "💼"
    },
    {
      role: "Marketing Teams", 
      description: "Generate qualified leads, nurture prospects, and measure campaign ROI with integrated marketing tools.",
      color: "bg-green-500",
      icon: "📈"
    },
    {
      role: "Customer Success",
      description: "Build lasting relationships, reduce churn, and drive expansion with comprehensive customer insights.",
      color: "bg-yellow-500", 
      icon: "🎯"
    },
    {
      role: "Small Business Owners",
      description: "Manage everything from one dashboard - sales, marketing, and customer service without complexity.",
      color: "bg-red-500",
      icon: "🚀"
    }
  ];

  return (
    <div className="py-16 max-lg:px-4 ">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 items-center">
          
          {/* Left side - Content */}
          <div className='max-md:w-full max-md:text-center max-md:px-4'>
            <div className="mb-4">
              <span className="inline-block px-4 py-2 bg-green-100 text-green-800 text-sm font-semibold rounded-full">
                For Every Team
              </span>
            </div>
            <h2 className='text-[28px] md:text-[42px] mt-3 font-bold text-gray-900 leading-tight mb-4'>
              Built for Every Role in Your Organization
            </h2>
            <p className="text-lg text-gray-600 mb-4 leading-relaxed">
              Whether yo&apos;re in sales, marketing, customer success, or running the whole show, our CRM adapts to your specific needs and workflows.
            </p>
            
            <ul className='space-y-4'>
              {roles.map((item, index) => (
                <li key={index} className="flex items-center">
                 
                   
                    <p className="text-gray-600 leading-relaxed"><span className="font-bold text-gray-900 mb-2">{item.role}:</span> {item.description}</p>
                  
                </li>
              ))}
            </ul>
            
        
          </div>
          
          {/* Right side - Visual */}
          <div className='flex-1 rounded-2xl h-[500px] w-full relative z-10 flex items-center justify-center max-md:h-[400px]'>
            <div className='h-[80%] z-30 flex items-center justify-center'>
              <div className='grid grid-cols-2 gap-4'>
                
                {/* Sales Team Circle */}
                <div className='relative group cursor-pointer'>
                  <div className='w-36 h-36 lg:w-44 lg:h-44 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-2xl transform group-hover:scale-105 transition-all duration-300'>
                    <div className="text-center text-white">
                      <div className="text-3xl mb-2">💼</div>
                      <div className="font-bold text-sm">Sales</div>
                      <div className="text-xs opacity-90">Teams</div>
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>
                
                {/* Marketing Team Circle */}
                <div className='relative group cursor-pointer'>
                  <div className='w-36 h-36 lg:w-44 lg:h-44 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-2xl transform group-hover:scale-105 transition-all duration-300'>
                    <div className="text-center text-white">
                      <div className="text-3xl mb-2">📈</div>
                      <div className="font-bold text-sm">Marketing</div>
                      <div className="text-xs opacity-90">Teams</div>
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>
                
                {/* Customer Success Circle */}
                <div className='relative group cursor-pointer'>
                  <div className='w-36 h-36 lg:w-44 lg:h-44 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-2xl transform group-hover:scale-105 transition-all duration-300'>
                    <div className="text-center text-white">
                      <div className="text-3xl mb-2">🎯</div>
                      <div className="font-bold text-sm">Customer</div>
                      <div className="text-xs opacity-90">Success</div>
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>
                
                {/* Business Owners Circle */}
                <div className='relative group cursor-pointer'>
                  <div className='w-36 h-36 lg:w-44 lg:h-44 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center shadow-2xl transform group-hover:scale-105 transition-all duration-300'>
                    <div className="text-center text-white">
                      <div className="text-3xl mb-2">🚀</div>
                      <div className="font-bold text-sm">Business</div>
                      <div className="text-xs opacity-90">Owners</div>
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>
                
              </div>
            </div>
            
            {/* Connecting lines animation */}
            <div className="absolute inset-0 pointer-events-none">
              <svg className="w-full h-full opacity-30">
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#3B82F6" />
                  </linearGradient>
                </defs>
                <line x1="45%" y1="35%" x2="55%" y2="35%" stroke="url(#gradient1)" strokeWidth="2" className="animate-pulse" />
                <line x1="45%" y1="65%" x2="55%" y2="65%" stroke="url(#gradient1)" strokeWidth="2" className="animate-pulse" />
                <line x1="50%" y1="30%" x2="50%" y2="70%" stroke="url(#gradient1)" strokeWidth="2" className="animate-pulse" />
              </svg>
            </div>
            
            <div className='w-[20%] z-20 bg-gradient-to-tl rounded-r-2xl from-blue-200 to-white absolute h-full top-0 right-0 opacity-80'>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}