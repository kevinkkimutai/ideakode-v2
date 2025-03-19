'use client';

import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay, Pagination } from 'swiper/modules';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function PortfolioCarousel({ projects }) {
  const swiperRef = useRef(null);

  return (
    <div className="w-full max-w-[1280px] mx-auto py-8 relative">
      {/* Custom Navigation Buttons */}
      <button
        className="absolute left-2 md:left-6 top-1/2 transform -translate-y-1/2 z-10 bg-green-700 hover:bg-green-800 text-white p-3 rounded-full shadow-lg"
        onClick={() => swiperRef.current?.slidePrev()}
      >
        <FaChevronLeft size={20} />
      </button>

      <button
        className="absolute right-2 md:right-6 top-1/2 transform -translate-y-1/2 z-10 bg-green-700 hover:bg-green-800 text-white p-3 rounded-full shadow-lg"
        onClick={() => swiperRef.current?.slideNext()}
      >
        <FaChevronRight size={20} />
      </button>

      <Swiper
        spaceBetween={30}
        effect="fade"
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        modules={[EffectFade, Pagination, Autoplay]}
        className="w-full h-[300px] md:h-[500px] rounded-xl"
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {projects.map((project) => (
          <SwiperSlide key={project.id} className="relative w-full h-[300px] md:h-[500px]">
            {/* <div className="absolute z-10 bottom-0 left-0 right-0 top-24 opacity-100 bg-gradient-to-t from-green-700/60 to-transparent"></div> */}
            <Image
              src={project.img}
              alt={project.title}
              layout="fill"
              objectFit="cover"
              className="rounded-xl"
            />
            <div className="absolute bottom-4 z-20 left-4 bg-black bg-opacity-50 text-white p-2 rounded">
              {project.title}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
