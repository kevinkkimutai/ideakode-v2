import FeaturesPage from '@/components/Features/FeaturesPage'
import React from 'react'

export const metadata = {
  title: 'Features - Advanced CRM Capabilities',
  description: 'Discover powerful CRM features including lead management, sales automation, customer analytics, and more. Built for modern businesses.',
  keywords: ['CRM features', 'lead management', 'sales automation', 'customer analytics', 'business tools'],
  openGraph: {
    title: 'CRM Features - Advanced Business Tools',
    description: 'Explore comprehensive CRM features designed to streamline your business processes and boost productivity.',
  },
}

export default function page() {
  return (
    <div>
      <FeaturesPage />
    </div>
  )
}
