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
    const authorName = typeof author === 'object' ? author.full_name : author;
    const authorInitial = authorName?.charAt(0).toUpperCase();

    return (
        <div className="w-full md:sticky md:top-4 md:self-start">
            <div className="flex items-center md:flex-col md:items-center gap-4 md:gap-0">
                <div className="flex-shrink-0">
                    {authorPic ? (
                        <img 
                            src={authorPic} 
                            alt="Author" 
                            className="w-12 h-12 md:w-24 md:h-24 rounded-full object-cover md:mb-3"
                            onError={(e) => {e.target.src = "https://via.placeholder.com/150"}}
                        />
                    ) : (
                        <div className="w-12 h-12 md:w-24 md:h-24 rounded-full bg-teal-600 flex items-center justify-center md:mb-3">
                            <span className="text-white text-lg md:text-3xl font-medium">
                                {authorInitial}
                            </span>
                        </div>
                    )}
                </div>
                <div className="flex flex-col min-w-0 md:items-center">
                    <p className="font-medium text-base md:text-lg mb-0.5 md:mb-2 dark:text-white truncate">
                        {authorName}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm md:mb-6">
                        {new Date(createdAt).toLocaleDateString()}
                    </p>
                </div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-3 md:p-4 rounded-lg w-full my-4 md:my-6">
                <h3 className="font-medium mb-2 dark:text-white text-sm md:text-base">About this blog</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">{description}</p>
            </div>
            
            <div className="flex gap-2 md:gap-3 w-full">
                <button 
                    onClick={handleLike}
                    className={`flex items-center justify-center gap-1.5 py-1.5 px-2.5 border dark:border-gray-700 rounded-full transition cursor-pointer ${
                        isLiked ? 'bg-red-100 dark:bg-red-900/30' : 'hover:bg-red-50 dark:hover:bg-red-900/30'
                    }`}
                >
                    <span className="text-red-500">❤️</span> 
                    <span className="dark:text-gray-200 text-sm">{likeCount || 0}</span>
                </button>
                
                <button 
                    onClick={scrollToComments}
                    className="flex items-center justify-center gap-1.5 py-1.5 px-2.5 border dark:border-gray-700 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition cursor-pointer"
                >
                    <span>💬</span>
                    <span className="dark:text-gray-200 text-sm">{commentsCount || 0}</span>
                </button>
            </div>
        </div>
    );
};

export default BlogAuthorInfo; 