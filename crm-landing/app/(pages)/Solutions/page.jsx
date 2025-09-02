import SolutionsPage from '@/components/Solutions/SolutionsPage'
import React from 'react'

export const metadata = {
  title: 'CRM Solutions - Industry-Specific Tools',
  description: 'Tailored CRM solutions for various industries. Streamline operations, improve customer relationships, and drive growth with our specialized tools.',
  keywords: ['CRM solutions', 'industry CRM', 'business solutions', 'customer management', 'sales solutions'],
  openGraph: {
    title: 'Industry CRM Solutions - Built for Your Business',
    description: 'Discover how our CRM solutions can transform your industry-specific challenges into competitive advantages.',
  },
}

export default function page() {
  return (
    <div>
      <SolutionsPage />
    </div>
  )
}
