'use client'
import React from 'react'
import ThemeTogglerTwo from '../common/ThemeTogglerTwo'
import { useTranslation } from '@/hooks/useTranslation'
import logo from '@/assets/logos/logo.png'
import Image from 'next/image'

export default function Navbar() {
   const { t, language } = useTranslation()
  const [toggleOpen, setToggleOpen] = React.useState(false)

  const toggleMenu = () => {
    setToggleOpen(!toggleOpen)
  }

  const closeMenu = () => {
    setToggleOpen(false)
  }

  return (
    <div>
      <header className="flex py-4 px-4 sm:px-6 min-h-[70px] tracking-wide relativ w-full fixed top-0 z-50">
        <div className="flex flex-wrap items-center justify-between gap-4 w-full max-w-[1280px] bg-[#E6E6E6]/10 border border-white/50 backdrop-blur-md py-6 px-6 rounded-lg mx-auto shadow-lg">
          {/* Logo */}
          <div className="flex items-center">
            <a href="javascript:void(0)" className="text-xl font-bold text-slate-900 dark:text-white">
             <Image 
             className='w-10 md:w-16'
               src={logo}
               alt="Logo"
               width={100}
               height={40}
             />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href='javascript:void(0)' className=" text-slate-900 dark:text-white font-medium text-lg transition-colors">{ t('navbar.home') }</a>
            <a href='javascript:void(0)' className=" text-slate-900 dark:text-white font-medium text-lg transition-colors">{ t('navbar.solutions') }</a>
            <a href='javascript:void(0)' className=" text-slate-900 dark:text-white font-medium text-lg transition-colors">{ t('navbar.about') }</a>
            <a href='javascript:void(0)' className=" text-slate-900 dark:text-white font-medium text-lg transition-colors">{ t('navbar.contact') }</a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <button type="button" className="hover:border border-white px-4 py-2 rounded-md text-slate-900 dark:text-white text-[15px] font-medium transition-colors">
              Login
            </button>
            <button type="button" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-white text-[15px] font-medium transition-colors">
              Signup
            </button>
            <div>
              <ThemeTogglerTwo />
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center space-x-3">
            <div>
              <ThemeTogglerTwo />
            </div>
            <button 
              id="toggleOpen"
              onClick={toggleMenu}
              className="cursor-pointer p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6 text-slate-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {toggleOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={closeMenu}>
          <div 
            className="fixed top-0 right-0 h-screen w-full  bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="text-xl font-bold text-slate-900 dark:text-white">
              <a href="javascript:void(0)" className="text-xl font-bold text-slate-900 dark:text-white">
             <Image 
             className='w-10 md:w-16'
               src={logo}
               alt="Logo"
               width={100}
               height={40}
             />
             </a>
              </div>
              <button 
                onClick={closeMenu}
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Close menu"
              >
                <svg className="w-6 h-6 text-slate-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Mobile Navigation */}
            <nav className="flex flex-col p-6 space-y-4">
              <a 
                href='javascript:void(0)' 
                onClick={closeMenu}
                className="py-3 px-4 text-slate-900 dark:text-white font-medium text-lg hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
              >
             { t('navbar.home') }
              </a>
              <a 
                href='javascript:void(0)' 
                onClick={closeMenu}
                className="py-3 px-4 text-slate-900 dark:text-white font-medium text-lg hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
              >
              { t('navbar.solutions') }
              </a>
              <a 
                href='javascript:void(0)' 
                onClick={closeMenu}
                className="py-3 px-4 text-slate-900 dark:text-white font-medium text-lg hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
              >
              { t('navbar.about') }
              </a>
              <a 
                href='javascript:void(0)' 
                onClick={closeMenu}
                className="py-3 px-4 text-slate-900 dark:text-white font-medium text-lg hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
              >
               { t('navbar.contact') }
              </a>
            </nav>

            {/* Mobile Actions */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
              <div className="flex flex-col space-y-3">
                <button 
                  type="button" 
                  onClick={closeMenu}
                  className="w-full py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-md text-slate-900 dark:text-white font-medium hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  Login
                </button>
                <button 
                  type="button" 
                  onClick={closeMenu}
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium transition-colors"
                >
                 { t('navbar.signup') }
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}