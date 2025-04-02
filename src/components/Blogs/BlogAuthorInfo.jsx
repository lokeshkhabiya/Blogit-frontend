import React from "react";

const BlogAuthorInfo = ({ 
    author, 
    authorPic, 
    createdAt, 
    description, 
    likeCount, 
    isLiked, 
    commentsCount,
    handleLike, 
    scrollToComments 
}) => {
    return (
        <div className="w-full md:w-1/4 md:order-last md:ml-8 flex flex-col items-center md:sticky md:top-4 md:self-start mb-8 md:mb-0">
            {authorPic && (
                <img 
                    src={authorPic} 
                    alt="Author" 
                    className="w-24 h-24 rounded-full object-cover mb-3"
                    onError={(e) => {e.target.src = "https://via.placeholder.com/150"}}
                />
            )}
            <p className="font-medium text-lg mb-2 dark:text-white">{typeof author === 'object' ? author.full_name : author}</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">{new Date(createdAt).toLocaleDateString()}</p>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg w-full mb-6">
                <h3 className="font-medium mb-2 dark:text-white">About this blog</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">{description}</p>
            </div>
            
            <div className="flex gap-3 w-full justify-center md:justify-start">
                <button 
                    onClick={handleLike}
                    className={`flex items-center justify-center gap-2 py-2 px-2 border dark:border-gray-700 rounded-full transition cursor-pointer ${
                        isLiked ? 'bg-red-100 dark:bg-red-900/30' : 'hover:bg-red-50 dark:hover:bg-red-900/30'
                    }`}
                >
                    <span className="text-red-500">❤️</span> 
                    <span className="dark:text-gray-200">{likeCount || 0}</span>
                </button>
                
                <button 
                    onClick={scrollToComments}
                    className="flex items-center justify-center gap-2 py-2 px-2 border dark:border-gray-700 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition cursor-pointer"
                >
                    <span>💬</span>
                    <span className="dark:text-gray-200">{commentsCount || 0}</span>
                </button>
            </div>
        </div>
    );
};

export default BlogAuthorInfo; 