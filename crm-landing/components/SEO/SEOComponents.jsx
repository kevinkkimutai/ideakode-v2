import { Suspense } from 'react';

// Component for lazy loading images with proper SEO attributes
export function OptimizedImage({ src, alt, width, height, priority = false, className = "" }) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={className}
      style={{ aspectRatio: `${width}/${height}` }}
    />
  );
}

// Component for preloading critical resources
export function PreloadResources() {
  return (
    <>
      {/* Preload critical fonts */}
      <link
        rel="preload"
        href="/fonts/geist-sans.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      
      {/* Preload critical images */}
      <link
        rel="preload"
        href="/logo/crmogo.png"
        as="image"
      />
      
      {/* DNS prefetch for external resources */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      
      {/* Preconnect to critical third parties */}
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </>
  );
}

// Breadcrumb component for navigation and SEO
export function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-gray-600 mb-4">
      <ol className="flex space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <span className="mx-2">/</span>}
            {item.href ? (
              <a 
                href={item.href} 
                className="hover:text-blue-600 transition-colors"
                {...(index === items.length - 1 && { 'aria-current': 'page' })}
              >
                {item.name}
              </a>
            ) : (
              <span className="text-gray-800">{item.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// Skip link for accessibility and SEO
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-blue-600 text-white p-2 z-50"
    >
      Skip to main content
    </a>
  );
}

// Component wrapper with loading state for better UX and SEO
export function SEOWrapper({ children, loading = false }) {
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" role="status" aria-label="Loading">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" role="status" aria-label="Loading">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="sr-only">Loading...</span>
      </div>
    }>
      {children}
    </Suspense>
  );
}
