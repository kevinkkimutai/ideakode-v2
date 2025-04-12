import WebDevelopment from '@/components/services/WebDevelopment'
import React from 'react'

export const metadata = {
  title: "Web Development - Netiqa | Building Scalable Digital Solutions",
  description: "Learn how Netiqa delivers modern, high-performance websites and web applications tailored to meet your business goals.",
  keywords: "web development, custom websites, Netiqa development, frontend backend development, scalable web apps, responsive web design",
  author: "Netiqa",
  openGraph: {
    title: "Web Development - Netiqa | Building Scalable Digital Solutions",
    description: "From idea to execution, explore how we build robust, scalable websites and apps that drive business growth.",
    url: "https://www.netiqa.co.ke/web-development",
    type: "website",
    images: [
      {
        url: "https://assets.netiqa.co.ke/Asset%209.png",
        width: 1200,
        height: 630,
        alt: "Web Development - Netiqa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Development - Netiqa | Building Scalable Digital Solutions",
    description: "Creating responsive, secure, and high-performing digital platforms for businesses of all sizes.",
    images: ["https://assets.netiqa.co.ke/Asset%209.png"],
  },
  alternates: {
    canonical: "https://www.netiqa.co.ke/web-development",
  },
};

export default function page() {
  return (
    <div>
      <WebDevelopment />
    </div>
  )
}
