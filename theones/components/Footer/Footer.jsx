import Image from 'next/image'
import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className='relative overflow-clip'>
        <svg className="absolute -z-10 -bottom-20 w-full rotate-180 opacity-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
    <path fill="#10b981" fillOpacity="0.5" d="M0,64L48,96C96,128,192,192,288,192C384,192,480,128,576,112C672,96,768,128,864,138.7C960,149,1056,139,1152,154.7C1248,171,1344,213,1392,234.7L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
  </svg>

<footer className="w-full mx-auto bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
    <div className="mx-auto w-full max-w-[1280px] px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
              <Link href="/" className="flex items-center mb-4">
                <Image
                  src="/Netiqa/logo.png"
                  alt="Netiqa Logo"
                  width={140}
                  height={40}
                  className="w-36"
                />
              </Link>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Your trusted digital partner in Nairobi, Kenya. We transform businesses through innovative web development, stunning design, and strategic SEO solutions.
              </p>
              <div className="space-y-3">
                <a href="mailto:kelvin@netiqa.co.ke" className="flex items-center gap-3 text-gray-600 hover:text-green-600 transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-green-100 group-hover:bg-green-600 flex items-center justify-center transition-colors">
                    <Mail className="w-5 h-5 text-green-600 group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-sm">kelvin@netiqa.co.ke</span>
                </a>
                <a href="tel:+254722214567" className="flex items-center gap-3 text-gray-600 hover:text-green-600 transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-green-100 group-hover:bg-green-600 flex items-center justify-center transition-colors">
                    <Phone className="w-5 h-5 text-green-600 group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-sm">+254 722 214 567</span>
                </a>
                <div className="flex items-center gap-3 text-gray-600">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-sm">Nairobi, Kenya</span>
                </div>
              </div>
          </div>

          {/* Services */}
          <div>
              <h2 className="mb-4 text-sm font-bold text-gray-900 uppercase tracking-wider">Our Services</h2>
              <ul className="space-y-3">
                  <li>
                      <Link href="/web-development" className="text-gray-600 hover:text-green-600 transition-colors text-sm">
                        Web Development
                      </Link>
                  </li>
                  <li>
                      <Link href="/branding-design" className="text-gray-600 hover:text-green-600 transition-colors text-sm">
                        Branding & Design
                      </Link>
                  </li>
                  <li>
                      <Link href="/seo" className="text-gray-600 hover:text-green-600 transition-colors text-sm">
                        SEO Services
                      </Link>
                  </li>
                  <li>
                      <Link href="/get-a-quote" className="text-gray-600 hover:text-green-600 transition-colors text-sm">
                        Maintenance & Support
                      </Link>
                  </li>
              </ul>
          </div>

          {/* Company */}
          <div>
              <h2 className="mb-4 text-sm font-bold text-gray-900 uppercase tracking-wider">Company</h2>
              <ul className="space-y-3">
                  <li>
                      <Link href="/about" className="text-gray-600 hover:text-green-600 transition-colors text-sm">
                        About Us
                      </Link>
                  </li>
                  <li>
                      <Link href="/portfolio" className="text-gray-600 hover:text-green-600 transition-colors text-sm">
                        Portfolio
                      </Link>
                  </li>
                  <li>
                      <Link href="/blog" className="text-gray-600 hover:text-green-600 transition-colors text-sm">
                        Blog
                      </Link>
                  </li>
                  <li>
                      <Link href="/contact" className="text-gray-600 hover:text-green-600 transition-colors text-sm">
                        Contact Us
                      </Link>
                  </li>
                  <li>
                      <Link href="/faqs" className="text-gray-600 hover:text-green-600 transition-colors text-sm">
                        FAQs
                      </Link>
                  </li>
              </ul>
          </div>

          {/* Legal & Support */}
          <div>
              <h2 className="mb-4 text-sm font-bold text-gray-900 uppercase tracking-wider">Legal & Support</h2>
              <ul className="space-y-3">
                  <li>
                      <Link href="/get-a-quote" className="text-gray-600 hover:text-green-600 transition-colors text-sm">
                        Get a Quote
                      </Link>
                  </li>
                  <li>
                      <Link href="/privacy-policy" className="text-gray-600 hover:text-green-600 transition-colors text-sm">
                        Privacy Policy
                      </Link>
                  </li>
                  <li>
                      <Link href="/terms-of-service" className="text-gray-600 hover:text-green-600 transition-colors text-sm">
                        Terms & Conditions
                      </Link>
                  </li>
                  <li>
                      <span className="text-gray-600 text-sm">
                        Support Hours
                      </span>
                      <p className="text-xs text-gray-500 mt-1">Mon-Fri: 8AM - 6PM</p>
                  </li>
              </ul>
          </div>
      </div>

      <hr className="border-gray-200" />
      
      <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-sm text-gray-600 text-center md:text-left">
            © {currentYear} <Link href="/" className="hover:text-green-600 font-semibold">Netiqa™</Link>. All Rights Reserved.
          </span>
          
          <div className="flex gap-4">
              <a 
                href="https://www.facebook.com/netiqa" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-200 hover:bg-blue-600 flex items-center justify-center transition-all duration-300 group"
                aria-label="Facebook"
              >
                  <svg className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                        <path fillRule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clipRule="evenodd"/>
                    </svg>
              </a>
              <a 
                href="https://www.instagram.com/netiqa" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-200 hover:bg-pink-600 flex items-center justify-center transition-all duration-300 group"
                aria-label="Instagram"
              >
                  <svg className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path fill="currentColor" fillRule="evenodd" d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z" clipRule="evenodd"/>
                  </svg>
              </a>
              <a 
                href="https://twitter.com/netiqa" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-200 hover:bg-black flex items-center justify-center transition-all duration-300 group"
                aria-label="Twitter/X"
              >
                  <svg className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13.795 10.533 20.68 2h-3.073l-5.255 6.517L7.69 2H1l7.806 10.91L1.47 22h3.074l5.705-7.07L15.31 22H22l-8.205-11.467Zm-2.38 2.95L9.97 11.464 4.36 3.627h2.31l4.528 6.317 1.443 2.02 6.018 8.409h-2.31l-4.934-6.89Z"/>
                  </svg>
              </a>
              <a 
                href="https://www.linkedin.com/company/netiqa" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-200 hover:bg-blue-700 flex items-center justify-center transition-all duration-300 group"
                aria-label="LinkedIn"
              >
                  <svg className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z" clipRule="evenodd"/>
                    <path d="M7.2 8.809H4V19.5h3.2V8.809Z"/>
                  </svg>
              </a>
          </div>
      </div>
    </div>
</footer>

    </div>
  )
}
