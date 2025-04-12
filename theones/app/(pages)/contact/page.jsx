import ContactUs from '@/components/Global/Contact'
import React from 'react'

export const metadata = {
  title: "Contact Us - Netiqa | Get in Touch",
  description: "Reach out to Netiqa for innovative web design, software development, and graphic design solutions. We're here to help your business succeed.",
  keywords: "contact us, Netiqa contact, get in touch, web design contact, software development contact, graphic design contact, digital agency contact",
  author: "Netiqa",
  openGraph: {
    title: "Contact Us - Netiqa | Get in Touch",
    description: "Have questions? Contact us for expert web, software, and graphic design solutions tailored to your needs.",
    url: "https://www.netiqa.co.ke/contact",
    type: "website",
    images: [
      {
        url: "https://assets.netiqa.co.ke/Asset%209.png",
        width: 1200,
        height: 630,
        alt: "Contact Us - Netiqa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us - Netiqa | Get in Touch",
    description: "Get in touch with Netiqa for personalized digital solutions. We are ready to help your business grow.",
    images: ["https://assets.netiqa.co.ke/Asset%209.png"],
  },
  alternates: {
    canonical: "https://www.netiqa.co.ke/contact",
  },
};

export default function page() {
  return (
    <div className='min-h-[90vh]'>
      <ContactUs />
    </div>
  )
}
