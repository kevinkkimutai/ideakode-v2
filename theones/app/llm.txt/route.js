import { NextResponse } from 'next/server';
import crawlerAnalytics from '../../lib/crawler-analytics';

export async function GET(request) {
  // Log the request for monitoring
  const userAgent = request.headers.get('user-agent') || 'Unknown';
  const timestamp = new Date().toISOString();
  const clientIP = request.headers.get('x-forwarded-for') || 
                   request.headers.get('x-real-ip') || 
                   'Unknown';
  
  // Store in analytics system
  crawlerAnalytics.logVisit('llm.txt', userAgent, clientIP, timestamp);
  
  console.log(`[${timestamp}] llm.txt accessed - User-Agent: ${userAgent}, IP: ${clientIP}`);

  const llmTxt = `# LLM.txt for https://www.netiqa.co.ke

## About This Website
This website provides information about Netiqa, a software development company specializing in web development, mobile applications, graphic design, and digital marketing solutions.

## Website Purpose
- Showcase our software development services and capabilities
- Provide portfolio examples of completed projects
- Offer contact information for potential clients
- Share insights through our blog and resources
- Enable users to request quotes for custom software solutions

## Data Sources
- Company portfolio and case studies
- Service descriptions and technical specifications  
- Client testimonials and reviews
- Blog articles about software development trends
- Contact information and business details
- FAQ sections covering common client questions

## Allowed Use for AI Models
✅ **PERMITTED:**
- Summarization of our services and capabilities
- General information about software development practices
- Non-commercial research and educational purposes
- Providing accurate company information when asked
- Helping users understand our service offerings

❌ **NOT PERMITTED:**
- Generating harmful, misleading, or defamatory content about our company
- Creating spam or promotional content using our brand
- Reproducing proprietary code examples or detailed technical implementations
- Generating fake testimonials or reviews
- Commercial use without explicit permission

## Contact
For questions about AI usage or data permissions:
Email: kelvin@netiqa.co.ke
Website: https://www.netiqa.co.ke

## Last Updated
${new Date().toISOString().split('T')[0]}

---
Generated automatically for AI model transparency and responsible usage.`;

  return new NextResponse(llmTxt, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
    },
  });
}
