/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://ideakode.vercel.app',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: [
    '/admin/*',
    '/private/*',
    '/api/*',
    '/_next/*',
    '/404',
    '/500'
  ],
  additionalPaths: async (config) => {
    return [
      await config.transform(config, '/'),
      await config.transform(config, '/Features'),
      await config.transform(config, '/Solutions'), 
      await config.transform(config, '/Pricing'),
      await config.transform(config, '/Contact-Us'),
    ]
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/private/', '/api/']
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/', '/private/', '/api/']
      }
    ],
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_SITE_URL || 'https://ideakode.vercel.app'}/sitemap.xml`,
    ],
  },
  transform: async (config, path) => {
    // Custom priority based on page importance
    let priority = 0.7;
    let changefreq = 'weekly';
    
    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    } else if (path.includes('Features') || path.includes('Solutions')) {
      priority = 0.8;
      changefreq = 'weekly';
    } else if (path.includes('Pricing')) {
      priority = 0.8;
      changefreq = 'weekly';
    } else if (path.includes('Contact')) {
      priority = 0.6;
      changefreq = 'monthly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    }
  },
}
