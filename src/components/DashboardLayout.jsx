export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="bg-white dark:bg-gray-800 shadow px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-orange-600">MetaPeek</h1>
          <div>{/* Add auth buttons/avatar here later */}</div>
        </div>
      </header>

      <main className="px-4 py-8 md:px-10 max-w-7xl mx-auto">{children}</main>
    </div>
  );
}
