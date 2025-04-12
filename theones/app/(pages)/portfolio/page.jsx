import PortfolioCompiler from '@/components/Portfolio/PortfolioCompiller'
import React from 'react'

export const metadata = {
  title: "Portfolio - Netiqa | Showcasing Our Work",
  description: "Explore our portfolio of web design, software development, and graphic design projects that drive digital success.",
  keywords: "portfolio, Netiqa projects, web design portfolio, software development work, graphic design showcase, digital agency case studies",
  author: "Netiqa",
  openGraph: {
    title: "Portfolio - Netiqa | Showcasing Our Work",
    description: "Discover our innovative web and software solutions through our diverse portfolio.",
    url: "https://www.netiqa.co.ke/portfolio",
    type: "website",
    images: [
      {
        url: "https://assets.netiqa.co.ke/Asset%209.png",
        width: 1200,
        height: 630,
        alt: "Portfolio - Netiqa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "https://www.netiqa.co.ke/portfolio",
    title: "Portfolio - Netiqa | Showcasing Our Work",
    description: "See how we've helped businesses with expert web, software, and design solutions.",
    images: ["https://assets.netiqa.co.ke/Asset%209.png"],
  },
  alternates: {
    canonical: "https://www.netiqa.co.ke/portfolio",
  },
};

export default function page() {
  return (
    <div>
      <PortfolioCompiler />
    </div>
  )
}
