import { useState, useEffect } from "react";
import { useAuthStore } from "../../stores/authStore";
import { getAllMyBlogs } from "../../services/operations/BlogAPI";
import BlogCard from "../DashBoard/BlogCard";
import { getRandomUnsplashImage } from "../../constants/RandomUnsplashImage";

const MyBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token } = useAuthStore();

    useEffect(() => {
        const fetchMyBlogs = async () => {
            setLoading(true);
            try {
                const response = await getAllMyBlogs(token);
                if (response?.data?.success) {
                    const blogsWithImages = await Promise.all(response.data.data.map(async (blog) => {
                        const coverImage = blog.cover_img ? blog.cover_img : await getRandomUnsplashImage();
                        return {
                            id: blog.blog_id,
                            title: blog.title,
                            description: blog.description,
                            likes: blog.likes_count,
                            isLiked: false,
                            category: blog.category || "Uncategorized",
                            coverImage: coverImage
                        };
                    }));
                    setBlogs(blogsWithImages);
                }
            } catch (error) {
                console.error("Error fetching my blogs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMyBlogs();
    }, [token]);

    return (
        <div className="min-h-screen bg-white dark:bg-[#121212]">
            <div className="max-w-3/4 mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <button 
                    className="mb-8 cursor-pointer text-gray-900 dark:text-white flex items-center hover:text-teal-600 dark:hover:text-teal-400 transition-colors" 
                    onClick={() => window.location.href = '/dashboard'}
                >
                    <span className="mr-2">←</span> Back to Dashboard
                </button>
                
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">My Blogs</h2>
                    <button 
                        className="hidden sm:inline-flex items-center p-2 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 dark:bg-teal-500 dark:hover:bg-teal-600"
                        onClick={() => window.location.href = '/publish'}
                    >
                        Publish New Blog
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {blogs.length > 0 ? (
                            blogs.map((blog) => (
                                <BlogCard 
                                    key={blog.id} 
                                    blog={blog}
                                />
                            ))
                        ) : (
                            <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    You haven't published any blogs yet.
                                </p>
                                <button 
                                    className="sm:hidden inline-flex items-center p-2 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 dark:bg-teal-500 dark:hover:bg-teal-600" 
                                    onClick={() => window.location.href = '/publish'}
                                >
                                    Publish a new blog
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBlogs;