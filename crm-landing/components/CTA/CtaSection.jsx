import Image from 'next/image'
import React from 'react'

export default function CtaSection() {
  return (
    <div className='max-w-[1280px] mx-auto max-2xl:px-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 relative text-white'>
        <div className='h-[250px] md:h-[400px] bg-gradient-to-br from-green-100 to-green-200 -mt-20 rounded-xl flex items-center justify-center shadow-lg'>
        {/* <Image src='/images/crm-dashboard.png' alt='CRM Dashboard Preview' fill className='object-cover rounded-xl'/> */}
        <div className='text-center p-6'>
          <div className='w-20 h-20 bg-green-600 rounded-xl mx-auto mb-4 flex items-center justify-center'>
            <svg className='w-10 h-10 text-white' fill='currentColor' viewBox='0 0 24 24'>
              <path d='M12 2L2 7V10C2 16 6 20.9 12 22C18 20.9 22 16 22 10V7L12 2Z'/>
            </svg>
          </div>
          <p className='text-green-600 font-semibold'>CRM Dashboard Preview</p>
        </div>
        </div>
        <div className='flex flex-col justify-center'>
        <h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>Ready to Transform Your Sales Process?</h2>
        <p className='text-[14px] md:text-[16px] text-gray-100 mb-8 leading-relaxed'>
                Join thousands of businesses already using our CRM to increase sales, improve customer relationships, and streamline their operations. Start your journey to better customer management today.
        </p>

        <div className='flex max-md:flex-col gap-4'>
             <button className='px-8 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition-colors shadow-lg'>
               Book A Demo
             </button>
             <button className='px-8 py-3 rounded-lg border-2 border-green-600 hover:border-green-800 text-white  font-semibold transition-colors'>
               Start Free Trial
             </button>
           </div>

           <div className='mt-6 flex items-center gap-4 text-sm text-gray-3200'>
             <div className='flex items-center gap-2'>
               <svg className='w-4 h-4 text-green-500' fill='currentColor' viewBox='0 0 20 20'>
                 <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd'/>
               </svg>
               No credit card required
             </div>
             <div className='flex items-center gap-2'>
               <svg className='w-4 h-4 text-green-500' fill='currentColor' viewBox='0 0 20 20'>
                 <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd'/>
               </svg>
               14-day free trial
             </div>
           </div>
            </div>

        </div>
      
    </div>
  )
}