import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getBlog } from "../../services/operations/BlogAPI";
import { useAuthStore } from "../../stores/authStore";
import { UNSPLASH_API_KEY } from "../../constants/ApiKeys";
import axios from "axios";

const Blog = () => {
	const location = useLocation();
	const { token } = useAuthStore();
	const [blog, setBlog] = useState();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const getBlogData = async () => {
			const blogId = location.pathname.split('/').pop();
			try {
				const response = await getBlog(blogId, token);
				if (response && response.data) {
					const blogData = response.data.data;
					const coverImage = blogData.cover_img ? blogData.cover_img : await getRandomUnsplashImage();
					setBlog({ ...blogData, cover_img: coverImage });
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

	const getRandomUnsplashImage = async () => {
		try {
			const response = await axios.get(`https://api.unsplash.com/photos/random?orientation=landscape&client_id=${UNSPLASH_API_KEY}`);
			return response.data.urls.regular;
		} catch (error) {
			console.error("Error while fetching random Unsplash image: ", error);
			return "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80";
		}
	};

    const scrollToComments = () => {
        document.getElementById('comments-section').scrollIntoView({ behavior: 'smooth' });
    };

    const handleLike = () => {
        // TODO: Implement like functionality
        console.log("Liked the blog");
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
                    
                    <div className="flex flex-col md:flex-row justify-center px-4 md:px-8 lg:px-16 py-8 max-w-[1400px] mx-auto">
                        {/* Mobile Author info section - right below cover image on mobile */}
                        <div className="w-full md:w-1/4 md:order-last md:ml-8 flex flex-col items-center md:sticky md:top-4 md:self-start mb-8 md:mb-0">
                            {blog.author_pic && (
                                <img 
                                    src={blog.author_pic} 
                                    alt="Author" 
                                    className="w-24 h-24 rounded-full object-cover mb-3"
                                    onError={(e) => {e.target.src = "https://via.placeholder.com/150"}}
                                />
                            )}
                            <p className="font-medium text-lg mb-2 dark:text-white">{typeof blog.author === 'object' ? blog.author.full_name : blog.author}</p>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">{new Date(blog.created_at).toLocaleDateString()}</p>
                            
                            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg w-full mb-6">
                                <h3 className="font-medium mb-2 dark:text-white">About this blog</h3>
                                <p className="text-sm text-gray-700 dark:text-gray-300">{blog.description}</p>
                            </div>
                            
                            <div className="flex gap-3 w-full justify-center md:justify-start">
                                <button 
                                    onClick={handleLike}
                                    className="flex items-center justify-center gap-2 py-2 px-2 border dark:border-gray-700 rounded-full hover:bg-red-50 dark:hover:bg-red-900/30 transition cursor-pointer"
                                >
                                    <span className="text-red-500">❤️</span> 
                                    <span className="dark:text-gray-200">{blog.likes_count || 0}</span>
                                </button>
                                
                                <button 
                                    onClick={scrollToComments}
                                    className="flex items-center justify-center gap-2 py-2 px-2 border dark:border-gray-700 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition cursor-pointer"
                                >
                                    <span>💬</span>
                                    <span className="dark:text-gray-200">{blog.comments_count || 0}</span>
                                </button>
                            </div>
                        </div>
                        
                        <div className="w-full md:w-[75%] mx-auto">
                            <h1 className="text-4xl font-bold mb-6 dark:text-white">{blog.title}</h1>
                            <div className="w-full h-px bg-gray-200 dark:bg-gray-700 mb-6"></div>
                            <div 
                                className="prose prose-lg max-w-none dark:prose-invert dark:text-white [&>p]:dark:text-white [&>h1]:dark:text-white [&>h2]:dark:text-white [&>h3]:dark:text-white [&>h4]:dark:text-white [&>ul]:dark:text-white [&>ol]:dark:text-white [&>li]:dark:text-white [&>blockquote]:dark:text-white [&>a]:dark:text-blue-400" 
                                dangerouslySetInnerHTML={{ __html: blog.htmlContent }}
                            ></div>
                        </div>
                    </div>
                    
                    {/* Comments section - adjust width to match content */}
                    <div id="comments-section" className="w-full md:w-[65%] mx-auto mt-12 mb-12 px-4 md:px-8 lg:px-16">
                        <h2 className="text-2xl font-bold mb-6 dark:text-white">Comments</h2>
                        {/* TODO: Implement comments rendering */}
                        <div className="border-t dark:border-gray-700 pt-4">
                            <p className="text-gray-500 dark:text-gray-400">No comments yet.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Blog;