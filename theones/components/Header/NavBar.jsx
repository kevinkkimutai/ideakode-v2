"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
// import ThemeToggler from "./ThemeToggler";


const menuData = [
    {
      id: 1,
      title: "Home",
      path: "/",
      newTab: false,
    },
    {
      id: 2,
      title: "About",
      path: "/about",
      newTab: false,
    },
    // {
    //   id: 33,
    //   title: "Blog",
    //   path: "/blog",
    //   newTab: false,
    // },
   
    {
      id: 4,
      title: "Services",
      newTab: false,
      submenu: [
        {
          id: 41,
          title: "Web Development",
          path: "/web-development",
          newTab: false,
        },
        {
          id: 42,
          title: "Branding & Design",
          path: "/branding-design",
          newTab: false,
        },
        // {
        //   id: 43,
        //   title: "SEO",
        //   path: "/seo",
        //   newTab: false,
        // },
      ],
    },
    {
      id: 5,
      title: "Portfolio",
      path: "/portfolio",
      newTab: false,
    },
    {
      id: 6,
      title: "Faqs",
      path: "/faqs",
      newTab: false,
    },
    {
      id: 3,
      title: "Contact-Us",
      path: "/contact",
      newTab: false,
    },
  ];
const NavBar = () => {
  // Navbar toggle
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  // Sticky Navbar
  const [sticky, setSticky] = useState(false);
  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
  });

  // submenu handler
  const [openIndex, setOpenIndex] = useState(-1);
  const handleSubmenu = (index) => {
    if (openIndex === index) {
      setOpenIndex(-1);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <>
      <nav
        className={`navBar top-0 left-0 z-40 flex w-full  items-center  ${
          sticky
            ? "!fixed !z-[9999] bg-white  shadow-black backdrop-blur-sm !transition "
            : "absolute"
        }`}
      >
        <div className=" border- max-w-[1280px] w-full mx-auto px-2">
          <div className="relative -mx-4 flex items-center justify-between">
            <div className="w-60 max-w-full px-4 xl:mr-12">
              <Link
                href="/"
                className={`navBar-logo block w-full font-bold text-xl ${
                  sticky ? "py-5 lg:py-2" : "py-5"
                } `}
              > 
                {/* <Image
                  src="/Netiqa/Asset 7.png"
                  alt="logo"
                  width={140}
                  height={30}
                  className="w-full "
                /> */}
                <Image
                  src="/Netiqa/logo.png"
                  alt="logo"
                  width={140}
                  height={25}
                  className="hidden w-36 dark:block"
                />
              </Link>
            </div>
            <div className="flex w-full items-center justify-between px-4 ">
              <div>
                <button
                  onClick={navbarToggleHandler}
                  id="navbarToggler"
                  aria-label="Mobile Menu"
                  className="absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-3 py-[6px] lg:hidden"
                >
                  <span
                    className={`relative my-1.5 block h-0.5 w-[20px] bg-black transition-all duration-300  ${
                      navbarOpen ? " top-[7px] rotate-45" : " "
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[20px] bg-black transition-all duration-300  ${
                      navbarOpen ? "opacity-0 " : " "
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[20px] bg-black transition-all duration-300  ${
                      navbarOpen ? " top-[-8px] -rotate-45" : " "
                    }`}
                  />
                </button>
                <nav
                  id="navbarCollapse"
                  className={`navbar absolute lg:ms-16 right-0 !z-[9999] w-[250px] bg-white max-md:rounded-b-xl rounded border-[.5px] border-body-color/50  py-4 px-6 duration-300  lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 ${
                    navbarOpen
                      ? "visibility top-full opacity-100"
                      : "invisible top-[120%] opacity-0"
                  }`}
                >
                  <ul className="block lg:flex lg:space-x-12 mx-auto">
                    {menuData.map((menuItem, index) => (
                      <li key={menuItem.id} className="group relative">
                        {menuItem.path ? (
                          <Link
                            href={menuItem.path}
                            className={`flex py-2 text-base text-dark group-hover:opacity-70  lg:mr-0 lg:inline-flex lg:py-6 lg:px-0`}
                          >
                            {menuItem.title}
                          </Link>
                        ) : (
                          <>
                            <a
                              onClick={() => handleSubmenu(index)}
                              className="flex cursor-pointer items-center justify-between py-2 text-base text-black group-hover:opacity-70  lg:mr-0 lg:inline-flex lg:py-6 lg:px-0"
                            >
                              {menuItem.title}
                              <span className="pl-3">
                                <svg width="15" height="14" viewBox="0 0 15 14">
                                  <path
                                    d="M7.81602 9.97495C7.68477 9.97495 7.57539 9.9312 7.46602 9.8437L2.43477 4.89995C2.23789 4.70308 2.23789 4.39683 2.43477 4.19995C2.63164 4.00308 2.93789 4.00308 3.13477 4.19995L7.81602 8.77183L12.4973 4.1562C12.6941 3.95933 13.0004 3.95933 13.1973 4.1562C13.3941 4.35308 13.3941 4.65933 13.1973 4.8562L8.16601 9.79995C8.05664 9.90933 7.94727 9.97495 7.81602 9.97495Z"
                                    fill="currentColor"
                                  />
                                </svg>
                              </span>
                            </a>
                            <div
                              className={`submenu relative top-full left-0 rounded-md bg-white transition-[top] duration-300 group-hover:opacity-100  lg:invisible lg:absolute lg:top-[110%] lg:block lg:w-[250px] lg:p-4 lg:opacity-0 lg:shadow-lg lg:group-hover:visible lg:group-hover:top-full ${
                                openIndex === index ? "block" : "hidden"
                              }`}
                            >
                              {menuItem.submenu.map((submenuItem) => (
                                <Link
                                  href={submenuItem.path}
                                  key={submenuItem.id}
                                  className="block rounded py-2.5 text-sm text-dark hover:opacity-70 text-black lg:px-3"
                                >
                                  {submenuItem.title}
                                </Link>
                              ))}
                            </div>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
              <div className="flex items-center justify-end pr-16 lg:pr-0">
                
                <Link
                  href="/get-a-quote"
                  className="ease-in-up hidden rounded-md bg-gradient-to-br from-green-500  to-green-600 hover:bg-gradient-to-br hover:from-green-700  hover:to-green-900 py-3 px-8 text-base font-bold text-white transition duration-300  md:block md:px-9 lg:px-6 xl:px-9"
                >
                  Get A Quote
                </Link>
                <div>
                  {/* <ThemeToggler /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
