import Link from 'next/link';
import Head from 'next/head';

export const metadata = {
  title: "404 Not Found | Netiqa",
  description: "Page not found",
  author: "Kelvin Kimutai",
};
export default function NotFound() {
  return (
    <>

      <div className="min-h-screen absolute top-0 left-0 w-full z-50 bg-gradient-to-br from-green-900 to-green-700 flex flex-col items-center justify-center text-center  text-white">
        <div className="max-w-md mx-auto mt-10">
          {/* Animated 404 */}
          <div className="relative mb-8">
            <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-700 animate-pulse">
              404
            </h1>
            <div className="absolute -inset-4 border-2 border-dashed border-blue-500 rounded-full animate-spin-slow opacity-30"></div>
          </div>

          {/* Message */}
          <h2 className="text-3xl font-bold mb-4">Lost in the Digital Void</h2>
          <p className="text-gray-200 mb-8">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-all transform hover:scale-105">
              Return Home
            </Link>
            <Link href="/contact" className="px-6 py-3 border border-gray-600 hover:bg-gray-800 rounded-lg font-medium transition-all">
              Contact Support
            </Link>
          </div>

          {/* Techy decorative element */}
          <div className="mt-12 opacity-50">
            <svg className="w-24 h-24 mx-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 9H9.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15 9H15.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}