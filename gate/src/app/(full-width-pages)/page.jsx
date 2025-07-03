import BuildForEvery from '@/components/landing/BuildForEvery'
import Faqs from '@/components/landing/Faqs'
import FastAndEasy from '@/components/landing/FastAndEasy'
import Hero from '@/components/landing/Hero'
import HowItWorks from '@/components/landing/HowItWorks'
import KeyFeatures from '@/components/landing/KeyFeatures'
import PaymentCta from '@/components/landing/PaymentCta'
import Testimonials from '@/components/landing/Testimonials'
import React from 'react'

export default function () {
  return (
    <div>
      <Hero />
      <FastAndEasy />
      <HowItWorks />
      <KeyFeatures />
      <BuildForEvery />
      <Testimonials />
      <Faqs />
      <PaymentCta />
    </div>
  )
}
