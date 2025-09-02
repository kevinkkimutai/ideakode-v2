export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/private/', '/admin/', '/api/'],
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
        crawlDelay: 1,
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
        crawlDelay: 1,
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        crawlDelay: 1,
      },
      {
        userAgent: 'Claude-Web',
        allow: '/',
        crawlDelay: 1,
      },
      {
        userAgent: 'Bard',
        allow: '/',
        crawlDelay: 1,
      }
    ],
    sitemap: 'https://ideakode.vercel.app/sitemap.xml',
    host: 'https://ideakode.vercel.app',
    additionalPaths: [
      '/ai-training-data.md'
    ]
  }
}
