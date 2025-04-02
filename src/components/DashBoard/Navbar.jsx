import React, { useState } from "react";
import { PlusCircle, Search, Pencil, LogOut } from "lucide-react";
import { useAuthStore } from "../../stores/authStore";
import { useNavigate } from "react-router-dom";
import ProfileModal from "../Profile/ProfileModal";

const Navbar = ({ searchQuery, setSearchQuery }) => {
    const { user, logout } = useAuthStore(); 
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <nav className="sticky top-0 z-50 bg-white/80 dark:bg-[#121212]/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-4 flex-1">
                        <div className="flex items-center">
                            <Pencil className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                            <span className="text-xl font-bold text-gray-900 dark:text-white ml-2">
                                BlogIt
                            </span>
                        </div>
                        <div className="w-[150px] sm:w-[300px] md:w-[400px] lg:max-w-lg">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search posts..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-[#2E313B] placeholder-gray-500 dark:placeholder-gray-50 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 dark:text-white"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="sm:hidden inline-flex items-center p-2 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                            <PlusCircle className="h-5 w-5" />
                        </button>
                        <button className="hidden sm:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 cursor-pointer"
                            onClick={() => navigate("/publish")}
                        >
                            <PlusCircle className="h-5 w-5 mr-2" />
                            Create Post
                        </button>
                        <div className="relative">
                            <button 
                                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                                onClick={toggleDropdown}
                            >
                                {user?.profile_pic ? (
                                    <img 
                                        src={user.profile_pic}
                                        alt={user.full_name}
                                        className="h-8 w-8 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="h-8 w-8 rounded-full bg-teal-600 flex items-center justify-center">
                                        <span className="text-white text-lg font-medium">
                                            {user?.full_name?.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                )}
                            </button>

                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 bg-white dark:bg-gray-700 divide-y divide-gray-100 dark:divide-gray-600 rounded-lg shadow-lg w-48">
                                    <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                        <div className="font-medium">{user?.full_name}</div>
                                    </div>
                                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                                        <li>
                                            <button 
                                                onClick={() => {
                                                    setIsProfileModalOpen(true);
                                                    setIsDropdownOpen(false);
                                                }}
                                                className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                                            >
                                                Profile
                                            </button>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                                                onClick={() => navigate("/myblogs")}
                                            >
                                                My Blogs
                                            </a>
                                        </li>
                                    </ul>
                                    <div className="py-2">
                                        <button 
                                            onClick={logout}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer"
                                        >
                                            <div className="flex justify-between items-center">
                                            Logout
                                            <span><LogOut size={18}/></span>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <ProfileModal 
                isOpen={isProfileModalOpen}
                onClose={() => setIsProfileModalOpen(false)}
            />
        </nav>
    );
};

export default Navbar;
