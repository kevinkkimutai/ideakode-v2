import React from 'react'
import logo from '@/assets/logos/logo.png'
import Image from 'next/image'

export default function Footer() {
  return (
    <div>
        <footer className="tracking-wide bg-gradient-to-r from-[#0F2740] via-[#093355] to-[#035A91] px-8 sm:px-12 pt-12 pb-6">
      <div className="grid min-[1200px]:grid-cols-3 gap-12 xl:gap-16 py-20 max-md:py-20 max-w-[1280px] mx-auto">
        <div className="min-[1200px]:max-w-sm max-w-lg w-full">
          <a href='#' className='t'>
             <Image 
             className='w-14 md:w-20'
               src={logo}
               alt="Logo"
               width={100}
               height={40}
             />
</a>
          <div className="mt-6">
            <p className="text-white leading-relaxed text-lg">
              support@easypay.com<br />
              254 71 234-5678<br />
            </p>
            
          </div>
          <ul className="mt-6 flex space-x-5">
            <li>
              <a href='#'>
                <svg xmlns="http://www.w3.org/2000/svg" className="fill-blue-600 w-8 h-8" viewBox="0 0 49.652 49.652">
                  <path d="M24.826 0C11.137 0 0 11.137 0 24.826c0 13.688 11.137 24.826 24.826 24.826 13.688 0 24.826-11.138 24.826-24.826C49.652 11.137 38.516 0 24.826 0zM31 25.7h-4.039v14.396h-5.985V25.7h-2.845v-5.088h2.845v-3.291c0-2.357 1.12-6.04 6.04-6.04l4.435.017v4.939h-3.219c-.524 0-1.269.262-1.269 1.386v2.99h4.56z" data-original="#000000" />
                </svg>
              </a>
            </li>
            <li>
              <a href='#'>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 112.196 112.196">
                  <circle cx="56.098" cy="56.097" r="56.098" fill="#007ab9" data-original="#007ab9" />
                  <path fill="#fff" d="M89.616 60.611v23.128H76.207V62.161c0-5.418-1.936-9.118-6.791-9.118-3.705 0-5.906 2.491-6.878 4.903-.353.862-.444 2.059-.444 3.268v22.524h-13.41s.18-36.546 0-40.329h13.411v5.715c-.027.045-.065.089-.089.132h.089v-.132c1.782-2.742 4.96-6.662 12.085-6.662 8.822 0 15.436 5.764 15.436 18.149zm-54.96-36.642c-4.587 0-7.588 3.011-7.588 6.967 0 3.872 2.914 6.97 7.412 6.97h.087c4.677 0 7.585-3.098 7.585-6.97-.089-3.956-2.908-6.967-7.496-6.967zm-6.791 59.77H41.27v-40.33H27.865v40.33z" data-original="#f1f2f2" />
                </svg>
              </a>
            </li>
     
            <li>
              <a href='#'>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 1227 1227">
                  <path d="M613.5 0C274.685 0 0 274.685 0 613.5S274.685 1227 613.5 1227 1227 952.315 1227 613.5 952.315 0 613.5 0z" data-original="#000000" />
                  <path fill="#fff" d="m680.617 557.98 262.632-305.288h-62.235L652.97 517.77 470.833 252.692H260.759l275.427 400.844-275.427 320.142h62.239l240.82-279.931 192.35 279.931h210.074L680.601 557.98zM345.423 299.545h95.595l440.024 629.411h-95.595z" data-original="#ffffff" />
                </svg>
              </a>
            </li>
          </ul>
           <button type="button" className="mt-10 bg-[#377DA8] px-4 py-2 rounded-md text-white text-[15px] font-medium flex items-center justify-center gap-2 cursor-pointer">
            
            Get the App
          </button>
        </div>

        <div className="min-[1200px]:col-span-2 grid grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="max-lg:min-w-[140px]">
            <h4 className="text-gray-200 font-semibold text-base relative">Links</h4>

            <ul className="mt-6 space-y-4">
              <li>
                <a href='#' className="hover:text-gray-200 text-white text-sm font-normal">Home</a>
              </li>
              <li>
                <a href='#' className="hover:text-gray-200 text-white text-sm font-normal">Solutions</a>
              </li>
              <li>
                <a href='#' className="hover:text-gray-200 text-white text-sm font-normal">About Us</a>
              </li>
              
            </ul>
          </div>

          <div className="max-lg:min-w-[140px]">
            <h4 className="text-gray-200 font-semibold text-base relative">Support</h4>
            <ul className="space-y-4 mt-6">
              <li>
                <a href='#' className="hover:text-gray-200 text-white text-sm font-normal">Faqs</a>
              </li>
              <li>
                <a href='#' className="hover:text-gray-200 text-white text-sm font-normal">Blog</a>
              </li>
              <li>
                <a href='#' className="hover:text-gray-200 text-white text-sm font-normal">Contact Us</a>
              </li>
              {/* <li>
                <a href='#' className="hover:text-gray-200 text-white text-sm font-normal">Support</a>
              </li> */}
            </ul>
          </div>

          <div className="max-lg:min-w-[140px]">
            <h4 className="text-gray-200 font-semibold text-base relative">Our Address</h4>

            <ul className="space-y-4 mt-6">
              <li>
                <a href='#' className="hover:text-gray-200 text-white text-sm font-normal">Maputo, Mozambique</a>
              </li>
              <li>
                <a href='#' className="hover:text-gray-200 text-white text-sm font-normal">Sign up for a Newsletter</a>
              </li>
              
            </ul>
          </div>

          
        </div>
      </div>

      {/* <hr className="mt-10 mb-6 border-gray-300" /> */}

      <div className="flex  w-full max-md:flex-col items-center justify-center gap-4">
       
        <p className="text-white text-sm ">&copy; {new Date().getFullYear()} Easypay Moz. All rights reserved.</p>
      </div>
    </footer>
    
    </div>
  )
}
