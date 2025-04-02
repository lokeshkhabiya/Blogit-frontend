import { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import { getAllBlogsBulk } from "../../services/operations/BlogAPI";
import { useAuthStore } from "../../stores/authStore";
import { getRandomUnsplashImage } from "../../constants/RandomUnsplashImage";

const BlogList = ({ selectedCategory, searchQuery }) => {
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const { token } = useAuthStore();
    const blogsPerPage = 5;

    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true);
            try {
                const response = await getAllBlogsBulk(currentPage, blogsPerPage, token);
                if (response?.data?.success) {
                    const blogsWithImages = await Promise.all(response.data.data.blogs.map(async (blog) => {
                        const coverImage = blog.cover_img ? blog.cover_img : await getRandomUnsplashImage();
                        return {
                            id: blog.blog_id,
                            title: blog.title,
                            description: blog.description,
                            likes: blog.likes_count,
                            isLiked: blog.isLiked || false,
                            category: blog.category || "Uncategorized",
                            coverImage: coverImage
                        };
                    }));
                    setBlogs(blogsWithImages);
                    setTotalPages(response.data.data.totalPages);
                }
            } catch (error) {
                console.error("Error fetching blogs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, [currentPage, token]);

    const handleLike = async (blog_id) => {
        setBlogs(
            blogs.map((blog) => {
                if (blog.id === blog_id) {
                    return {
                        ...blog,
                        likes: blog.isLiked ? blog.likes - 1 : blog.likes + 1,
                        isLiked: !blog.isLiked,
                    };
                }
                return blog;
            })
        );
    };

    const filteredBlogs = blogs.filter((blog) => {
        const matchesCategory =
            selectedCategory === "All" || blog.category === selectedCategory;
        const matchesSearch =
            blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="max-w-3/4 mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
                </div>
            ) : (
                <>
                    <div className="space-y-6">
                        {filteredBlogs.map((blog) => (
                            <BlogCard 
                                key={blog.id} 
                                blog={blog} 
                                onLike={handleLike} 
                            />
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    <div className="mt-8 flex justify-center space-x-4">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 rounded-md ${
                                currentPage === 1
                                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                    : 'bg-teal-500 text-white hover:bg-teal-600'
                            }`}
                        >
                            Previous
                        </button>
                        <span className="px-4 py-2 text-gray-700 dark:text-gray-300">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className={`px-4 py-2 rounded-md ${
                                currentPage === totalPages
                                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                    : 'bg-teal-500 text-white hover:bg-teal-600'
                            }`}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default BlogList;
