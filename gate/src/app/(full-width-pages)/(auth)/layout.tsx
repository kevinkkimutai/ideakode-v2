import GridShape from "@/components/common/GridShape";
import ThemeTogglerTwo from "@/components/common/ThemeTogglerTwo";

import { ThemeProvider } from "@/context/ThemeContext";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import signLogo from "@/assets/auth/a1.png"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0 md:h-screen overflow-hidden flex items-center justify-center">
      <ThemeProvider>
        <div className="relative flex lg:flex-row w-full h-screen justify-center flex-col  dark:bg-gray-900 rounded-2xl sm:p-0 md:w-[60%] md:h-[90%] bg-white md:border-[10px] border-gray-200 overflow-hidden">
          {children}
          <div className="lg:w-1/2 w-full h-full lg:grid items-center hidden">
            <div className="relative items-center justify-center  flex z-1">
       
              <div className="flex flex-col items-center justify-end w-auto">
                
                  <Image
                    width={2231}
                    height={248}
                    src={signLogo}
                    className="object-cover w-full  h-auto"
                    alt="Logo"
                  />
              
                
              </div>
            </div>
          </div>
          <div className="fixed bottom-6 right-6 z-50 hidden sm:block">
            <ThemeTogglerTwo />
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}
