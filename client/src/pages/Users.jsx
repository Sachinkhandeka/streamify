import React, { useState, useEffect } from 'react';
import data from '../api/data.js';
import Table from '../components/dataTable/Table';
import LoadingFallback from '../utils/LoadingFallback';

const Users = () => {
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
        <div className="p-4 bg-white dark:bg-gray-800 shadow-lg rounded-xl min-h-screen">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Users</h2>
        </div>
    );
};

export default Users;
