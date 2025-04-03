import FAQCompiler from '@/components/Faqs/FaqsCompiler'
import React from 'react'

export const metadata = {
  title: "FAQs - Netiqa | Your Questions Answered",
  description: "Find answers to frequently asked questions about our web design, software development, and digital solutions.",
  keywords: "FAQs, frequently asked questions, Netiqa support, web design questions, software development help, digital agency queries",
  author: "Netiqa",
  openGraph: {
    title: "FAQs - Netiqa | Your Questions Answered",
    description: "Get answers to common questions about our services, pricing, and processes.",
    url: "https://www.netiqa.co.ke/faqs",
    type: "website",
    images: [
      {
        url: "https://Netiqa.vercel.app/faqs-banner.png",
        width: 1200,
        height: 630,
        alt: "FAQs - Netiqa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQs - Netiqa | Your Questions Answered",
    description: "Have questions? Find all the answers about our services and processes.",
    images: ["https://www.netiqa.co.ke/faqs-banner.png"],
  },
  alternates: {
    canonical: "https://www.netiqa.co.ke/faqs",
  },
};

export default function page() {
  return (
    <div>
      <FAQCompiler />
    </div>
  )
}
