'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function PageTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Track page visit
    const trackPageVisit = async () => {
      try {
        await fetch('/api/page-tracking', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            pathname,
            userAgent: navigator.userAgent,
            referrer: document.referrer,
            timestamp: new Date().toISOString()
          }),
        });
      } catch (error) {
        console.error('Failed to track page visit:', error);
      }
    };

    // Small delay to ensure page is loaded
    const timer = setTimeout(trackPageVisit, 100);
    return () => clearTimeout(timer);
  }, [pathname]);

  return null; // This component doesn't render anything
}
