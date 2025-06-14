"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  const [active, setActive] = React.useState(0);
  const [show, setShow] = React.useState(false);

  const setActiveTab = ({ index }) => {
    setActive(index);
  };

  const handleShow = () => {
    setShow(!show);
  };

  const links = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Features",
      href: "/Features",
    },
    {
      name: "Pricing",
      href: "/Pricing",
    },
    {
      name: "Solutions",
      href: "/Solutions",
    },
    {
      name: "Contact",
      href: "/Contact-Us",
    },
  ];

  return (
    <div className="w-full ">
      <div className="max-w-[1280px] w-full max-lg:px-4 mx-auto flex items-center justify-between py-3">
        {/* logo */}
        <Link href="/" className="font-bold text-[22px] ">
        <Image 
         src="/logo/nogo.png"
         className='w-[130px] md:-ms-1'
         alt='logo'
         width={1000}
         height={1000}
         />
        </Link>

        {/* tabs links */}
        <div className="max-lg:hidden">
          <ul className="flex max-lg:flex-col gap-6 md:gap-10">
            {links.map((link, index) => (
              <Link
              href={link.href}
                key={index}
                onClick={() => setActive(index)}
                className={`hover:border-b-2 text-[16px] font-semibold ${
                  active === index
                    ? "border-b-3 border-dashed border-green-400 text-green-600"
                    : ""
                }`}
              >

                {link.name}
              </Link>
            ))}
          </ul>
        </div>

        {/* ctas */}
        <div className="max-lg:hidden">
          <button className="text-green-600 px-5 py-2 me-4 font-semibold text-[16px] border-2 rounded-lg border-green-500 hover:border-green-800 hover:text-green-800">
            Login
          </button>
          <button className="px-4 py-2 rounded-lg bg-green-600 font-semibold text-[16px] text-white hover:bg-green-800">
            Book A Demo
          </button>
        </div>

        {/* humbugger */}
        <div className="lg:hidden">
          <div 
          onClick={handleShow}
          className="">
            {show ? (
              <svg
                className="w-6 h-6 text-gray-800"
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
                  d="M18 6h-8m8 4H6m12 4h-8m8 4H6"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 text-black"
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
                  d="M18 6H6m12 4H6m12 4H6m12 4H6"
                />
              </svg>
            )}
          </div>
        </div>

        {/* mobile */}
       {show && (
         <div className="lg:hidden absolute h-[91vh] bg-green-50/80 w-full right-0 top-14 flex flex-col items-end gap-5">
         <div className="p-5 flex flex-col gap-5 bg-white rounded-bl-lg">
           <ul className="flex max-lg:flex-col gap-6 md:gap-10 items-center justify-center">
             {links.map((link, index) => (
               <li
                 key={index}
                 onClick={() => setActive(index)}
                 className={`hover:border-b-2 text-[16px] font-semibold ${
                   active === index
                     ? "border-b-3 border-dashed border-green-400 text-green-600"
                     : ""
                 }`}
               >
                 {link.name}
               </li>
             ))}
           </ul>
           <div className="flex flex-col items-center justify-center gap-5">
             <button className="text-green-600 px-5 py-2  font-semibold text-[16px] border-2 rounded-lg border-green-500 hover:border-green-800 hover:text-green-800">
               Login
             </button>
             <button className="px-4 py-2 rounded-lg bg-green-600 font-semibold text-[16px] text-white hover:bg-green-800">
               Book A Demo
             </button>
           </div>
         </div>
       </div>
       )}
      </div>
    </div>
  );
}
