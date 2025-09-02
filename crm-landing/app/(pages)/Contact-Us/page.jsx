import ContactPage from '@/components/Contact/ContactUs'
import React from 'react'

export const metadata = {
  title: 'Contact Us - Get in Touch with CRM Experts',
  description: 'Have questions about our CRM solutions? Contact our expert team for personalized support and consultations. We\'re here to help grow your business.',
  keywords: ['contact CRM support', 'customer service', 'CRM consultation', 'business support', 'help center'],
  openGraph: {
    title: 'Contact CRMogo - Expert Support Available',
    description: 'Connect with our CRM experts for personalized support and business growth strategies.',
  },
}

export default function page() {
  return (
    <div>
      <ContactPage />
    </div>
  )
}
