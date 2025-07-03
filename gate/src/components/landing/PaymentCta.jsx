'use client'
import { useTranslation } from '@/hooks/useTranslation'
import React from 'react'

export default function PaymentCta() {
    const { t, language } = useTranslation()
  return (
    <div className=' mx-auto max-2xl:px-4 flex items-center justify-center rounded-md z-10 -mb-20'>
        <div className='flex max-md:flex-col bg-[#377DAB] w-auto items-cente gap-40 py-8 px-40 rounded-md '>
           <div>

           <h2 className='text-[32px] font-bold text-white mb-4'>
           { t('homepage.payment_action.title') }
            </h2>
            <p className='text-[18px] text-white mb-6'>
            { t('homepage.payment_action.description') }
            </p>
           </div>
            <div className='flex gap-4 items-start mt-4'>
              
                <button className="text-white border-2 px-6 py-2 rounded transition">
                { t('homepage.payment_action.cta.create_account') }
                </button>
            </div>
        </div>
      
    </div>
  )
}
