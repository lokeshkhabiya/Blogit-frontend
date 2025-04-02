import React, { useState, useEffect } from "react";
import { useAuthStore } from "../../stores/authStore";
import { addAComment, getAllComments } from "../../services/operations/CommentAPI";

const BlogComments = ({ blog_id, commentsCount: initialCount }) => {

    const { user, token } = useAuthStore(); 
    const [newComment, setNewComment] = useState("");
    const [comments, setComments] = useState([]);
    const [commentsCount, setCommentsCount] = useState(initialCount);
    
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await getAllComments(blog_id, token);
                if (response && response.data) {
                    setComments(response.data.comments);
                    setCommentsCount(response.data.comments.length);
                }
            } catch (error) {
                console.log("Error fetching comments:", error);
            }
        };

        fetchComments();
    }, [blog_id, token]);

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        
        const timestamp = new Date();
        
        try {
            const response = await addAComment(blog_id, newComment, timestamp, token);
            
            if (response && response.data) {
                const comment = {
                    full_name: user.full_name,
                    profile_pic: user.profile_pic,
                    content: newComment,
                    timestamp: timestamp
                };

                setComments(prevComments => [comment, ...prevComments]);
                setCommentsCount(prevCount => prevCount + 1);
                setNewComment("");
            }
        } catch (error) {
            console.log("Error submitting comment:", error);
        }
    };

    console.log(comments);
    return (
        <div id="comments-section" className="w-full md:w-[65%] mx-auto mt-12 mb-12 px-4 md:px-8 lg:px-16">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">Comments ({commentsCount})</h2>

            {/* Comment input section */}
            <div className="mb-8">
                <form onSubmit={handleSubmitComment} className="flex flex-col space-y-4">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write a comment..."
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white resize-none"
                        rows="3"
                    />
                    <button
                        type="submit"
                        disabled={!newComment.trim()}
                        className={`px-6 py-2 text-white rounded-lg transition-colors w-fit self-end ${
                            newComment.trim() 
                                ? 'bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500' 
                                : 'bg-gray-400 cursor-not-allowed'
                        }`}
                    >
                        Post Comment
                    </button>
                </form>
            </div>

            {/* Comments list */}
            {comments.length > 0 ? (
                <div className="space-y-6">
                    {comments.map((comment, index) => (
                        <div key={index} className="border-t dark:border-gray-700 pt-4">
                            <div className="flex items-center mb-2">
                                {comment.profile_pic ? (
                                    <img 
                                        src={comment.profile_pic} 
                                        alt={comment.full_name}
                                        className="h-8 w-8 rounded-full object-cover mr-2"
                                    />
                                ) : (
                                    <div className="h-8 w-8 rounded-full bg-teal-600 flex items-center justify-center mr-2">
                                        <span className="text-white text-lg font-medium">
                                            {comment.full_name?.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                )}
                                <span className="font-semibold dark:text-white">{comment.full_name}</span>
                                <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                                    {new Date(comment.timestamp).toLocaleString()}
                                </span>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="border-t dark:border-gray-700 pt-4">
                    <p className="text-gray-500 dark:text-gray-400">No comments yet.</p>
                </div>
            )}
        </div>
    );
};

export default BlogComments;