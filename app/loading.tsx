export default function Loading() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 animate-pulse">
      {/* Title skeleton */}
      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-md w-48 mb-8"></div>

      {/* Create button skeleton */}
      <div className="flex justify-start">
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-md w-40"></div>
      </div>

      {/* List skeleton */}
      <div className="bg-white dark:bg-[#1c1c1c] rounded-lg shadow overflow-hidden">
        <div className="space-y-4 p-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex items-center space-x-4 py-4 border-b border-gray-100 dark:border-gray-800 last:border-0"
            >
              <div className="flex-1 space-y-3">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-1/2"></div>
              </div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
