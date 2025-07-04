'use client'
import { useTranslation } from '@/hooks/useTranslation'
import Image from 'next/image'
import React from 'react'
import feature1 from "@/assets/features/smile-at-pay.png"
import feature2 from "@/assets/features/two_smiling.png"
import feature3 from "@/assets/features/at_office.png"
import feature4 from "@/assets/features/tablet_2.png"

const FeatureCard = ({ feature, index }) => {
  const { t } = useTranslation()
  const isImageLeft = index % 2 === 0

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 items-center'>
      {/* Image section */}
      <div className={`rounded-lg shadow-sm shadow-white overflow-clip ${!isImageLeft ? 'md:order-2' : ''}`}>
        <Image 
          className='w-full h-auto'
          src={feature.image}
          alt={feature.alt}
          width={1000}
          height={1000}
        />
      </div>
      
      {/* Content section */}
      <div className={!isImageLeft ? 'md:order-1' : ''}>
        <h3 className='font-semibold text-[22px] mb-2 text-white'>
          {t(`homepage.key_features.features.${feature.key}.title`)}
        </h3>
        <p className='text-[18px] text-white md:w-[80%] mt-5'>
          {t(`homepage.key_features.features.${feature.key}.description`)}
        </p>
      </div>
    </div>
  )
}

export default function KeyFeatures() {
  const { t } = useTranslation()
  
  const features = [
    {
      key: 'feature1',
      image: feature1,
      alt: 'Feature 1'
    },
    {
      key: 'feature2',
      image: feature2,
      alt: 'Feature 2'
    },
    {
      key: 'feature3',
      image: feature3,
      alt: 'Feature 3'
    },
    {
      key: 'feature4',
      image: feature4,
      alt: 'Feature 4'
    }
  ]

  return (
    <div className='bg-[#1170AC] dark:bg-transparent mt-10 md:mt-20'>
      <div className='max-w-[1280px] mx-auto px-4 py-10 md:py-20'>
        <h2 className='text-[32px] font-bold mb-6 md:mb-12 text-white text-center'>
          {t('homepage.key_features.title')}
        </h2>
        
        <div className='mt-5 md:mt-20 md:w-[80%] mx-auto flex flex-col gap-10 md:gap-20'>
          {features.map((feature, index) => (
            <FeatureCard 
              key={feature.key} 
              feature={feature} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </div>
  )
}