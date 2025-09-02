import CrawlerDashboard from '../../../components/Dashboard/CrawlerDashboard';
import AdminAuth from '../../../components/Dashboard/AdminAuth';

export const metadata = {
  title: 'Crawler Analytics Dashboard - Netiqa',
  description: 'Monitor AI bot and search engine crawler activity on your website',
  robots: 'noindex, nofollow', // Keep dashboard private
};

export default function DashboardPage() {
  return (
    <AdminAuth>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8 mt-32">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Crawler Analytics Dashboard
            </h1>
            <p className="text-gray-600">
              Monitor AI bots and search engine crawlers accessing your GEO endpoints
            </p>
          </div>
          
          <CrawlerDashboard />
        </div>
      </div>
    </AdminAuth>
  );
}
