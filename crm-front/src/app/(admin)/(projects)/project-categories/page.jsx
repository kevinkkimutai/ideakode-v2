import ProjectCategory from '@/components/category/ProjectCategory';
import PageBreadcrumb from '@/components/common/PageBreadCrumb'
import Button from '@/components/ui/button/Button'
import React from 'react'


export const metadata = {
    title: "Next.js Form Elements | Netiqa - Next.js Dashboard Template",
    description:
      "This is Next.js Form Elements page for Netiqa - Next.js Tailwind CSS Admin Dashboard Template",
  };
export default function page() {
  return (
    <div>
         <PageBreadcrumb pageTitle="Project Categories" />
     

<div>
    <ProjectCategory />
</div>

    </div>
  )
}
