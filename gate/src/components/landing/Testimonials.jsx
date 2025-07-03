'use client'
import { useTranslation } from '@/hooks/useTranslation'
import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";

export default function Testimonials() {
    const { t, language } = useTranslation()
     // Refs for navigation buttons
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);


  // States to track Swiper position
  const [isEnd, setIsEnd] = useState(false);
  const [isBeginning, setIsBeginning] = useState(true);

  // Active slide state for custom pagination
  const [activeIndex, setActiveIndex] = useState(0);
  const agents = [
    {
        title: "Talent Screening",
        description: "Our HRMS simplifies and accelerates recruitment through automated candidate screening and AI-powered interview technology. By eliminating manual shortlisting and introducing data-driven assessments, businesses can make faster, smarter hiring decisions.",
        image: "/New-Home/hrms/Talent Screening Icon .mp4",
        float: "efficient teams"
    },
    {
      title: "HR Administration",
      description: "The platform centralizes core HR operations, including employee records, contract management, approval workflows, and document tracking. With everything securely managed in one place, you gain full operational visibility, enhancing overall data integrity and compliance.",
      image: "/New-Home/hrms/HR Administration Icon .mp4",
      float: "trusted AI adoption"
  },
    {
        title: "Payroll",
        description: "Our payroll module automates the entire process, from salary calculations and overtime tracking to statutory deductions and payslip generation. Designed to support multi-country compliance, it ensures accurate, timely payments that meet both local and global standards.",
        image: "/New-Home/hrms/Payroll Icon Design .mp4",
        float: "integration"
    },
    {
      title: "Employee Self-Service (ESS)",
      description: "The ESS feature enables employees to handle their own HR needs, from submitting leave requests and tracking attendance to updating personal details and filing claims. Reducing routine workloads for HR while giving employees more autonomy.",
      image: "/New-Home/hrms/Employee Self-Service Icon .mp4",
      float: "efficient teams"
  }
   
]
  return (
    <div className='py-10 md:py-10'>
    <div className='max-w-[1280px] mx-auto max-2xl:px-4'>
    <h2 className='text-[28px] font-bold mb-6 md:mb-12 dark:text-white text-center uppercase'>
    { t('homepage.testimonials.title') }
    </h2>

    <div>
          {/* Swiper Container */}
          <div className="relative px-2 mt-10 w-full  md:p-4  md:py-5  mx-auto items-center justify-center  flex">
         <div>
           <Swiper
            className="mySwiper flex-1 w-full "
            slidesPerView={1}
            spaceBetween={20}
            modules={[Autoplay, Navigation]}
            navigation={{
              prevEl: prevButtonRef.current,
              nextEl: nextButtonRef.current,
            }}
            onInit={(swiper) => {
              swiper.params.navigation.prevEl = prevButtonRef.current;
              swiper.params.navigation.nextEl = nextButtonRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            onSlideChange={(swiper) => {
              setIsEnd(swiper.isEnd);
              setIsBeginning(swiper.isBeginning);
              setActiveIndex(swiper.activeIndex);
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 1 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 3 },
              1536: { slidesPerView: 3 },
            }}
          >
            {agents.map((agent, index) => (
              <SwiperSlide key={index} className="flex w-full h-[267px] items-center justify-center">
                  <div
                key={index}
                className="p-8 w-full lg:p-8 flex flex-col gap-10 bg-[#0F415F]  rounded-md "
              >
                <div className="relative overflow-clip flex items-center justify-center rounded-3xl h-[263px]">
         
                </div>
                <div className="text-white flex flex-col gap-4">
                  <h3 className="text-[14px] md:text-[16px] font-extrabold">
                    {agent.title}
                  </h3>
                  
                </div>
              </div>
              </SwiperSlide>
            ))}
          </Swiper>
         </div>
        </div>
       </div>

        {/* Custom button prev and next */}
        <div className="flex justify-center mt-3 pb-4 space-x-2 ">
            <button
                ref={prevButtonRef}
                className={`swiper-button-prev ${isBeginning ? 'opacity-50 cursor-not-allowed border-2 border-[#0085D5] rounded-full' : 'border-2 border-[#0085D5] rounded-full'}`}
                disabled={isBeginning}
            >
              <svg className="w-6 h-6 text-[#0085D5] rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4"/>
</svg>
            </button>
            <button
                ref={nextButtonRef}
                className={`swiper-button-next  ${isEnd ? 'opacity-50 cursor-not-allowed border-2 border-[#0085D5] rounded-full' : 'border-2 border-[#0085D5] rounded-full'}`}
                disabled={isEnd}
            >
               <svg className="w-6 h-6 text-[#0085D5]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4"/>
</svg>

            </button>
        </div>

    </div>
      
    </div>
  )
}
