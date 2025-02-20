import React, { useEffect, useState } from "react";
import { Sidebar } from "../layouts/Sidebar";
import DashboardMetrics from "../components/metrics/DashboardMetrics";
import DashboardMetricsSkeleton from "../skeleton/DashboardMetricsSkeleton";
import data from "../api/data.js";

const Dashboard = () => {
    const [openSidebar, setOpenSidebar] = useState(true);
    const [metricsData, setMetricsData] = useState({
        totalUsers: 0,
        activeUsers: 0,
        totalStreams: 0,
        revenue: 0,
        topArtist: "",
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulating fetching data with a delay
        setTimeout(() => {
            if (data && data.metrics) {
                const { totalUsers, activeUsers, totalStreams, revenue, topArtist } = data.metrics;
                setMetricsData({ totalUsers, activeUsers, totalStreams, revenue, topArtist });
                setLoading(false); 
            }
        }, 1000);
    }, []);

    return (
        <section className="flex flex-grow">
            {/* Sidebar */}
            <Sidebar isOpen={openSidebar} onClose={() => setOpenSidebar(false)} />

            {/* Main Content */}
            <div className="flex-grow py-2">
                {loading ? <DashboardMetricsSkeleton /> : <DashboardMetrics data={metricsData} />}
            </div>
        </section>
    );
};

export default Dashboard;
