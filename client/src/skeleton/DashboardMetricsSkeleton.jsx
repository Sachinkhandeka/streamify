import React from 'react'

const DashboardMetricsSkeleton = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {/* Metric Card Skeleton */}
            {[...Array(6)].map((_, index) => (
                <div
                    key={index}
                    className="p-8 shadow-md rounded-lg animate-pulse flex items-center gap-4 dark:bg-gray-900"
                >
                    <div className="p-4 w-18 h-18 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                    <div>
                        <div className="h-2 w-22 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                        <div className="h-2 w-28 bg-gray-400 dark:bg-gray-800 rounded"></div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default DashboardMetricsSkeleton