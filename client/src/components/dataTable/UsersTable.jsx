import React, { useState } from "react";
import { FaSearch, FaSort } from "react-icons/fa";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import moment from "moment";

const UsersTable = ({ usersData }) => {
    const [search, setSearch] = useState('');
    const [sortColumn, setSortColumn] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; 
    
    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortOrder('asc');
        }
    };

    // Filtering users based on search query and subscription type
    const filteredUsers = usersData.filter((user) =>
        (user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.username.toLowerCase().includes(search.toLowerCase()))
    );

    const sortedUsers = [...filteredUsers].sort((a, b) => {
        if (!sortColumn) return 0;
        return sortOrder === 'asc' 
            ? a[sortColumn] > b[sortColumn] ? 1 : -1 
            : a[sortColumn] < b[sortColumn] ? 1 : -1;
    });

    // Calculate total pages
    const totalPages = Math.ceil(sortedUsers.length / itemsPerPage); 

    // Slice data for the current page
    const currentUsers = sortedUsers.slice(
        (currentPage - 1) * itemsPerPage, currentPage * itemsPerPage
    );

    // Handle Page Change
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    // Highlight search term in results
    const highlightMatch = (text) => {
        if (!search) return text;
        const regex = new RegExp(`(${search})`, "gi");
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
            <div className="p-4 bg-white rounded-lg shadow-lg dark:bg-gray-800">
                {/* Search Input */}
                <div className="flex justify-end mb-4">
                    <div className="flex items-center">
                        <FaSearch className="text-gray-400 mr-2" />
                        <input
                            type="text"
                            placeholder="Search user..."
                            className="px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 dark:bg-gray-800 dark:text-white"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                {/* Users Table */}
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400">
                            <tr>
                                {['id','name', 'email', 'username', 'joinedDate', 'subscriptionType', 'lastActive', 'totalStreams', 'country'].map(col => (
                                    <th key={col} className="px-4 py-2 cursor-pointer" onClick={() => handleSort(col)}>
                                        {col.charAt(0).toUpperCase() + col.slice(1)} <FaSort className="inline ml-1" />
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.length > 0 ? currentUsers.map(user => (
                                <tr key={user.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <td className="px-4 py-2">{user.id}</td>
                                    <td className="px-4 py-2">{highlightMatch(user.name)}</td>
                                    <td className="px-4 py-2">{highlightMatch(user.email)}</td>
                                    <td className="px-4 py-2">{highlightMatch(user.username)}</td>
                                    <td className="px-4 py-2">{moment(user.joinedDate).fromNow()}</td>
                                    <td className="px-4 py-2">{user.subscriptionType}</td>
                                    <td className="px-4 py-2">{moment(user.lastActive).fromNow()}</td>
                                    <td className="px-4 py-2">{user.totalStreams}</td>
                                    <td className="px-4 py-2">{user.country}</td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-4">No users found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
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

export default UsersTable;
