'use client'

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// Google Analytics component
export function GoogleAnalytics({ GA_MEASUREMENT_ID }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + searchParams.toString();
    
    // Track page views
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_location: window.location.href,
        page_title: document.title,
      });
    }
  }, [pathname, searchParams, GA_MEASUREMENT_ID]);

  return (
    <>
      <script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_location: window.location.href,
              page_title: document.title,
            });
          `,
        }}
      />
    </>
  );
}

// Event tracking function
export const trackEvent = (action, category, label, value) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Custom hook for conversion tracking
export const useConversionTracking = () => {
  const trackConversion = (conversionType, value = null) => {
    trackEvent('conversion', 'user_action', conversionType, value);
    
    // Track specific CRM-related conversions
    switch (conversionType) {
      case 'demo_request':
        trackEvent('generate_lead', 'crm', 'demo_request');
        break;
      case 'pricing_view':
        trackEvent('view_item_list', 'crm', 'pricing_plans');
        break;
      case 'contact_form':
        trackEvent('generate_lead', 'crm', 'contact_form');
        break;
      case 'feature_view':
        trackEvent('view_item', 'crm', 'features');
        break;
      default:
        break;
    }
  };

  return { trackConversion };
};

// Schema.org tracking for form submissions
export const trackFormSubmission = (formType, formData) => {
  const formSchema = {
    "@context": "https://schema.org",
    "@type": "UserInteraction",
    "interactionType": "https://schema.org/WriteAction",
    "object": {
      "@type": "ContactPage",
      "name": `CRM ${formType} Form`,
      "url": window.location.href
    },
    "agent": {
      "@type": "Person",
      "email": formData.email || 'anonymous'
    }
  };

  // Track with analytics
  trackEvent('form_submit', 'engagement', formType);
  
  // Log structured data for debugging
  console.log('Form submission tracked:', formSchema);
};
