import Seo from '@/components/services/Seo'
import React from 'react'

export const metadata = {
  title: "SEO Services - Netiqa | Rank Higher on Google",
  description: "Boost your online visibility with expert SEO services. We optimize your website for search engines, increase organic traffic, and help you rank higher on Google.",
  keywords: "SEO services, search engine optimization, Google ranking, organic traffic, keyword research, on-page SEO, off-page SEO, local SEO, Netiqa SEO",
  author: "Netiqa",
  openGraph: {
    title: "SEO Services - Netiqa | Get Found Online",
    description: "Drive more traffic to your website with our proven SEO strategies and optimization techniques.",
    url: "https://www.netiqa.co.ke/seo",
    type: "website",
    images: [
      {
        url: "https://assets.netiqa.co.ke/Asset%209.png",
        width: 1200,
        height: 630,
        alt: "SEO Services - Netiqa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SEO Services - Netiqa | Dominate Search Results",
    description: "Professional SEO services to increase your online visibility and drive qualified traffic.",
    images: ["https://assets.netiqa.co.ke/Asset%209.png"],
  },
  alternates: {
    canonical: "https://www.netiqa.co.ke/seo",
  },
};

export default function Page() {
  return (
    <div>
      <Seo />
    </div>
  )
}
