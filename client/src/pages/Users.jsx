import React, { useState, useEffect } from "react";
import LoadingFallback from "../utils/LoadingFallback";
import UsersTable from "../components/dataTable/UsersTable";
import usersData from "../api/users";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulating fetching data with a delay
        setTimeout(() => {
            setUsers(usersData);
            setLoading(false);
        }, 1000);
    }, []);

    return (
        <div className="p-1 bg-white dark:bg-gray-800 rounded-md h-screen">
            <h1 className="mb-4 p-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-4xl dark:text-white">
                Total
                <span className="text-blue-600 dark:text-blue-500 ml-4">Users</span>
            </h1>
            {loading ? (
                <LoadingFallback />
            ) : usersData.length > 0 ? (
                <div className="w-full" >
                    <UsersTable usersData={users} />
                </div>
            ) : (
                <p className="text-gray-600 dark:text-gray-300">No data available.</p>
            )}
        </div>
    );
};

export default Users;
