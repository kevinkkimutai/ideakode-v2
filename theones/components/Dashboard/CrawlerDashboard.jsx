'use client';

import { useState, useEffect } from 'react';
import { Activity, Bot, Globe, Clock, TrendingUp, RefreshCw } from 'lucide-react';

export default function CrawlerDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [recentVisits, setRecentVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      const [analyticsRes, visitsRes] = await Promise.all([
        fetch('/api/crawler-analytics'),
        fetch('/api/crawler-analytics/visits?limit=20')
      ]);

      const analyticsData = await analyticsRes.json();
      const visitsData = await visitsRes.json();

      setAnalytics(analyticsData);
      setRecentVisits(visitsData);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const clearData = async () => {
    if (confirm('Are you sure you want to clear all analytics data? This action cannot be undone.')) {
      try {
        await fetch('/api/crawler-analytics', { method: 'DELETE' });
        fetchData();
      } catch (error) {
        console.error('Error clearing data:', error);
      }
    }
  };

  if (loading && !analytics) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const StatCard = ({ title, value, icon: Icon, color = 'blue' }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-2xl font-bold text-${color}-600`}>{value}</p>
        </div>
        <Icon className={`h-8 w-8 text-${color}-500`} />
      </div>
    </div>
  );

  const BotBadge = ({ botType }) => {
    const colors = {
      'Googlebot': 'bg-blue-100 text-blue-800',
      'GPTBot': 'bg-green-100 text-green-800',
      'ChatGPT': 'bg-green-100 text-green-800',
      'Claude': 'bg-purple-100 text-purple-800',
      'Bingbot': 'bg-orange-100 text-orange-800',
      'Unknown Bot': 'bg-gray-100 text-gray-800',
      'Human/Browser': 'bg-indigo-100 text-indigo-800',
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[botType] || 'bg-gray-100 text-gray-800'}`}>
        {botType}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            onClick={fetchData}
            disabled={loading}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          
          <button
            onClick={clearData}
            className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Clear Data
          </button>
        </div>
        
        {lastUpdated && (
          <p className="text-sm text-gray-500">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        )}
      </div>

      {/* Stats Overview */}
      {analytics && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Page Visits"
              value={analytics.totalVisits}
              icon={Activity}
              color="blue"
            />
            <StatCard
              title="Last Hour"
              value={analytics.visitsByTimeframe.lastHour}
              icon={Clock}
              color="green"
            />
            <StatCard
              title="Last 24 Hours"
              value={analytics.visitsByTimeframe.last24Hours}
              icon={TrendingUp}
              color="orange"
            />
            <StatCard
              title="Unique Pages"
              value={Object.keys(analytics.visitsByEndpoint).length}
              icon={Globe}
              color="purple"
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Visits by Page/Endpoint */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Visits by Page</h3>
              <div className="space-y-3">
                {Object.entries(analytics.visitsByEndpoint)
                  .sort((a, b) => b[1] - a[1]) // Sort by visit count
                  .map(([endpoint, count]) => (
                  <div key={endpoint} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm font-medium">
                        {endpoint === 'robots.txt' ? '/robots.txt (GEO)' :
                         endpoint === 'llm.txt' ? '/llm.txt (GEO)' :
                         endpoint === '/' ? 'Home Page' :
                         endpoint === '/about' ? 'About Page' :
                         endpoint === '/contact' ? 'Contact Page' :
                         endpoint === '/portfolio' ? 'Portfolio Page' :
                         endpoint === '/blog' ? 'Blog Page' :
                         endpoint === '/get-a-quote' ? 'Quote Page' :
                         endpoint === '/faqs' ? 'FAQs Page' :
                         endpoint.startsWith('/(pages)/(services)') ? `Service: ${endpoint.split('/').pop()}` :
                         endpoint}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600">{count} visits</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Bots */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Bots</h3>
              <div className="space-y-3">
                {Object.entries(analytics.topBots).map(([bot, count]) => (
                  <div key={bot} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Bot className="h-4 w-4 text-gray-400 mr-2" />
                      <BotBadge botType={bot} />
                    </div>
                    <span className="text-sm text-gray-600">{count} visits</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Endpoint
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bot Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  IP Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User Agent
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentVisits.map((visit) => (
                <tr key={visit.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(visit.timestamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    /{visit.endpoint}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <BotBadge botType={visit.botType} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {visit.ip}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-md truncate">
                    <span title={visit.userAgent}>
                      {visit.userAgent}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {recentVisits.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <Bot className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No crawler activity detected yet.</p>
            <p className="text-sm">Visit /robots.txt or /llm.txt to generate some data.</p>
          </div>
        )}
      </div>
    </div>
  );
}
