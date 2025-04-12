import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/Header/NavBar";
import Footer from "@/components/Footer/Footer";
import ReduxProvider from "@/components/servicesapi/ReduxProvider";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Netiqa - Innovative Web & Software Solutions",
  description: "We provide cutting-edge web design, software development, and graphic design solutions to help businesses thrive in the digital world.",
  keywords: "web design, software development, graphic design, tech solutions, digital agency",
  author: "Kelvin Kimutai",
  openGraph: {
    title: "Netiqa - Innovative Web & Software Solutions",
    description: "Expert web and software development services tailored to your business needs.",
    url: "https://www.netiqa.co.ke",
    type: "website",
    images: [
      {
        url: "https://Netiqa.vercel.app/proj2.png",
        width: 1200,
        height: 630,
        alt: "Netiqa - Web & Software Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Netiqa - Innovative Web & Software Solutions",
    description: "We provide expert digital solutions to help your business grow.",
    images: ["https://www.netiqa.co.ke/proj2.png"],
  },
  alternates: {
    canonical: "https://www.netiqa.co.ke",
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-clip`}
      >
        <ReduxProvider>
        <NavBar />
        <main className="relative max-exl:px-4">
        <svg className="absolute -z-10 inset- -top-32 w-full  opacity-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
    <path fill="#29fe1d" fillOpacity="0.5" d="M0,64L48,96C96,128,192,192,288,192C384,192,480,128,576,112C672,96,768,128,864,138.7C960,149,1056,139,1152,154.7C1248,171,1344,213,1392,234.7L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
  </svg>
          {children}
        </main>
       <Footer />
       </ReduxProvider>

       <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-WGGF78BC');`,
          }}
        />
         {/* GTM NoScript Fallback */}
         <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WGGF78BC"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
      </body>
    </html>
  );
}
