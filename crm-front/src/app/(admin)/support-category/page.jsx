import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import SupportCategory from '@/components/support-category/SupportCategory'
import React from 'react'


export const metadata = {
    title: "Next.js Form Elements | Netiqa - Next.js Dashboard Template",
    description:
      "This is Next.js Form Elements page for Netiqa - Next.js Tailwind CSS Admin Dashboard Template",
  };
export default function page() {
  return (
    <div>
    <PageBreadcrumb pageTitle="Support Categories" />
    
    <div>
    <SupportCategory />
    </div>
      
    </div>
  )
}
