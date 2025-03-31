import React from "react";
import { Sun, Moon, Pencil, Sparkles, Users, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";

const LandingPage = () => {
    const [isDarkMode, setIsDarkMode] = React.useState(false);
	const { isAuthenticated } = useAuthStore();
    const navigate = useNavigate();

    const onToggleDarkMode = () => {
        setIsDarkMode((prev) => !prev);
    };

    return (
        <div className="min-h-screen bg-white dark:bg-[#121212] transition-colors duration-200">
            {/* Navbar */}
            <nav className="fixed w-full bg-white/80 dark:bg-[#121212]/80 backdrop-blur-sm z-50 border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <Pencil className="h-8 w-8 text-teal-600 dark:text-teal-400" />
                            <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                                BlogIt
                            </span>
                        </div>
                        <div className="flex items-center space-x-2 sm:space-x-4">
                            <button 
                                className="px-3 sm:px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors whitespace-nowrap cursor-pointer"
                                onClick={() => navigate('/signin')}
                            >
                                Login
                            </button>
                            <button className="px-3 sm:px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap cursor-pointer"
								onClick={() => navigate('/signup')}
							>
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-teal-50 to-white dark:from-[#121212] dark:to-[#121212]">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white">
                            Write. Share. Inspire.
                        </h1>
                        <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            Transform your ideas into beautifully crafted blog
                            posts. Join thousands of writers and creators on
                            BlogIt.
                        </p>
                        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                            <button className="px-8 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors w-full sm:w-auto cursor-pointer"
								onClick={() => isAuthenticated ? navigate('/dashboard') : navigate('/signin')}
							>
                                Start Writing
                            </button>
                        </div>
                    </div>
                    <div className="mt-20">
                        <img
                            src="https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1200&q=80"
                            alt="Writing Illustration"
                            className="rounded-xl shadow-2xl mx-auto"
                        />
                    </div>
                </div>
            </div>

            {/* Features Grid */}
            <div className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#121212]">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:shadow-lg transition-shadow">
                            <Sparkles className="h-12 w-12 text-teal-600 dark:text-teal-400 mb-4" />
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                Beautiful Editor
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Write and format your content with our
                                intuitive, distraction-free editor.
                            </p>
                        </div>
                        <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:shadow-lg transition-shadow">
                            <Users className="h-12 w-12 text-teal-600 dark:text-teal-400 mb-4" />
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                Growing Community
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Connect with readers and writers who share your
                                interests and passions.
                            </p>
                        </div>
                        <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:shadow-lg transition-shadow">
                            <Zap className="h-12 w-12 text-teal-600 dark:text-teal-400 mb-4" />
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                Powerful Analytics
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Gain insights into your audience with detailed
                                analytics and engagement metrics.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Pencil className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                            <span className="ml-2 text-lg font-semibold text-gray-900 dark:text-white">
                                BlogIt
                            </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400">
                            © 2025 BlogIt. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
