import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
    return (
        <Link
            to={`/blog/${blog.id}`}
            className="block bg-white dark:bg-gray-800/50 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
            <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3">
                    <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="w-full h-48 md:h-64 object-cover"
                    />
                </div>
                <div className="md:w-2/3 p-6">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-teal-600 dark:text-teal-400">
                            {blog.category}
                        </span>
                        <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-300">
                            <Heart
                                className={`h-5 w-5 ${
                                    blog.isLiked
                                        ? "fill-current text-teal-600 dark:text-teal-400"
                                        : ""
                                }`}
                            />
                            <span>{blog.likes}</span>
                        </div>
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                        {blog.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-lg">
                        {blog.description}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default BlogCard; 