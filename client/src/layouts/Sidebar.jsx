import React, { useEffect, useRef } from "react";
import { MdCancel } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { FaChartBar, FaMusic, FaDollarSign, FaUsers } from "react-icons/fa";
import { GiMicrophone } from "react-icons/gi";
import { toggleSidebar } from "../components/redux/slices/sidebarSlice";
import { useSelector, useDispatch } from "react-redux";

const navItems = [
    { name: "Dashboard", path: "/", icon: <FaChartBar /> },
    { name: "Top Artists", path: "/top-artists", icon: <GiMicrophone /> },
    { name: "Revenue", path: "/revenue", icon: <FaDollarSign /> },
    { name: "Users", path: "/users", icon: <FaUsers /> },
    { name : "Streams", path : "/streams", icon : <FaMusic /> }
];

export const Sidebar = () => {
    const isOpen = useSelector((state) => state.sidebar.isOpen);
    const dispatch = useDispatch();
    
    return (
    <aside className={`bg-gray-100 dark:bg-gray-900 z-10 h-full w-64 p-4 fixed top-0 left-0 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between text-lg font-bold pb-4 border-b border-gray-600">
            <span>MENU</span>
            <MdCancel size={24} className="cursor-pointer hover:text-gray-400" onClick={() => dispatch(toggleSidebar())} />
        </div>

        {/* Navigation Items */}
        <ul className="mt-4">
            {navItems.map((item, index) => (
                <li key={index} className="mb-2">
                    <NavLink 
                        to={item.path} 
                        className={({ isActive }) => 
                            `flex items-center gap-3 px-4 py-2 rounded-lg transition duration-300 ease-in-out 
                            ${isActive ? "bg-blue-500 text-white" : "hover:bg-gray-200 hover:dark:bg-gray-700"}`
                        }
                    >
                        {item.icon}
                        <span>{item.name}</span>
                    </NavLink>
                </li>
            ))}
        </ul>
    </aside>
    );
}
