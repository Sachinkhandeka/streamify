import React, { useState } from "react";
import moment from "moment";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { FaSort, FaSortUp, FaSortDown, FaSearch } from "react-icons/fa";

const StreamTable = ({ recentStreams }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
    const [filterQuery, setFilterQuery] = useState("");

    // Handle sorting
    const handleSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    // Sort data based on current configuration
    const sortedData = [...recentStreams].sort((a, b) => {
        if (!sortConfig.key) return 0;
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (sortConfig.key === "dateStreamed") {
            aValue = new Date(aValue);
            bValue = new Date(bValue);
        }

        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
    });

    // Filter data
    const filteredData = sortedData.filter((stream) =>
        stream.song.toLowerCase().includes(filterQuery.toLowerCase()) ||
        stream.artist.toLowerCase().includes(filterQuery.toLowerCase())
    );

    // Calculate total pages
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    // Slice data for the current page
    const paginatedStreams = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Handle page change
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    // Get sort icon
    const getSortIcon = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === "asc" ? <FaSortUp /> : <FaSortDown />;
        }
        return <FaSort />;
    };

    // Highlight search term in results
    const highlightMatch = (text) => {
        if (!filterQuery) return text;
        const regex = new RegExp(`(${filterQuery})`, "gi");
        return text.split(regex).map((part, index) =>
            regex.test(part) ? (
                <span key={index} className="bg-yellow-200 text-black">
                    {part}
                </span>
            ) : (
                part
            )
        );
    };

    return (
        <>
            {/* Filter Input */}
            <div className="flex justify-end mb-4">
                <div className="mb-4 flex items-center">
                    <FaSearch className="text-gray-400 mr-2" />
                    <input
                        type="text"
                        placeholder="Filter by song or artist..."
                        className="px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 dark:bg-gray-800 dark:text-white"
                        value={filterQuery}
                        onChange={(e) => setFilterQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="w-full overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400">
                        <tr>
                            <th className="px-6 py-3">Song Name</th>
                            <th className="px-6 py-3">Artist</th>
                            <th 
                                className="px-6 py-3 cursor-pointer"
                                onClick={() => handleSort("dateStreamed")}
                            >
                                <div className="flex items-center gap-2" >
                                    <span>Date Streamed</span> {getSortIcon("dateStreamed")}
                                </div>
                            </th>
                            <th 
                                className="px-6 py-3 cursor-pointer"
                                onClick={() => handleSort("streamCount")}
                            >
                                <div className="flex items-center gap-2" >
                                    <span>Stream Count</span> {getSortIcon("streamCount")}
                                </div>
                            </th>
                            <th className="px-6 py-3">User ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedStreams.length > 0 ? (
                            paginatedStreams.map((stream, index) => (
                                <tr
                                    key={index}
                                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                                >
                                    <td className="px-6 py-4">{highlightMatch(stream.song)}</td>
                                    <td className="px-6 py-4">{highlightMatch(stream.artist)}</td>
                                    <td className="px-6 py-4">{moment(stream.dateStreamed).fromNow()}</td>
                                    <td className="px-6 py-4">{stream.streamCount}</td>
                                    <td className="px-6 py-4">{stream.userId}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-6 py-4 text-center">
                                    No recent streams available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center mt-4 space-x-2">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-2 py-1 rounded-md ${
                            currentPage === 1
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                    >
                        <MdNavigateBefore />
                    </button>
                    <span className="text-gray-700 text-xs font-bold dark:text-gray-300">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-2 py-1 rounded-md ${
                            currentPage === totalPages
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                    >
                        <MdNavigateNext />
                    </button>
                </div>
            )}
        </>
    );
};

export default StreamTable;
