import React, { useEffect, useState } from "react";
import { Sidebar } from "../layouts/Sidebar";
import DashboardMetrics from "../components/metrics/DashboardMetrics";
import DashboardMetricsSkeleton from "../skeleton/DashboardMetricsSkeleton";
import data from "../api/data.js";
import artistsData from "../api/artists.js";
import revenueData from "../api/revenue";
import UserGrowthChart from "../components/charts/UserGrowthChart.jsx";
import RevenueBreakdownChart from "../components/charts/RevenueBreakdownChart.jsx";
import TopStreamedSongsChart from "../components/charts/TopStreamedSongsChart.jsx";
import { Link } from "react-router-dom";
import StreamTable from "../components/dataTable/StreamTable.jsx";
import ArtistsTable from "../components/dataTable/ArtistsTable.jsx";
import RevenueTable from "../components/dataTable/RevenueTable.jsx";

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
    const [recentStreams, setRecentStreams] = useState([]);
    const [artists, setArtists] = useState([]);
    const [revenue, setRevenue] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulating fetching data with a delay
        setTimeout(() => {

            setRevenue(revenueData);
            setArtists(artistsData);

            if (data && data.metrics) {
                const { totalUsers, activeUsers, totalStreams, revenue, topArtist } = data.metrics;
                setMetricsData({ totalUsers, activeUsers, totalStreams, revenue, topArtist }); 
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
            if(data && data.recentStreams) {
                setRecentStreams(data.recentStreams);
            }
            setLoading(false);
        }, 1000);
    }, []);

    return (
        <section className="bg-white dark:bg-gray-700 p-1 min-h-screen">
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
            { recentStreams && recentStreams.length > 0 && (
                <div className="p-4 bg-white dark:bg-gray-800 shadow-lg rounded-xl w-full">
                    <h1 className="mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-4xl dark:text-white">
                        Recent
                        <span className="text-blue-600 dark:text-blue-500 ml-4">Streams</span>
                    </h1>
                    <StreamTable recentStreams={recentStreams.slice(0,5)} />
                    <div className="text-right mt-2">
                        <Link 
                            to="/streams"
                            className="text-blue-500 hover:underline text-xs hover:font-bold"
                        >
                            View More →
                        </Link>
                    </div>
                </div>
            ) }
            <div className="p-4 bg-white dark:bg-gray-800 shadow-lg rounded-xl w-full my-4">
                <h1 className="mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-4xl dark:text-white">
                    Top
                    <span className="text-blue-600 dark:text-blue-500 ml-4">Artists</span>
                </h1>
                <ArtistsTable artistsData={artists.slice(0, 5)} />
                <div className="text-right mt-2">
                    <Link 
                        to="/top-artists"
                        className="text-blue-500 hover:underline text-xs hover:font-bold"
                    >
                        View More →
                    </Link>
                </div>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 shadow-lg rounded-xl w-full my-4">
                <h1 className="mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-4xl dark:text-white">
                    Total
                    <span className="text-blue-600 dark:text-blue-500 ml-4">Revenue</span>
                </h1>
                <RevenueTable revenueData={revenue.slice(0, 5)} />
                <div className="text-right mt-2">
                    <Link 
                        to="/revenue"
                            className="text-blue-500 hover:underline text-xs hover:font-bold"
                    >
                        View More →
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;
