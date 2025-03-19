import Link from 'next/link'
import React from 'react'

export default function CallToAction() {
  return (
    <div className='max-w-[1280px] w-full mx-auto max-lg:px-4 py-10'>


<div className="w-full p-6 text-center bg-gradient-to-bl from-green-500 via-green-200 to-green-500 rounded-2xl sm:p-8">
  <h5 className="mb-3 text-3xl font-bold text-black">Let’s Build Something Great Together</h5>
  <p className="mb-6 text-base text-gray-700 sm:text-lg lg:w-[70%] mx-auto">
    Transform your ideas into reality with our expert web, software, and design solutions. 
    Whether you need a website, custom software, or a brand identity, we’re here to help. Get started today!
  </p>
  <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
    <Link
      href="#"
      className="bg-green-700 hover:bg-green-800 text-white font-bold py-2.5 px-6 rounded-full transition-all"
    >
      Get a Free Quote
    </Link>
    <Link
      href="#"
      className="bg-white text-green-800 hover:text-green-900 border border-green-700 hover:bg-green-100 font-bold py-2.5 px-6 rounded-full transition-all"
    >
      Schedule a Consultation
    </Link>
  </div>
</div>
    </div>
  )
}
