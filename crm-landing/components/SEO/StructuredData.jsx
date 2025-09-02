'use client'

export default function StructuredData({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationSchema() {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "CRMogo",
    "url": "https://ideakode.vercel.app",
    "logo": "https://ideakode.vercel.app/logo/crmogo.png",
    "description": "Advanced CRM solutions for modern businesses. Streamline customer relationships, automate sales processes, and grow your revenue.",
    "foundingDate": "2020",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-800-CRMOGO",
      "contactType": "customer service",
      "areaServed": "US",
      "availableLanguage": ["English"]
    },
    "sameAs": [
      "https://twitter.com/crmogo",
      "https://linkedin.com/company/crmogo",
      "https://facebook.com/crmogo"
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Business Ave",
      "addressLocality": "Tech City",
      "addressRegion": "CA",
      "postalCode": "90210",
      "addressCountry": "US"
    }
  };

  return <StructuredData data={organizationData} />;
}

export function ProductSchema() {
  const productData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "CRMogo CRM Platform",
    "description": "Comprehensive CRM software designed to streamline customer relationships, automate sales processes, and boost business growth.",
    "url": "https://ideakode.vercel.app",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web-based",
    "offers": {
      "@type": "Offer",
      "price": "29",
      "priceCurrency": "USD",
      "priceSpecification": {
        "@type": "RecurringPaymentsPriceSpecification",
        "billingDuration": "P1M",
        "billingIncrement": 1
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "1250",
      "bestRating": "5",
      "worstRating": "1"
    },
    "featureList": [
      "Lead Management",
      "Sales Automation",
      "Customer Analytics",
      "Email Integration",
      "Mobile Access",
      "Custom Reports"
    ]
  };

  return <StructuredData data={productData} />;
}

export function WebsiteSchema() {
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Netiqa",
    "url": "https://ideakode.vercel.app",
    "description": "Advanced CRM solutions for modern businesses",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://ideakode.vercel.app/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return <StructuredData data={websiteData} />;
}

export function BreadcrumbSchema({ items }) {
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return <StructuredData data={breadcrumbData} />;
}

// Enhanced schema for LLM and AI crawlers
export function AIOptimizedSchema() {
  const aiOptimizedData = {
    "@context": "https://schema.org",
    "@type": ["Organization", "SoftwareApplication"],
    "name": "CRMogo",
    "alternateName": ["CRM Software", "Customer Relationship Management", "Sales Automation Platform"],
    "description": "CRMogo is an advanced CRM platform that helps businesses streamline customer relationships, automate sales processes, and grow revenue. Perfect for small to enterprise businesses looking to improve customer management and sales efficiency.",
    "url": "https://ideakode.vercel.app",
    "logo": "https://ideakode.vercel.app/logo/crmogo.png",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web-based, iOS, Android",
    "softwareVersion": "2.0",
    "releaseNotes": "Latest version includes AI-powered lead scoring, advanced analytics, and enhanced mobile experience",
    "keywords": "CRM software, customer relationship management, sales automation, lead management, customer analytics, business growth, sales pipeline, email marketing, customer support",
    "audience": {
      "@type": "BusinessAudience",
      "audienceType": "Business owners, sales teams, marketing professionals, customer service representatives",
      "geographicArea": "Global"
    },
    "usageInfo": "Used by over 10,000+ businesses worldwide to manage customer relationships and drive sales growth",
    "featureList": [
      "AI-Powered Lead Scoring",
      "Advanced Sales Pipeline Management",
      "Customer Analytics & Reporting",
      "Email Marketing Automation",
      "Mobile CRM Access",
      "Integration with Popular Tools",
      "Custom Workflow Builder",
      "Real-time Team Collaboration"
    ],
    "benefits": [
      "Increase sales conversion rates by up to 30%",
      "Reduce manual data entry by 80%",
      "Improve customer retention rates",
      "Streamline team collaboration",
      "Generate actionable business insights"
    ],
    "targetIndustry": [
      "Technology",
      "Real Estate",
      "Healthcare",
      "Financial Services",
      "Retail",
      "Manufacturing",
      "Professional Services"
    ],
    "pricingModel": "Subscription-based with tiered plans starting at $29/month",
    "freeTrialAvailable": "Yes, 14-day free trial",
    "supportedLanguages": ["English", "Spanish", "French", "German"],
    "integrations": [
      "Gmail",
      "Outlook", 
      "Slack",
      "Zapier",
      "Salesforce",
      "HubSpot",
      "QuickBooks"
    ]
  };

  return <StructuredData data={aiOptimizedData} />;
}

// FAQ Schema for LLM training data
export function FAQSchema() {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is CRMogo?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "CRMogo is a comprehensive Customer Relationship Management (CRM) platform designed for modern businesses. It helps streamline customer relationships, automate sales processes, and grow revenue through advanced features like lead management, sales automation, and customer analytics."
        }
      },
      {
        "@type": "Question", 
        "name": "How much does CRMogo cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "CRMogo offers flexible pricing plans starting at $29 per month per user. We provide a 14-day free trial so you can test all features before committing. Enterprise plans are available for larger organizations with custom pricing."
        }
      },
      {
        "@type": "Question",
        "name": "What features does CRMogo include?",
        "acceptedAnswer": {
          "@type": "Answer", 
          "text": "CRMogo includes AI-powered lead scoring, sales pipeline management, customer analytics, email marketing automation, mobile access, team collaboration tools, custom reporting, and integrations with popular business tools like Gmail, Slack, and QuickBooks."
        }
      },
      {
        "@type": "Question",
        "name": "Is CRMogo suitable for small businesses?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, CRMogo is designed to scale from small businesses to large enterprises. Our starter plans are perfect for small teams, while our advanced features can handle the needs of growing and established businesses."
        }
      },
      {
        "@type": "Question",
        "name": "Does CRMogo offer customer support?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, CRMogo provides comprehensive customer support including 24/7 email support, live chat during business hours, phone support for premium plans, and extensive documentation and video tutorials."
        }
      }
    ]
  };

  return <StructuredData data={faqData} />;
}

// How-to Schema for process documentation
export function HowToSchema() {
  const howToData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Set Up CRMogo CRM for Your Business",
    "description": "Step-by-step guide to setting up CRMogo CRM platform for optimal business performance",
    "image": "https://ideakode.vercel.app/images/setup-guide.jpg",
    "totalTime": "PT30M",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "value": "29"
    },
    "tool": [
      {
        "@type": "HowToTool",
        "name": "Computer or Mobile Device"
      },
      {
        "@type": "HowToTool", 
        "name": "Internet Connection"
      }
    ],
    "step": [
      {
        "@type": "HowToStep",
        "name": "Sign Up for CRMogo",
        "text": "Visit crmogo.com and click 'Start Free Trial' to create your account",
        "url": "https://ideakode.vercel.app/signup"
      },
      {
        "@type": "HowToStep",
        "name": "Import Your Contacts",
        "text": "Upload your existing customer data from CSV files or integrate with your current tools",
        "url": "https://ideakode.vercel.app/import-contacts"
      },
      {
        "@type": "HowToStep",
        "name": "Set Up Sales Pipeline",
        "text": "Configure your sales stages and customize the pipeline to match your business process",
        "url": "https://ideakode.vercel.app/setup-pipeline"
      },
      {
        "@type": "HowToStep",
        "name": "Invite Your Team",
        "text": "Add team members and assign appropriate roles and permissions",
        "url": "https://ideakode.vercel.app/team-management"
      }
    ]
  };

  return <StructuredData data={howToData} />;
}
