import AboutPage from '@/components/About/About'
import React from 'react'

export const metadata = {
  title: "About Netiqa - Who We Are & What We Do",
  description: "Learn more about Netiqa, our mission, values, and expertise in web design, software development, and digital solutions.",
  keywords: "about Netiqa, company information, web development, software solutions, digital agency, technology services",
  author: "Netiqa",
  openGraph: {
    title: "About Netiqa - Our Story & Vision",
    description: "Discover our journey, expertise, and commitment to delivering top-notch digital solutions.",
    url: "https://www.netiqa.co.ke/about",
    type: "website",
    images: [
      {
        url: "https://assets.netiqa.co.ke/Asset%209.png",
        width: 1200,
        height: 630,
        alt: "About Netiqa - Web & Software Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Netiqa - Who We Are",
    description: "Get to know Netiqa and how we help businesses grow with our digital expertise.",
    images: ["https://assets.netiqa.co.ke/Asset%209.png"],
  },
  alternates: {
    canonical: "https://www.netiqa.co.ke/about",
  },
};

export default function page() {
  return (
    <div>
      <AboutPage />
    </div>
  )
}
