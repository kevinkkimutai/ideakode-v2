import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Hero() {
  return (
<div className="relative ">
 

  <div className='max-w-[1280px] w-full mx-auto pt-24 md:pt-34 max-2xl:px-4 items-center'>


<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-center'>
<div className='text-start flex flex-col items-start'>
<div className="rounded-full px-4 py-4  bg-green-200 w-auto inline-flex items-center">
  <div className="flex gap-2 items-center">
    <svg
      className="w-6 h-6 text-gray-800"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M21 12a28.076 28.076 0 0 1-1.091 9M7.231 4.37a8.994 8.994 0 0 1 12.88 3.73M2.958 15S3 14.577 3 12a8.949 8.949 0 0 1 1.735-5.307m12.84 3.088A5.98 5.98 0 0 1 18 12a30 30 0 0 1-.464 6.232M6 12a6 6 0 0 1 9.352-4.974M4 21a5.964 5.964 0 0 1 1.01-3.328 5.15 5.15 0 0 0 .786-1.926m8.66 2.486a13.96 13.96 0 0 1-.962 2.683M7.5 19.336C9 17.092 9 14.845 9 12a3 3 0 1 1 6 0c0 .749 0 1.521-.031 2.311M12 12c0 3 0 6-2 9"
      />
    </svg>
    <span className="text-black font-bold">Get Your Business a Website</span>
  </div>
</div>
    <h1 className="text-3xl md:text-4xl font-bold max-md:text-center mt-8 md:mt-16">Innovative Web & Software Solutions for Your Business</h1>
    <p className="max-md:text-center text-gray-600 mt-4 lg:w-[90%]">
    We create cutting-edge websites, software, and graphics that elevate brands and drive success.
    </p>

    <div className="flex justify-center gap-4 mt-12">
      <Link href="/contact" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
      Get a Free Quote
      </Link>
      <Link href="/contact" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
      View Our Work
      </Link>
    </div>
  
</div>
<div className=' rounded-xl w-full mx-auto flex'>
    <Image 
    className='mx-auto'
    src="/illustration-1.webp"
    alt="netiqa illustration"
    width={600}
    height={600}
    />
</div>
</div>

  </div>
</div>
  )
}
