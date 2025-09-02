import Pricing from '@/components/pricing/Pricing'
import React from 'react'

export const metadata = {
  title: 'Pricing Plans - Affordable CRM Solutions',
  description: 'Choose the perfect CRM plan for your business. Transparent pricing starting from $29/month with no hidden fees. Free trial available.',
  keywords: ['CRM pricing', 'business plans', 'software pricing', 'affordable CRM', 'subscription plans'],
  openGraph: {
    title: 'CRM Pricing - Plans That Fit Your Budget',
    description: 'Flexible pricing plans designed for businesses of all sizes. Start your free trial today.',
  },
}

export default function page() {
  return (
    <div>
      <Pricing />
    </div>
  )
}
