import React, { useState, useEffect } from "react";
import data from "../api/data.js";
import StreamTable from "../components/dataTable/StreamTable";
import LoadingFallback from "../utils/LoadingFallback";

const Streams = () => {
    const [recentStreams, setRecentStreams] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulating fetching data with a delay
        setTimeout(() => {
            if (data && data.recentStreams) {
                setRecentStreams(data.recentStreams);
            }
            setLoading(false);
        }, 1000);
    }, []);
    return (
        <div className="p-1 bg-white dark:bg-gray-800 rounded-md h-screen">
            <h1 className="mb-4 p-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-4xl dark:text-white">
                Recent
                <span className="text-blue-600 dark:text-blue-500 ml-4">Streams</span>
            </h1>
            {loading ? (
                <LoadingFallback />
            ) : recentStreams.length > 0 ? (
                <div className="w-full" >
                    <StreamTable recentStreams={recentStreams} />
                </div>
            ) : (
                <p className="text-gray-600 dark:text-gray-300">No data available.</p>
            )}
        </div>
    )
}

export default Streams