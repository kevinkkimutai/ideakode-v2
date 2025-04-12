'use client';
import { useGetAllProjectsMutation } from '@/redux/actions/projectActions';
import { setProjects } from '@/redux/reducers/projectReducers';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// import required modules
import { Pagination, Navigation, Autoplay } from 'swiper/modules'

export default function PortfolioHighlights() {
    const dispatch = useDispatch();
    const [getProjects] = useGetAllProjectsMutation();
    const [allProjects, setAllProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [swiperRef, setSwiperRef] = useState(null)

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);
                const response = await getProjects();
                if (response.data) {
                    dispatch(setProjects(response?.data));
                    setAllProjects(response?.data);
                } else if (response?.error) {
                    // // console.error(response?.error?.data?.error || "Failed to fetch projects.");
                }
            } catch (error) {
                // console.error("Failed to fetch projects", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [dispatch, getProjects]);

    if (loading) {
        return (
          <div className="max-w-[1280px] w-full mx-auto max-lg:px-4">
            <Swiper
              slidesPerView={3}
              centeredSlides={true}
              spaceBetween={30}
              loop={true}
              speed={2000}
              breakpoints={{
                320: { slidesPerView: 1, spaceBetween: 10 },
                640: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 30 },
                1440: { slidesPerView: 3, spaceBetween: 40 },
              }}
              navigation={false}
              modules={[Pagination, Navigation, Autoplay]}
              className="mySwiper h-72"
            >
              {Array.from({ length: 5 }).map((_, index) => (
                <SwiperSlide
                  key={index}
                  className="relative animate-pulse rounded-2xl overflow-clip bg-gray-200 h-full flex flex-col justify-end p-4"
                >
                  <div className="absolute grad bottom-0 left-0 right-0 top-24 bg-gradient-to-t from-green-700 to-transparent" />
                  <div className="w-full h-[160px] bg-gray-300 rounded mb-4" />
                  <div className="h-6 bg-gray-400 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-400 rounded w-full" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        );
      }
      

    return (
        <div className='industries max-w-[1280px] w-full mx-auto max-lg:px-4 flex flex-col lg:items-center justify-center'>
            <h2 className="text-3xl text-green-900 font-bold mb-2">Our Work Speaks for Itself</h2>
            <hr className="w-10 h-[3px] bg-green-800" />
            <p className="text-gray-800 mt-5 mb-20 lg:w-[65%] flex lg:text-center lg:text-lg">
                Explore our portfolio of cutting-edge web, software, and design projects.
                From sleek websites to powerful applications, our work showcases innovation,
                creativity, and functionality. See how we bring ideas to life!
            </p>

        <Swiper
          onSwiper={setSwiperRef}
          slidesPerView={3}
          centeredSlides={true}
          spaceBetween={30}
          loop={true}
          speed={2000}
          autoplay={{
              delay: 2500,
              disableOnInteraction: false,
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1440: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
        
          navigation={false}
          modules={[Pagination, Navigation, Autoplay]}
          className="mySwiper h-72"
        >
             {allProjects.slice(0, 5).map((project, index) => (
                    <SwiperSlide key={index}  className='relative  rounded-2xl overflow-clip' >
                        <div className="absolute grad bottom-0 left-0 right-0 top-24 opacity-100 bg-gradient-to-t from-green-700 to-transparent"></div>
                        <Image
                            src={project.image}
                            alt="project"
                            width={1000}
                            height={1000}
                            priority
                            className="object-contain"
                        />
                        <div className='absolute desc bottom-0  left-0 right-0 '>
                            <h2 className="text-2xl  font-bold bg-green-950 px-2 text-center w-auto text-white">{project?.title}</h2>
                            <p className="text-base text-center line-clamp-2 bg-green-900 px-2 pb-1.5 text-white hidden ">{project?.description}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
