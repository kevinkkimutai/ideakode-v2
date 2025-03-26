import Link from 'next/link'
import React from 'react'

export default function CallToActionFinal() {
  return (
    <div className='max-w-[1280px] w-full mx-auto max-lg:px-4 mb-20'>


<div className="w-full p-6 text-center bg-gradient-to-bl from-green-500 via-green-200 to-green-500 rounded-2xl sm:p-8">
  <h5 className="mb-3 text-3xl font-bold text-black">Ready to Elevate Your Brand?</h5>
  <p className="mb-6 text-base text-gray-700 sm:text-lg lg:w-[70%] mx-auto">
  Boost your brand with expert design and digital solutions. From websites to branding, we bring your vision to life. 
  Let’s create something amazing together!
  </p>
  <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
    <Link
      href="#"
      className="bg-green-700 hover:bg-green-800 text-white font-bold py-2.5 px-6 rounded-full transition-all"
    >
     Get a Free Consultation
    </Link>
    <Link
      href="#"
      className="bg-white text-green-800 hover:text-green-900 border border-green-700 hover:bg-green-100 font-bold py-2.5 px-6 rounded-full transition-all"
    >
     Let's Work Together
    </Link>
  </div>
</div>
    </div>
  )
}
