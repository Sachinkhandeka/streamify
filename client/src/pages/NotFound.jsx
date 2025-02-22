import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <h2 className="text-2xl font-semibold mb-2">Oops! Page Not Found</h2>
            <p className="text-lg text-gray-600 text-center dark:text-gray-400 mb-6">
                The page you're looking for might have been removed or is temporarily unavailable.
            </p>
            <Link to="/" className="px-6 py-3 text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center gap-2 transition-all">
                <FaHome /> Go Home
            </Link>
        </div>
    );
};

export default NotFound;
