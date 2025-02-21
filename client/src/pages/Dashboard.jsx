import React, { useEffect, useState } from "react";
import { Sidebar } from "../layouts/Sidebar";
import DashboardMetrics from "../components/metrics/DashboardMetrics";
import DashboardMetricsSkeleton from "../skeleton/DashboardMetricsSkeleton";
import data from "../api/data.js";
import UserGrowthChart from "../components/charts/UserGrowthChart.jsx";
import RevenueBreakdownChart from "../components/charts/RevenueBreakdownChart.jsx";
import TopStreamedSongsChart from "../components/charts/TopStreamedSongsChart.jsx";

const Dashboard = () => {
    const [openSidebar, setOpenSidebar] = useState(true);
    const [metricsData, setMetricsData] = useState({
        totalUsers: 0,
        activeUsers: 0,
        totalStreams: 0,
        revenue: 0,
        topArtist: "",
    });
    const [userGrowth, setUserGrowth] = useState([]);
    const [revenueBreakdown, setRevenueBreakdown] = useState([]);
    const [topStreamedSongs, setTopStreamedSongs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulating fetching data with a delay
        setTimeout(() => {
            if (data && data.metrics) {
                const { totalUsers, activeUsers, totalStreams, revenue, topArtist } = data.metrics;
                setMetricsData({ totalUsers, activeUsers, totalStreams, revenue, topArtist });
                setLoading(false); 
            }
            if( data && data.userGrowth ) {
                setUserGrowth(data.userGrowth);
            }
            if(data && data.revenueBreakdown) {
                setRevenueBreakdown(data.revenueBreakdown);
            }
            if(data && data.topStreamedSongs) {
                setTopStreamedSongs(data.topStreamedSongs);
            }
        }, 1000);
    }, []);

    return (
        <section className="bg-white dark:bg-gray-700">
            {/* Sidebar */}
            <Sidebar isOpen={openSidebar} onClose={() => setOpenSidebar(false)} />

            {/* Main Content */}
            <div className="flex-grow py-2 my-4">
                {loading ? <DashboardMetricsSkeleton /> : <DashboardMetrics data={metricsData} />}
            </div>
            <div className="my-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                {userGrowth && userGrowth.length > 0 && (
                    <div className="p-4 bg-white dark:bg-gray-800 shadow-lg rounded-xl">
                        <UserGrowthChart userGrowth={userGrowth} />
                    </div>
                )}
                {revenueBreakdown && revenueBreakdown.length > 0 && (
                    <div className="p-4 bg-white dark:bg-gray-800 shadow-lg rounded-xl">
                        <RevenueBreakdownChart revenueBreakdown={revenueBreakdown} />
                    </div>
                )}
                {topStreamedSongs && topStreamedSongs.length > 0 && (
                    <div className="p-4 bg-white dark:bg-gray-800 shadow-lg rounded-xl">
                        <TopStreamedSongsChart topStreamedSongs={topStreamedSongs} />
                    </div>
                )}
            </div>
        </section>
    );
};

export default Dashboard;
