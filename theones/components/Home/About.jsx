import Image from 'next/image';
import Link from 'next/link'
import React from 'react'

export default function About() {
    const wedo = [
        "Web Development",
        "Graphic Design",
        "Software Development",
        "SEO & Digital Marketing",
        "Branding & Identity",
        "UI/UX Design"
    ]
  return (
    <div className="bg-gradient-to-br from-green-100 via-white to-green-100 py-20">
      <div className="max-w-[1280px] w-full mx-auto max-2xl:px-4 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className='max-lg:hidden rounded-2xl flex '>
        <Image 
    src="/Business Plan-bro1.png"
    alt="netiqa-illustration-about"
    className='bg-red-30d0 -ms-10'
    width={1000}
    height={1000}
    />
        </div>

        <div>
          <h2 className="text-3xl text-green-900 font-bold mb-2">Who We Are</h2>
          <hr className="w-10 h-[3px] bg-green-800" />
          <p className="text-gray-800 mt-5 lg:w-[90%] lg:text-lg">
            We are a tech-driven company specializing in graphic design, web
            development, and software solutions. With a focus on innovation and
            user experience, we help businesses establish a strong digital
            presence."
          </p>
          <div>
            <p className='font-semibold text-gray-800 mt-2'>What We Do :</p>
            <ul className="text-gray-800  mt-4 gap-2 flex flex-col">
                {wedo.map((item,index) => (
              <li className='flex gap-2' key={index}>
                <svg
                  className="w-6 h-6 text-green-600 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.5 11.5 11 13l4-3.5M12 20a16.405 16.405 0 0 1-5.092-5.804A16.694 16.694 0 0 1 5 6.666L12 4l7 2.667a16.695 16.695 0 0 1-1.908 7.529A16.406 16.406 0 0 1 12 20Z"
                  />
                </svg>
               {item}
              </li>
            ))}
            </ul>
          </div>

          <div className="flex justify-star gap-4 mt-12">
            <Link
              href="/about-us"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 px-4 rounded-full"
            >
              Learn More About Us
            </Link>
          </div>
        </div>
        <div className='lg:hidden mt-10 rounded-2xl'>
          
        <Image 
    src="/Business Plan-bro1.png"
    alt="netiqa-illustration-about"
    className='bg-red-30d0 -ms-10'
    width={1000}
    height={1000}
    />
        </div>
      </div>
    </div>
  );
}
