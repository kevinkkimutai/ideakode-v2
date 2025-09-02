// Hybrid storage for crawler analytics
// In-memory for Edge Runtime compatibility, with optional JSON persistence for API routes

class CrawlerAnalytics {
  constructor() {
    this.visits = [];
    this.maxVisits = 10000; // Limit memory usage
    this.isNode = typeof process !== 'undefined' && process.versions && process.versions.node;
  }

  // Only available in Node.js runtime (API routes)
  async loadDataFromFile() {
    if (!this.isNode) return;
    
    // Skip file operations in production/serverless environments
    if (process.env.VERCEL || process.env.NODE_ENV === 'production') {
      console.log('Production environment detected - using in-memory storage only');
      return;
    }
    
    try {
      const fs = await import('fs');
      const path = await import('path');
      
      const dataDir = path.join(process.cwd(), 'data');
      const dataFile = path.join(dataDir, 'analytics.json');

      // Create data directory if it doesn't exist (development only)
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }

      // Load existing data if file exists
      if (fs.existsSync(dataFile)) {
        const rawData = fs.readFileSync(dataFile, 'utf8');
        const data = JSON.parse(rawData);
        this.visits = data.visits || [];
        console.log(`Loaded ${this.visits.length} visits from analytics.json`);
      }
    } catch (error) {
      console.error('Error loading analytics data:', error);
      // Continue with empty array - don't fail
      this.visits = [];
    }
  }

  // Only available in Node.js runtime (API routes)
  async saveDataToFile() {
    if (!this.isNode) return;
    
    // Skip file operations in production/serverless environments
    if (process.env.VERCEL || process.env.NODE_ENV === 'production') {
      return; // Silently skip saving in production
    }
    
    try {
      const fs = await import('fs');
      const path = await import('path');
      
      const dataDir = path.join(process.cwd(), 'data');
      const dataFile = path.join(dataDir, 'analytics.json');
      
      // Create data directory if it doesn't exist (development only)
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      
      const data = {
        visits: this.visits,
        lastUpdated: new Date().toISOString(),
        totalVisits: this.visits.length
      };
      
      fs.writeFileSync(dataFile, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
      console.error('Error saving analytics data:', error);
      // Don't fail - just continue with in-memory storage
    }
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

    // Save to file if in Node.js environment (async, don't wait)
    if (this.isNode) {
      this.saveDataToFile().catch(console.error);
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

  async clearData() {
    this.visits = [];
    
    // Also clear the JSON file if in Node.js environment and not in production
    if (this.isNode && !process.env.VERCEL && process.env.NODE_ENV !== 'production') {
      try {
        const fs = await import('fs');
        const path = await import('path');
        
        const dataDir = path.join(process.cwd(), 'data');
        const dataFile = path.join(dataDir, 'analytics.json');
        
        if (fs.existsSync(dataFile)) {
          fs.unlinkSync(dataFile);
          console.log('Analytics JSON file cleared');
        }
      } catch (error) {
        console.error('Error clearing analytics file:', error);
      }
    }
  }
}

// Singleton instance
const crawlerAnalytics = new CrawlerAnalytics();

export default crawlerAnalytics;
