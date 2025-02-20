import React from "react";
import { toggleSidebar } from "../components/redux/slices/sidebarSlice";
import { IoMenuOutline } from "react-icons/io5";
import { GiMusicSpell } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { RxMoon, RxSun } from "react-icons/rx";
import { toggleTheme } from "../components/redux/slices/themeSlice";
import { Link } from "react-router-dom"

const Navbar = () => {
    const { theme } = useSelector(state => state.theme);
    const dispatch = useDispatch();

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900 shadow-md">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div className="flex items-center gap-3">
                    {/* Sidebar Toggle Button */}
                    <IoMenuOutline 
                        size={28} 
                        className="cursor-pointer text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition duration-200" 
                        onClick={() => dispatch(toggleSidebar())} 
                    />

                    {/* Logo and Branding */}
                    <Link to="/" className="flex items-center gap-2 rtl:space-x-reverse group">
                        <GiMusicSpell 
                            size={30} 
                            className="text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-300"
                        />
                        <span className="self-center text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-wide group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                            Streamify
                        </span>
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    {/* Theme Toggle Button */}
                    <button 
                        className="w-10 h-10 cursor-pointer flex items-center justify-center rounded-full transition-all duration-300 
                            bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800 
                            border border-gray-300 dark:border-gray-500 shadow-sm"
                        onClick={() => dispatch(toggleTheme())}
                        aria-label="Toggle Theme"
                    >
                        {theme === "light" ? (
                            <RxMoon className="text-blue-400 text-xl" />
                        ) : (
                            <RxSun className="text-yellow-400 text-xl" />
                        )}
                    </button>

                    {/* User Avatar Placeholder */}
                    <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 cursor-pointer">
                        <svg 
                            className="absolute w-12 h-12 text-gray-400 -left-1" 
                            fill="currentColor" 
                            viewBox="0 0 20 20" 
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                        </svg>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
