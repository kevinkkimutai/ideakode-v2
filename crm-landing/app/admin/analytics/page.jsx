import CrawlerAnalytics from '@/components/Analytics/CrawlerAnalytics';

export const metadata = {
  title: 'AI Crawler Analytics - CRMogo Admin',
  description: 'Monitor AI crawler activity and SEO performance',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminAnalyticsPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <CrawlerAnalytics />
    </div>
  );
}
