// Simple in-memory storage for crawler analytics
// In production, you'd want to use a database like MongoDB, PostgreSQL, etc.

class CrawlerAnalytics {
  constructor() {
    this.visits = [];
    this.maxVisits = 10000; // Limit memory usage
  }

  logVisit(endpoint, userAgent, ip, timestamp) {
    const visit = {
      id: Date.now() + Math.random(),
      endpoint,
      userAgent,
      ip,
      timestamp,
      botType: this.identifyBot(userAgent),
      country: null, // Could be enhanced with IP geolocation
    };

    this.visits.unshift(visit);
    
    // Keep only recent visits to prevent memory issues
    if (this.visits.length > this.maxVisits) {
      this.visits = this.visits.slice(0, this.maxVisits);
    }

    return visit;
  }

  identifyBot(userAgent) {
    const botPatterns = {
      'Googlebot': /Googlebot/i,
      'Bingbot': /bingbot/i,
      'GPTBot': /GPTBot/i,
      'ChatGPT': /ChatGPT-User/i,
      'Claude': /Claude-Web|anthropic/i,
      'Perplexity': /PerplexityBot/i,
      'Anthropic': /anthropic-ai/i,
      'CCBot': /CCBot/i,
      'Slurp': /Slurp/i,
      'DuckDuckBot': /DuckDuckBot/i,
      'FacebookBot': /facebookexternalhit/i,
      'TwitterBot': /Twitterbot/i,
      'LinkedInBot': /LinkedInBot/i,
      'WhatsApp': /WhatsApp/i,
    };

    for (const [botName, pattern] of Object.entries(botPatterns)) {
      if (pattern.test(userAgent)) {
        return botName;
      }
    }

    // Check if it's likely a bot based on user agent characteristics
    if (/bot|crawler|spider|scraper/i.test(userAgent)) {
      return 'Unknown Bot';
    }

    return 'Human/Browser';
  }

  getRecentVisits(limit = 100) {
    return this.visits.slice(0, limit);
  }

  getAnalytics() {
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;
    const oneDay = 24 * oneHour;
    const oneWeek = 7 * oneDay;

    const analytics = {
      totalVisits: this.visits.length,
      visitsByEndpoint: {},
      visitsByBot: {},
      visitsByTimeframe: {
        lastHour: 0,
        last24Hours: 0,
        lastWeek: 0,
      },
      topBots: {},
      recentActivity: this.visits.slice(0, 10),
    };

    this.visits.forEach(visit => {
      const visitTime = new Date(visit.timestamp).getTime();
      
      // Count by endpoint
      analytics.visitsByEndpoint[visit.endpoint] = 
        (analytics.visitsByEndpoint[visit.endpoint] || 0) + 1;
      
      // Count by bot type
      analytics.visitsByBot[visit.botType] = 
        (analytics.visitsByBot[visit.botType] || 0) + 1;
      
      // Count by timeframe
      if (now - visitTime < oneHour) {
        analytics.visitsByTimeframe.lastHour++;
      }
      if (now - visitTime < oneDay) {
        analytics.visitsByTimeframe.last24Hours++;
      }
      if (now - visitTime < oneWeek) {
        analytics.visitsByTimeframe.lastWeek++;
      }
    });

    // Get top bots
    analytics.topBots = Object.entries(analytics.visitsByBot)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {});

    return analytics;
  }

  clearData() {
    this.visits = [];
  }
}

// Singleton instance
const crawlerAnalytics = new CrawlerAnalytics();

export default crawlerAnalytics;
