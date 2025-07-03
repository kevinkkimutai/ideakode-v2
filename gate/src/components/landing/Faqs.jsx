'use client'
import { useTranslation } from '@/hooks/useTranslation'
import React, { useState } from 'react'

const faqs = [
    {
      quiz: "homepage.faqs.questions.question1.question",
      answer:
        "Get started with a collection of 751 free and open-source SVG icons compatible with",
    },
    {
        quiz: "homepage.faqs.questions.question2.question",
        answer:
          "Get started with a collection of 751 free and open-source SVG icons compatible with",
      },
      {
        quiz: "homepage.faqs.questions.question3.question",
        answer:
          "Get started with a collection of 751 free and open-source SVG icons compatible with",
      },
      {
        quiz: "homepage.faqs.questions.question4.question",
        answer:
          "Get started with a collection of 751 free and open-source SVG icons compatible with",
      },
    
 ];



export default function Faqs() {
    const { t, language } = useTranslation()

  // State to track which FAQs are open
  const [openFaqs, setOpenFaqs] = useState([]);


  const toggleAccordion = (index) => {
    setOpenFaqs((prevOpenFaqs) =>
      prevOpenFaqs.includes(index)
        ? prevOpenFaqs.filter((i) => i !== index) 
        : [...prevOpenFaqs, index] 
    );
  };
  return (
    <div className='py-10 md:py-10'>
    <div className='max-w-[1280px] mx-auto max-2xl:px-4'>
  

<div className='w-full grid grid-cols-1 md:grid-cols-2 gap-6  md:gap-12'>
    <div className='mt-8'>
    <h2 className='text-[32px] font-bold   dark:text-white text-start md:w-[50%] uppercase'>
    { t('homepage.faqs.title') }
    </h2>
    <p className='text-[16px] md:w-[60%] mt-3'>
    For more information, please visit the <a href="#" className="">Help Center</a> Find all faqs on our <a href="#" className="">Faqs page.</a>
    </p>
    <button className="bg-[#035A91] text-white px-6 py-3 mt-5 md:mt-8 rounded transition">
    { t('navbar.contact') }
        </button>
    </div>

    <div>

    {faqs.map((faq, index) => (
            <div key={index} className="accordion border-b  border-[#CED4DA]" role="accordion">
              <button
                type="button"
                onClick={() => toggleAccordion(index)}
                className={`toggle-button w-full text-base outline-none text-left font-semibold py-6 ${
                  openFaqs.includes(index)
                    ? 'text-gray-800'
                    : 'text-gray-950  '
                } hover:text-black flex items-center`}
              >
                <span className="mr-4 text-[16px] lg:text-[20px] text-black font-[600] max-md:w-[70%]"> {t(`${faq.quiz}`)}</span>
                <div className="ml-auto   h-[28px] w-[28px] flex items-center justify-center">
                  {openFaqs.includes(index) ? (
                  <svg class="w-5 h-5 text-gray-800 rotate-180 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"/>
                </svg>
                
                  ) : (
                    <svg class="w-5 h-5 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"/>
</svg>

                  )}
                </div>
              </button>
              <div
                className={`content overflow-hidden transition-all duration-300 ${
                  openFaqs.includes(index) ? 'max-h-[1000px] pb-6' : 'max-h-0'
                }`}
              >
               <p
  className="text-[14px] lg:text-[16px] font-[400] text-[#454546] md:w-[85%]"
  dangerouslySetInnerHTML={{ __html: faq.answer }}
/>

              </div>
            </div>
          ))}
    </div>

</div>

    </div>
      
    </div>
  )
}
