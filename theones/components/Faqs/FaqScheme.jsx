'use client';

import { useMemo } from 'react';
import Script from 'next/script';

export default function FAQSchema({faqs}) {
  const schemaData = useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': faqs.map((faq) => ({
        '@type': 'Question',
        'name': faq.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': faq.answer
        }
      }))
    };
  }, []);

  return (
    <Script
      type="application/ld+json"
      id="faq-schema"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
