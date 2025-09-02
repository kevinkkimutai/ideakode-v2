import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Header/Navbar";
import Footer from "@/components/Footer/Footer";
import ChatBot from "@/components/ChatBot/ChatBot";
import { OrganizationSchema, WebsiteSchema, AIOptimizedSchema, FAQSchema } from "@/components/SEO/StructuredData";
import { LLMOptimization, AIConversationStarters } from "@/components/SEO/LLMOptimization";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    template: "%s | CRMogo - Advanced CRM Solutions",
    default: "CRMogo - Advanced CRM Solutions for Modern Businesses"
  },
  description: "Boost your business with CRMogo's powerful CRM platform. Streamline customer relationships, automate sales processes, and grow your revenue with our comprehensive CRM solution.",
  keywords: ["CRM software", "customer relationship management", "sales automation", "business growth", "customer management", "lead generation", "sales pipeline", "CRM platform"],
  authors: [{ name: "CRMogo Team" }],
  creator: "CRMogo",
  publisher: "CRMogo",
  metadataBase: new URL('https://ideakode.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ideakode.vercel.app',
    title: 'CRMogo - Advanced CRM Solutions for Modern Businesses',
    description: 'Boost your business with CRMogo\'s powerful CRM platform. Streamline customer relationships, automate sales processes, and grow your revenue.',
    siteName: 'CRMogo',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'CRMogo - Advanced CRM Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CRMogo - Advanced CRM Solutions for Modern Businesses',
    description: 'Boost your business with CRMogo\'s powerful CRM platform. Streamline customer relationships and grow your revenue.',
    creator: '@crmogo',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <OrganizationSchema />
        <WebsiteSchema />
        <AIOptimizedSchema />
        <FAQSchema />
        <AIConversationStarters />
        <LLMOptimization />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="CRMogo" />
        <link rel="apple-touch-icon" href="/logo/fav.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-tr from-green-50 to-white`}
      >
        <Navbar />
        {children}
        <ChatBot />
        <Footer />
        
      </body>

    </html>
  );
}
