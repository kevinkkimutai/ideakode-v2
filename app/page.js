import About from '@/components/Home/About'
import CallToAction from '@/components/Home/CallToAction'
import CallToActionFinal from '@/components/Home/CallToActionFinal'
import Hero from '@/components/Home/Hero'
import PortfolioHighlights from '@/components/Home/PortfolioHighlights'
import Services from '@/components/Home/Services'
import Testimonials from '@/components/Home/Testimonials'
import React from 'react'

export default function page() {
  return (
    <div className='flex flex-col gap-10 md:gap-20'>
     <Hero />
     <About />
     <Services />
     <CallToAction />
     <PortfolioHighlights />
     <Testimonials />
     <CallToActionFinal />
    </div>
  )
}
