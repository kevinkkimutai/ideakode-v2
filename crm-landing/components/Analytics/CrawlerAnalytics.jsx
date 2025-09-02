'use client'

import { useState, useEffect } from 'react';

export default function CrawlerAnalytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchData();
    // Refresh every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [filter]);

  const fetchData = async () => {
    try {
      const url = `/api/crawler-analytics${filter ? `?crawler=${filter}` : ''}`;
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Failed to fetch crawler data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-32 bg-gray-200 rounded mb-4"></div>
          <div className="h-48 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        🤖 AI Crawler Analytics Dashboard
      </h1>
      
      {/* Filter */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Filter by crawler name..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg w-64"
        />
        <button
          onClick={fetchData}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Refresh
        </button>
      </div>

      {data && (
        <>
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800">Total Visits</h3>
              <p className="text-2xl font-bold text-blue-600">{data.crawlerStats.totalVisits}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800">Unique Crawlers</h3>
              <p className="text-2xl font-bold text-green-600">
                {Object.keys(data.crawlerStats.crawlerCounts).length}
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-800">Pages Crawled</h3>
              <p className="text-2xl font-bold text-purple-600">
                {Object.keys(data.crawlerStats.popularPaths).length}
              </p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-orange-800">Last Activity</h3>
              <p className="text-sm font-medium text-orange-600">
                {data.crawlerStats.lastActivity 
                  ? new Date(data.crawlerStats.lastActivity).toLocaleString()
                  : 'No activity'
                }
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Crawler Counts */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Crawler Activity</h2>
              <div className="space-y-3">
                {Object.entries(data.crawlerStats.crawlerCounts)
                  .sort(([,a], [,b]) => b - a)
                  .map(([crawler, count]) => (
                    <div key={crawler} className="flex justify-between items-center">
                      <span className="font-medium text-gray-700">{crawler}</span>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {count} visits
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Popular Pages */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Most Crawled Pages</h2>
              <div className="space-y-3">
                {Object.entries(data.crawlerStats.popularPaths).map(([path, count]) => (
                  <div key={path} className="flex justify-between items-center">
                    <span className="font-medium text-gray-700 truncate flex-1">{path}</span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium ml-2">
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Recent Crawler Activity</h2>
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <div className="max-h-96 overflow-y-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-100 sticky top-0">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Timestamp</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Crawler</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Path</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">IP</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {data.logs.map((log) => (
                      <tr key={log.id} className="hover:bg-white">
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {new Date(log.timestamp).toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-800">
                          {log.crawler}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {log.path}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500">
                          {log.ip}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
