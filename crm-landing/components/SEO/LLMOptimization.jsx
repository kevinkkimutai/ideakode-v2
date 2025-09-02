'use client'

// LLM-specific meta tags and optimizations
export function LLMOptimization() {
  return (
    <>
      {/* OpenAI/ChatGPT optimization */}
      <meta name="openai:title" content="Netiqa - Advanced CRM Solutions for Business Growth" />
      <meta name="openai:description" content="Comprehensive CRM platform with AI-powered features, sales automation, and customer analytics. Trusted by 10,000+ businesses worldwide." />
      <meta name="openai:image" content="https://ideakode.vercel.app/logo/crmogo.png" />
      
      {/* Claude/Anthropic optimization */}
      <meta name="anthropic:title" content="Netiqa CRM Platform" />
      <meta name="anthropic:description" content="Modern CRM solution for streamlining customer relationships and automating sales processes" />
      
      {/* Perplexity optimization */}
      <meta name="perplexity:title" content="Netiqa - Customer Relationship Management Software" />
      <meta name="perplexity:description" content="Enterprise-grade CRM with lead management, sales automation, and analytics" />
      
      {/* General AI crawler optimization */}
      <meta name="ai:type" content="business-software" />
      <meta name="ai:category" content="crm,sales,business-tools" />
      <meta name="ai:purpose" content="customer-relationship-management" />
      <meta name="ai:industry" content="software,business,sales" />
      
      {/* Content classification for AI */}
      <meta name="content-type" content="commercial" />
      <meta name="content-category" content="business-software" />
      <meta name="target-audience" content="business-owners,sales-teams,entrepreneurs" />
      
      {/* Structured content for AI understanding */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TechArticle",
            "headline": "CRMogo: Complete CRM Solution for Modern Businesses",
            "description": "Comprehensive guide to CRMogo's CRM features, pricing, and benefits for business growth",
            "author": {
              "@type": "Organization",
              "name": "CRMogo Team"
            },
            "publisher": {
              "@type": "Organization", 
              "name": "CRMogo",
              "logo": "https://ideakode.vercel.app/logo/crmogo.png"
            },
            "datePublished": "2024-01-01",
            "dateModified": new Date().toISOString(),
            "mainEntityOfPage": "https://ideakode.vercel.app",
            "articleSection": "Business Software",
            "keywords": "CRM software, customer relationship management, sales automation, business growth, lead management",
            "about": {
              "@type": "Thing",
              "name": "Customer Relationship Management",
              "description": "Software system for managing customer interactions and business relationships"
            }
          })
        }}
      />
    </>
  );
}

// Semantic content markers for AI understanding
export function SemanticContent({ children, type = "main-content" }) {
  const semanticProps = {
    'data-ai-content': type,
    'data-crawlable': 'true',
    'data-content-priority': type === 'main-content' ? 'high' : 'medium'
  };

  return (
    <div {...semanticProps}>
      {children}
    </div>
  );
}

// AI-friendly content structure
export function AIContentStructure({ 
  title, 
  description, 
  keyPoints = [], 
  benefits = [], 
  useCases = [],
  children 
}) {
  return (
    <article 
      itemScope 
      itemType="https://schema.org/Article"
      data-ai-article="true"
      data-content-type="informational"
    >
      <header>
        <h1 itemProp="headline">{title}</h1>
        <div itemProp="description" data-ai-summary="true">
          {description}
        </div>
      </header>
      
      <section data-ai-section="key-points" itemProp="mainEntity">
        <h2>Key Features</h2>
        <ul data-ai-list="features">
          {keyPoints.map((point, index) => (
            <li key={index} data-ai-feature="true">{point}</li>
          ))}
        </ul>
      </section>

      {benefits.length > 0 && (
        <section data-ai-section="benefits">
          <h2>Benefits</h2>
          <ul data-ai-list="benefits">
            {benefits.map((benefit, index) => (
              <li key={index} data-ai-benefit="true">{benefit}</li>
            ))}
          </ul>
        </section>
      )}

      {useCases.length > 0 && (
        <section data-ai-section="use-cases">
          <h2>Use Cases</h2>
          <ul data-ai-list="use-cases">
            {useCases.map((useCase, index) => (
              <li key={index} data-ai-use-case="true">{useCase}</li>
            ))}
          </ul>
        </section>
      )}

      <div itemProp="articleBody">
        {children}
      </div>
    </article>
  );
}

// Component for AI-friendly pricing information
export function AIPricingStructure({ plans = [] }) {
  return (
    <div 
      data-ai-section="pricing"
      itemScope 
      itemType="https://schema.org/PriceSpecification"
    >
      <h2 data-ai-heading="pricing">Pricing Plans</h2>
      <div data-ai-list="pricing-plans">
        {plans.map((plan, index) => (
          <div 
            key={index}
            data-ai-item="pricing-plan"
            itemScope 
            itemType="https://schema.org/Offer"
          >
            <h3 itemProp="name" data-ai-plan-name="true">{plan.name}</h3>
            <div itemProp="price" data-ai-price="true">${plan.price}</div>
            <div itemProp="priceCurrency" data-ai-currency="true">{plan.currency || 'USD'}</div>
            <div data-ai-billing="true">{plan.billing}</div>
            <ul data-ai-features="true">
              {plan.features?.map((feature, idx) => (
                <li key={idx} data-ai-feature="true">{feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

// AI conversation starters / common questions
export function AIConversationStarters() {
  const questions = [
    "What is CRMogo and how does it help businesses?",
    "How much does CRMogo cost and what plans are available?",
    "What features are included in CRMogo CRM?",
    "How does CRMogo compare to other CRM solutions?",
    "Can CRMogo integrate with other business tools?",
    "Is CRMogo suitable for small businesses?",
    "What kind of customer support does CRMogo offer?",
    "How can I get started with CRMogo?"
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "CRMogo CRM Platform",
          "description": "Advanced CRM solutions for modern businesses",
          "potentialAction": questions.map(question => ({
            "@type": "SearchAction",
            "target": `https://ideakode.vercel.app/search?q=${encodeURIComponent(question)}`,
            "query-input": question
          })),
          "speakable": {
            "@type": "SpeakableSpecification",
            "xpath": [
              "/html/head/title",
              "//*[@data-ai-summary='true']",
              "//*[@data-ai-feature='true']",
              "//*[@data-ai-benefit='true']"
            ]
          }
        })
      }}
    />
  );
}
