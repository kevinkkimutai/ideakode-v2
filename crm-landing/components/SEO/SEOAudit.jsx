// SEO audit utilities for monitoring and optimization
export class SEOAudit {
  constructor() {
    this.issues = [];
  }

  // Check page metadata
  checkMetadata() {
    const title = document.querySelector('title');
    const description = document.querySelector('meta[name="description"]');
    const keywords = document.querySelector('meta[name="keywords"]');
    
    if (!title || title.textContent.length < 30) {
      this.issues.push('Title tag missing or too short (should be 30-60 characters)');
    }
    
    if (!description || description.content.length < 120) {
      this.issues.push('Meta description missing or too short (should be 120-160 characters)');
    }
    
    if (!keywords) {
      this.issues.push('Meta keywords missing');
    }
  }

  // Check heading structure
  checkHeadings() {
    const h1s = document.querySelectorAll('h1');
    if (h1s.length === 0) {
      this.issues.push('No H1 tag found');
    } else if (h1s.length > 1) {
      this.issues.push('Multiple H1 tags found (should have only one)');
    }

    // Check heading hierarchy
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let previousLevel = 0;
    headings.forEach(heading => {
      const level = parseInt(heading.tagName.charAt(1));
      if (level > previousLevel + 1) {
        this.issues.push(`Heading hierarchy skip detected: ${heading.tagName} after H${previousLevel}`);
      }
      previousLevel = level;
    });
  }

  // Check images
  checkImages() {
    const images = document.querySelectorAll('img');
    images.forEach((img, index) => {
      if (!img.alt) {
        this.issues.push(`Image ${index + 1} missing alt attribute`);
      }
      if (!img.width || !img.height) {
        this.issues.push(`Image ${index + 1} missing width/height attributes`);
      }
    });
  }

  // Check links
  checkLinks() {
    const links = document.querySelectorAll('a');
    links.forEach((link, index) => {
      if (!link.textContent.trim()) {
        this.issues.push(`Link ${index + 1} has empty text content`);
      }
      if (link.href && link.href.startsWith('http') && !link.rel) {
        this.issues.push(`External link ${index + 1} missing rel attribute`);
      }
    });
  }

  // Check structured data
  checkStructuredData() {
    const jsonLdScripts = document.querySelectorAll('script[type="application/ld+json"]');
    if (jsonLdScripts.length === 0) {
      this.issues.push('No structured data (JSON-LD) found');
    } else {
      jsonLdScripts.forEach((script, index) => {
        try {
          JSON.parse(script.textContent);
        } catch (e) {
          this.issues.push(`Invalid JSON-LD in script ${index + 1}`);
        }
      });
    }
  }

  // Check page performance
  checkPerformance() {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0];
      if (navigation && navigation.loadEventEnd > 3000) {
        this.issues.push('Page load time exceeds 3 seconds');
      }
    }
  }

  // Run full audit
  runAudit() {
    this.issues = []; // Reset issues
    this.checkMetadata();
    this.checkHeadings();
    this.checkImages();
    this.checkLinks();
    this.checkStructuredData();
    this.checkPerformance();
    
    return {
      score: Math.max(0, 100 - (this.issues.length * 5)),
      issues: this.issues,
      suggestions: this.generateSuggestions()
    };
  }

  // Generate improvement suggestions
  generateSuggestions() {
    const suggestions = [];
    
    if (this.issues.some(issue => issue.includes('title'))) {
      suggestions.push('Optimize title tags to be descriptive and include target keywords');
    }
    
    if (this.issues.some(issue => issue.includes('description'))) {
      suggestions.push('Write compelling meta descriptions that encourage clicks');
    }
    
    if (this.issues.some(issue => issue.includes('alt'))) {
      suggestions.push('Add descriptive alt text to all images for accessibility and SEO');
    }
    
    if (this.issues.some(issue => issue.includes('heading'))) {
      suggestions.push('Improve heading structure for better content hierarchy');
    }
    
    return suggestions;
  }
}

// React component for development SEO monitoring
export function SEOMonitor({ enabled = process.env.NODE_ENV === 'development' }) {
  if (!enabled) return null;

  const runAudit = () => {
    const audit = new SEOAudit();
    const results = audit.runAudit();
    
    console.group('🔍 SEO Audit Results');
    console.log(`Score: ${results.score}/100`);
    
    if (results.issues.length > 0) {
      console.group('❌ Issues Found:');
      results.issues.forEach(issue => console.warn(issue));
      console.groupEnd();
    }
    
    if (results.suggestions.length > 0) {
      console.group('💡 Suggestions:');
      results.suggestions.forEach(suggestion => console.info(suggestion));
      console.groupEnd();
    }
    
    console.groupEnd();
    return results;
  };

  // Run audit when component mounts and on route changes
  React.useEffect(() => {
    const timer = setTimeout(runAudit, 1000); // Wait for page to fully load
    return () => clearTimeout(timer);
  }, []);

  return null; // This component doesn't render anything
}
