import React from 'react'

export default function HeroSection() {
  return (
    <div className='flex max-md:flex-col items-center gap-10 lg:gap-20 mt-5 md:mt-10   py-8'>
        <div className='w-[40%] max-md:w-full max-md:text-center max-md:px-4'>
           <h1 className='text-[24px] lg:text-[40px] font-semibold text-gray-900 leading-tight mb-6'>
             Transform Your <span className='text-green-500'>Customer Relationships</span> with Smart CRM
           </h1>
           <p className='text-lg text-gray-600 mb-8 leading-relaxed'>
             Streamline your sales pipeline, nurture customer relationships, and grow your business with our all-in-one CRM solution. Trusted by 100+ companies country-wide.
           </p>
           <div className='flex max-md:flex-col gap-4'>
             <button className='px-8 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition-colors shadow-lg'>
               Book A Demo
             </button>
             <button className='px-8 py-3 rounded-lg border-2 border-green-600 text-green-600 hover:bg-green-50 font-semibold transition-colors'>
               Start Free Trial
             </button>
           </div>
           <div className='mt-6 flex items-center gap-4 max-md:justify-center'>
             <div className='flex -space-x-2'>
               <div className='w-8 h-8 rounded-full bg-blue-500'></div>
               <div className='w-8 h-8 rounded-full bg-green-500'></div>
               <div className='w-8 h-8 rounded-full bg-purple-500'></div>
               <div className='w-8 h-8 rounded-full bg-orange-500'></div>
             </div>
             <span className='text-sm text-gray-500'>Trusted by 10,000+ businesses</span>
           </div>
        </div>
        
        <div className='flex-1 rounded-2xl h-[500px] w-full relative z-10 flex items-center max-md:h-[400px]'>
            <div className='h-[80%] w-[90%] z-30 rounded-xl shadow-2xl flex items-center justify-center border border-green-300'>
              <div className='text-center text-gray-600'>
                <div className='w-16 h-16 bg-green-600 rounded-lg mx-auto mb-4 flex items-center justify-center'>
                  <svg className='w-8 h-8 text-white' fill='currentColor' viewBox='0 0 20 20'>
                    <path d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'/>
                  </svg>
                </div>
                <h3 className='font-semibold text-lg'>CRM Dashboard Preview</h3>
                <p className='text-sm'>Interactive demo coming soon</p>
              </div>
            </div>
            
            {/* Floating Stats Card */}
            <div className='absolute top-10 -left-10 max-md:-left-5 p-4 z-30 bg-white rounded-xl shadow-lg border border-gray-100'>
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center'>
                  <svg className='w-5 h-5 text-blue-600' fill='currentColor' viewBox='0 0 20 20'>
                    <path d='M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z'/>
                  </svg>
                </div>
                <div>
                  <p className='text-sm font-semibold text-gray-900'>2,847</p>
                  <p className='text-xs text-gray-500'>Active Customers</p>
                </div>
              </div>
            </div>
            
            {/* Floating Revenue Card */}
            <div className='absolute bottom-10 right-10 max-md:right-5 p-4 z-30 bg-white rounded-xl shadow-lg border border-gray-100'>
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center'>
                  <svg className='w-5 h-5 text-green-600' fill='currentColor' viewBox='0 0 20 20'>
                    <path fillRule='evenodd' d='M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z'/>
                  </svg>
                </div>
                <div>
                  <p className='text-sm font-semibold text-gray-900'>$127K</p>
                  <p className='text-xs text-gray-500'>Revenue This Month</p>
                  <div className='flex items-center gap-1 mt-1'>
                    <svg className='w-3 h-3 text-green-500' fill='currentColor' viewBox='0 0 20 20'>
                      <path fillRule='evenodd' d='M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z'/>
                    </svg>
                    <span className='text-xs text-green-600 font-medium'>+23%</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className='w-[20%] z-20 bg-gradient-to-tl rounded-r-2xl from-blue-100 to-white absolute h-full top-0 right-0 opacity-80'>
            </div>
        </div>
      
    </div>
  )
}