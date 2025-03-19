import React from 'react'

export default function Services() {

  const services =  [
        {
          "title": "Web Development",
          "description": "Custom websites, e-commerce platforms, and CMS solutions built for scalability and performance.",
          "icon": "web-development"
        },
        {
          "title": "Graphic Design",
          "description": "Logos, branding, UI/UX design, and marketing materials that elevate your brand identity.",
          "icon": "graphic-design"
        },
        {
          "title": "Software Development",
          "description": "Custom software solutions including ERP systems, mobile apps, and automation tools.",
          "icon": "software-development"
        },
        {
          "title": "SEO & Digital Marketing",
          "description": "Optimize your online presence with SEO, social media marketing, and content strategy.",
          "icon": "seo-marketing"
        },
        {
          "title": "IT Consulting & Support",
          "description": "Expert technology guidance to help businesses integrate and optimize IT solutions.",
          "icon": "it-consulting"
        },
        {
          "title": "UI/UX Design",
          "description": "User-focused designs that ensure a seamless experience across web and mobile applications.",
          "icon": "ui-ux-design"
        }
      ]
      
  return (
    <div className='max-w-[1280px] w-full mx-auto max-lg:px-4 flex flex-col lg:items-center justify-center'>
       <h2 className="text-3xl text-green-900 font-bold mb-2">Our Services</h2>
          <hr className="w-10 h-[3px] bg-green-800" />
          <p className="text-gray-800 mt-5 lg:w-[70%] flex lg:text-center lg:text-lg">
            We are a tech-driven company specializing in graphic design, web
            development, and software solutions. With a focus on innovation and
            user experience, we help businesses establish a strong digital
            presence.
          </p>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-10 md:mt-20 w-full'>
        
{services.map((service, index) => (
<div key={index} className="p-6 bg-gradient-to-br from-green-100 via-white to-green-100  rounded-lg shadow-green-800 shadow-2xl ">
    <svg className="w-7 h-7 text-gray-500  mb-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z"/>
    </svg>
    <div>
        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900">{service.title}</h5>
    </div>
    <p className="mb-3 font-normal text-gray-500 line-clamp-4">{service.description}</p>
</div>
))}

          </div>
    </div>
  )
}
