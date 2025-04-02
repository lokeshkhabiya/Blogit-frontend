import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getBlog, likeUnlikeBlog } from "../../services/operations/BlogAPI";
import { useAuthStore } from "../../stores/authStore";
import { UNSPLASH_API_KEY } from "../../constants/ApiKeys";
import axios from "axios";
import BlogAuthorInfo from "./BlogAuthorInfo";
import BlogComments from "./BlogComments";
import { getRandomUnsplashImage } from "../../constants/RandomUnsplashImage";

const Blog = () => {
	const location = useLocation();
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
                    
                    <div className="flex flex-col md:flex-row justify-center px-4 md:px-8 lg:px-16 py-8 max-w-[1400px] mx-auto">
                        {/* Author Info Component */}
                        <BlogAuthorInfo 
                            author={blog.author}
                            authorPic={blog.author_pic}
                            createdAt={blog.created_at}
                            description={blog.description}
                            likeCount={likeCount}
                            isLiked={isLiked}
                            commentsCount={blog.comments_count}
                            handleLike={handleLike}
                            scrollToComments={scrollToComments}
                        />
                        
                        <div className="w-full md:w-[75%] mx-auto">
                            <h1 className="text-4xl font-bold mb-6 dark:text-white">{blog.title}</h1>
                            <div className="w-full h-px bg-gray-200 dark:bg-gray-700 mb-6"></div>
                            <div 
                                className="prose prose-lg max-w-none dark:prose-invert dark:text-white [&>p]:dark:text-white [&>h1]:dark:text-white [&>h2]:dark:text-white [&>h3]:dark:text-white [&>h4]:dark:text-white [&>ul]:dark:text-white [&>ol]:dark:text-white [&>li]:dark:text-white [&>blockquote]:dark:text-white [&>a]:dark:text-blue-400" 
                                dangerouslySetInnerHTML={{ __html: blog.htmlContent }}
                            ></div>
                        </div>
                    </div>
                    
                    {/* Comments Component */}
                    {blogId && blog.comments_count !== undefined && (
                        <BlogComments 
                            blog_id={blogId}
                            commentsCount={blog.comments_count}
                            comments={[]}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default Blog;