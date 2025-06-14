import React from "react";

export default function MultipleBranches() {
   
  return (
    <div className="py-16 max-lg:px-4 ">
      <div className=" mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 items-center">
          
          {/* Left side - Visual */}
          <div className="flex-1 rounded-2xl min-h-[450px] w-full relative z-10 flex items-center justify-end max-md:h-[400px]">
            <div className="h-[90%] w-[90%] bg-gradient-to-br from-green-50 to-white z-30 rounded-xl shadow-2xl flex items-center justify-center border border-green-300 p-8">
              
              {/* Multi-branch visualization */}
              <div className="w-full h-full flex flex-col items-center justify-center">
                
                {/* Central Hub */}
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h4a2 2 0 012 2v2a2 2 0 01-2 2H8a2 2 0 01-2-2v-2z"/>
                    </svg>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                  <div className="text-center mt-2">
                    <div className="text-sm font-semibold text-gray-700">Main Office</div>
                  </div>
                </div>

                {/* Branch connections */}
                <div className="grid grid-cols-3 gap-8 w-full">
                  
                  {/* Branch 1 */}
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-md mb-2">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 2v2h2V6H6zm0 4v2h2v-2H6zm0 4v2h2v-2H6zm4-8v2h2V6h-2zm0 4v2h2v-2h-2zm0 4v2h2v-2h-2z"/>
                      </svg>
                    </div>
                    <div className="text-xs text-center text-gray-600">
                      <div className="font-medium">NYC Branch</div>
                      <div className="text-gray-400">45 Users</div>
                    </div>
                  </div>

                  {/* Branch 2 */}
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center shadow-md mb-2">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 2v2h2V6H6zm0 4v2h2v-2H6zm0 4v2h2v-2H6zm4-8v2h2V6h-2zm0 4v2h2v-2h-2zm0 4v2h2v-2h-2z"/>
                      </svg>
                    </div>
                    <div className="text-xs text-center text-gray-600">
                      <div className="font-medium">LA Branch</div>
                      <div className="text-gray-400">32 Users</div>
                    </div>
                  </div>

                  {/* Branch 3 */}
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center shadow-md mb-2">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 2v2h2V6H6zm0 4v2h2v-2H6zm0 4v2h2v-2H6zm4-8v2h2V6h-2zm0 4v2h2v-2h-2zm0 4v2h2v-2h-2z"/>
                      </svg>
                    </div>
                    <div className="text-xs text-center text-gray-600">
                      <div className="font-medium">Miami Branch</div>
                      <div className="text-gray-400">28 Users</div>
                    </div>
                  </div>
                  
                </div>

                {/* Connection lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                  <defs>
                    <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#10B981" />
                      <stop offset="100%" stopColor="#3B82F6" />
                    </linearGradient>
                  </defs>
                  {/* Lines connecting main office to branches */}
                  <line x1="50%" y1="40%" x2="25%" y2="70%" stroke="url(#connectionGradient)" strokeWidth="2" className="animate-pulse" />
                  <line x1="50%" y1="40%" x2="50%" y2="70%" stroke="url(#connectionGradient)" strokeWidth="2" className="animate-pulse" />
                  <line x1="50%" y1="40%" x2="75%" y2="70%" stroke="url(#connectionGradient)" strokeWidth="2" className="animate-pulse" />
                </svg>

                {/* Stats overlay */}
                <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 border border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-gray-600">All branches synced</span>
                  </div>
                </div>

              </div>
            </div>

            <div className="w-[30%] z-20 bg-gradient-to-tl rounded-l-2xl from-white to-blue-200 absolute h-full top-0 left-0 opacity-80"></div>
          </div>

          {/* Right side - Content */}
          <div className="max-md:w-full max-md:text-center max-md:px-4">
            <div className="mb-4">
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full">
                Enterprise Ready
              </span>
            </div>
            
            <h2 className="text-[28px] md:text-[42px] font-bold text-gray-900 leading-tight mb-4">
              Seamless Multi-Location Management
            </h2>
            
            <h3 className="text-[18px] lg:text-[24px] font-semibold text-green-600 leading-tight mb-6">
              One CRM, Unlimited Locations
            </h3>
            
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Manage multiple branches, franchises, or office locations from a single, unified CRM platform. Get real-time visibility across all locations while maintaining local autonomy and customization.
            </p>

            {/* Key benefits */}
            <div className="grid grid-cols-1 gap-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                  </svg>
                </div>
                <span className="text-gray-700"><strong>Centralized Control:</strong> Monitor performance across all locations from one dashboard</span>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                  </svg>
                </div>
                <span className="text-gray-700"><strong>Local Customization:</strong> Each branch can customize workflows and processes</span>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                  </svg>
                </div>
                <span className="text-gray-700"><strong>Real-time Sync:</strong> Instant data synchronization across all locations</span>
              </div>
            </div>
            
            <div className='flex max-md:flex-col gap-4 max-md:items-center'>
              <button className='px-8 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition-colors shadow-lg'>
                Book A Demo
              </button>
              <button className='px-8 py-3 rounded-lg border-2 border-green-600 text-green-600 hover:bg-green-50 font-semibold transition-colors'>
                Start Free Trial
              </button>
            </div>

            {/* Trust indicator for enterprise */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-4 max-md:justify-center text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                  </svg>
                  <span>Enterprise Security</span>
                </div>
                <span>•</span>
                <span>99.9% Uptime SLA</span>
                <span>•</span>
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}