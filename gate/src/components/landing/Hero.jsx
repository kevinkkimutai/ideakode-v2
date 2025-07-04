"use client"

import React from 'react'
import { useTranslation } from '@/hooks/useTranslation'
import Image from 'next/image'
import heroImage from "@/assets/hero/hero-section.png"


export default function Hero() {
  const { t, language } = useTranslation()
  

  
  return (
    <div className='bg-[#37b0fb] dark:bg-gradient-to-r from-[#0F2740] via-[#093355] to-[#035A91]'>
      <div className='max-w-[1200px] pt-40 mx-auto max-2xl:px-4 py-20 items-center text-center grid grid-cols-1 lg:grid-cols-2 gap-8'>
       <div className='flex flex-col  text-start'>
       <h1 className="text-[32px] md:text-[64px] font-bold mb-4 dark:text-white md:leading-[72px] w-[80%]">{ t('homepage.title.start') }
        <span className="dark:text-[#1170AC] text-white"> { t('homepage.title.payments') } </span> 
      { t('homepage.title.end') }
        </h1>
          <p className="w-[80%] md:w-[60%] text-white">
            { t('homepage.description')}
          </p>
       
      <div className='flex gap-8 mt-8 md:mt-10'>
      <button className="text-white border-2 px-6 py-2.5 rounded  transition">
      { t('homepage.cta.get_the_app') }
        </button>
        <button className="bg-[#035A91] text-white px-6 py-3 rounded transition">
        {t('homepage.cta.sign_up')}
        </button>
      </div>
       </div>
       <div className='flex justify-center items-center max-md:mt-10'>
        <Image
        className='w-[90%]'
        src={heroImage}
        alt="Hero Image"
        width={1000}
        height={1000}
         />
        </div >
      </div>
    </div>
  )
}