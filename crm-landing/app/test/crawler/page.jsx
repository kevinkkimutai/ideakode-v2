export default function CrawlerTestPage() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">🤖 Crawler Detection Test</h1>
      
      <div className="bg-blue-50 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-3">Test Instructions</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Open your browser's developer console</li>
          <li>Visit this page with different user agents</li>
          <li>Check the server console for crawler detection logs</li>
          <li>Visit <code className="bg-gray-200 px-1 rounded">/admin/analytics</code> to see the dashboard</li>
        </ol>
      </div>

      <div className="bg-yellow-50 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-3">Simulating AI Crawlers</h2>
        <p className="text-gray-700 mb-3">
          To test crawler detection, you can modify your browser's user agent to include:
        </p>
        <ul className="list-disc list-inside space-y-1 text-gray-600">
          <li><code>GPTBot</code> - OpenAI's crawler</li>
          <li><code>PerplexityBot</code> - Perplexity's crawler</li>
          <li><code>ClaudeBot</code> - Anthropic's crawler</li>
          <li><code>CCBot</code> - Common Crawl</li>
          <li><code>Google-Extended</code> - Google's AI training crawler</li>
        </ul>
      </div>

      <div className="bg-green-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-3">What Gets Tracked</h2>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>Crawler type and user agent</li>
          <li>Visited pages and timestamps</li>
          <li>IP addresses (when available)</li>
          <li>Referrer information</li>
          <li>Real-time analytics in the admin dashboard</li>
        </ul>
      </div>

      <div className="mt-8 text-center">
        <a 
          href="/admin/analytics"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          View Crawler Analytics Dashboard
        </a>
      </div>
    </div>
  );
}
