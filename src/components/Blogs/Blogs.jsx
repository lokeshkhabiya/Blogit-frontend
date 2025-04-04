import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getBlog, likeUnlikeBlog } from "../../services/operations/BlogAPI";
import { useAuthStore } from "../../stores/authStore";
import BlogAuthorInfo from "./BlogAuthorInfo";
import BlogComments from "./BlogComments";
import { getRandomUnsplashImage } from "../../constants/RandomUnsplashImage";
import { ArrowLeft } from "lucide-react";

const Blog = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { token } = useAuthStore();
	const [blog, setBlog] = useState();
	const [loading, setLoading] = useState(true);
	const [likeCount, setLikeCount] = useState();
	const [isLiked, setIsLiked] = useState(false);
	const blogId = location.pathname.split('/').pop();

	useEffect(() => {
		const getBlogData = async () => {
			const blogId = location.pathname.split('/').pop();
			try {
				const response = await getBlog(blogId, token);
				if (response && response.data) {
					const blogData = response.data.data;
					const coverImage = blogData.cover_img ? blogData.cover_img : await getRandomUnsplashImage();
					setBlog({ ...blogData, cover_img: coverImage });
					setLikeCount(blogData.likes_count);
					setIsLiked(blogData.isLiked);
				} else {
					throw new Error("Invalid response");
				}
			} catch (error) {
				console.error("Error while fetching blog: ", error);
			} finally {
				setLoading(false);
			}
		};

		getBlogData();
	}, [location.pathname, token]);

    const scrollToComments = () => {
        document.getElementById('comments-section').scrollIntoView({ behavior: 'smooth' });
    };

    const handleLike = async () => {
        try {
            const blogId = location.pathname.split('/').pop();
            await likeUnlikeBlog(blogId, token);
            setIsLiked(!isLiked);
            // Update like count immediately based on isLiked state
            setLikeCount(prevCount => !isLiked ? prevCount + 1 : prevCount - 1);
            setBlog(prev => ({...prev, likes_count: !isLiked ? prev.likes_count + 1 : prev.likes_count - 1}));
        } catch (error) {
            console.error("Error while liking/unliking blog: ", error);
        }
    };

    return (
        <div className="min-h-screen dark:bg-[#121212]">
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <p className="text-xl dark:text-gray-200">Loading...</p>
                </div>
            ) : (
                <div className="flex flex-col">
                    {/* Cover image - full width, 20-25% of page height */}
                    {blog.cover_img && (
                        <div className="w-full h-[30vh]">
                            <img 
                                src={blog.cover_img} 
                                alt={blog.title} 
                                className="w-full h-full object-cover"
                                onError={(e) => {e.target.src = "https://via.placeholder.com/1200x600"}}
                            />
                        </div>
                    )}
                    <div className="px-4 md:px-8 lg:px-16 pt-4">
                        <button
                            onClick={() => navigate("/dashboard")}
                            className="flex items-center text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Back to Dashboard
                        </button>
                    </div>
                    
                    <div className="flex flex-col md:flex-row px-4 md:px-8 lg:px-16 py-4 md:py-8 max-w-full md:max-w-[1400px] mx-auto w-full overflow-hidden">
                        {/* Mobile Title - Only visible on mobile */}
                        <div className="md:hidden w-full mb-4">
                            <h1 className="text-2xl sm:text-3xl font-bold mb-3 dark:text-white">{blog.title}</h1>
                            <div className="w-full h-px bg-gray-200 dark:bg-gray-700"></div>
                        </div>

                        {/* Author Info Component - Reordered for mobile */}
                        <div className="w-full md:w-1/4 md:order-last md:ml-8">
                            <BlogAuthorInfo 
                                author={blog.author}
                                authorPic={blog.author_pic}
                                createdAt={blog.published_on}
                                description={blog.description}
                                likeCount={likeCount}
                                isLiked={isLiked}
                                commentsCount={blog.comments_count}
                                handleLike={handleLike}
                                scrollToComments={scrollToComments}
                            />
                        </div>
                        
                        <div className="w-full md:w-[75%] mt-6 md:mt-0">
                            {/* Desktop Title - Hidden on mobile */}
                            <div className="hidden md:block">
                                <h1 className="text-4xl font-bold mb-6 dark:text-white">{blog.title}</h1>
                                <div className="w-full h-px bg-gray-200 dark:bg-gray-700 mb-6"></div>
                            </div>
                            
                            <div 
                                className="prose prose-sm md:prose-lg max-w-none dark:prose-invert dark:text-white [&>p]:dark:text-white [&>h1]:dark:text-white [&>h2]:dark:text-white [&>h3]:dark:text-white [&>h4]:dark:text-white [&>ul]:dark:text-white [&>ol]:dark:text-white [&>li]:dark:text-white [&>blockquote]:dark:text-white [&>a]:dark:text-blue-400 overflow-hidden" 
                                dangerouslySetInnerHTML={{ __html: blog.htmlContent }}
                            ></div>
                        </div>
                    </div>
                    
                    {/* Comments Component */}
                    {blogId && blog.comments_count !== undefined && (
                        <div className="px-4 md:px-0">
                            <BlogComments 
                                blog_id={blogId}
                                commentsCount={blog.comments_count}
                                comments={[]}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Blog;