import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/Header/NavBar";
import Footer from "@/components/Footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "IdeaKode - Innovative Web & Software Solutions",
  description: "We provide cutting-edge web design, software development, and graphic design solutions to help businesses thrive in the digital world.",
  keywords: "web design, software development, graphic design, tech solutions, digital agency",
  author: "IdeaKode",
  openGraph: {
    title: "IdeaKode - Innovative Web & Software Solutions",
    description: "Expert web and software development services tailored to your business needs.",
    url: "https://yourcompanywebsite.com",
    type: "website",
    images: [
      {
        url: "https://ideakode.vercel.app/proj2.png",
        width: 1200,
        height: 630,
        alt: "IdeaKode - Web & Software Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IdeaKode - Innovative Web & Software Solutions",
    description: "We provide expert digital solutions to help your business grow.",
    images: ["https://yourcompanywebsite.com/proj2.png"],
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NavBar />
        <main className="relative">
        <svg className="absolute -z-10 inset- -top-14 w-full  opacity-40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
    <path fill="#29fe1d" fillOpacity="0.5" d="M0,64L48,96C96,128,192,192,288,192C384,192,480,128,576,112C672,96,768,128,864,138.7C960,149,1056,139,1152,154.7C1248,171,1344,213,1392,234.7L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
  </svg>
          {children}
        </main>
       <Footer />
      </body>
    </html>
  );
}
