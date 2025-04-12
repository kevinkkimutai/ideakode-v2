import GraphicDesign from '@/components/services/GraphicDesign'
import React from 'react'


export const metadata = {
  title: "Design & Branding - Netiqa | Elevating Visual Identity",
  description: "Discover how Netiqa transforms brands through strategic design, creative branding, and compelling visual storytelling.",
  keywords: "branding, design, logo design, brand identity, graphic design, Netiqa branding, creative agency, visual storytelling",
  author: "Netiqa",
  openGraph: {
    title: "Design & Branding - Netiqa | Elevating Visual Identity",
    description: "Explore our creative approach to building unforgettable brand experiences and powerful visual identities.",
    url: "https://www.netiqa.co.ke/branding-design",
    type: "website",
    images: [
      {
        url: "https://assets.netiqa.co.ke/Asset%209.png",
        width: 1200,
        height: 630,
        alt: "Design & Branding - Netiqa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Design & Branding - Netiqa | Elevating Visual Identity",
    description: "Crafting visual stories and brand strategies that resonate and inspire.",
    images: ["https://assets.netiqa.co.ke/Asset%209.png"],
  },
  alternates: {
    canonical: "https://www.netiqa.co.ke/branding-design",
  },
};

export default function page() {
  return (
    <div>
      <GraphicDesign />
    </div>
  )
}
