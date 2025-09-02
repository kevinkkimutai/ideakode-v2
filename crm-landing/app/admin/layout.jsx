export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">CRMogo Admin</h1>
              <nav className="flex space-x-4">
                <a 
                  href="/admin/analytics" 
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Crawler Analytics
                </a>
                <a 
                  href="/" 
                  className="text-gray-600 hover:text-gray-800"
                >
                  Back to Site
                </a>
              </nav>
            </div>
            <div className="text-sm text-gray-500">
              Admin Dashboard
            </div>
          </div>
        </div>
      </nav>
      <main>
        {children}
      </main>
    </div>
  );
}
