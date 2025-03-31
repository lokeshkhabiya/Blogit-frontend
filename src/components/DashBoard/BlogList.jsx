import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const sampleBlogs = [
    {
        id: 1,
        title: "The Future of Web Development",
        description: 
            "Exploring the latest trends in web development, including WebAssembly, Edge Computing, and Progressive Web Apps. Learn how these technologies are shaping the future of the web.",
        category: "Programming",
        coverImage:
            "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800&h=400",
        likes: 156,
        isLiked: false,
    },
    {
        id: 2, 
        title: "Healthy Mediterranean Diet Recipes",
        description:
            "Discover delicious and nutritious Mediterranean recipes that will transform your diet. From fresh salads to hearty mains, explore the flavors of the Mediterranean.",
        category: "Food",
        coverImage:
            "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=800&h=400",
        likes: 234,
        isLiked: false,
    },
    {
        id: 3,
        title: "Essential Tips for Remote Work Success",
        description: 
            "Master the art of working from home with these proven strategies for productivity, work-life balance, and effective communication in a remote environment.",
        category: "Business",
        coverImage:
            "https://images.unsplash.com/photo-1521898284481-a5ec348cb555?auto=format&fit=crop&q=80&w=800&h=400",
        likes: 189,
        isLiked: false,
    },
    {
        id: 4,
        title: "Ultimate Japan Travel Guide",
        description:
            "Plan your perfect trip to Japan with this comprehensive guide covering everything from ancient temples to modern cities, local cuisine, and cultural experiences.",
        category: "Travel",
        coverImage:
            "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800&h=400",
        likes: 445,
        isLiked: false,
    },
    {
        id: 5,
        title: "Mastering Machine Learning Basics",
        description:
            "A beginner-friendly guide to understanding machine learning fundamentals, algorithms, and practical applications in today's technology landscape.",
        category: "Technology",
        coverImage:
            "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800&h=400",
        likes: 267,
        isLiked: false,
    },
    {
        id: 6,
        title: "Home Fitness: No Equipment Needed",
        description:
            "Transform your body with these effective home workout routines that require no special equipment. Perfect for busy professionals and home fitness enthusiasts.",
        category: "Health",
        coverImage:
            "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800&h=400",
        likes: 312,
        isLiked: false,
    },
    {
        id: 7,
        title: "Modern Interior Design Trends",
        description:
            "Explore the latest interior design trends that combine style, comfort, and sustainability. Get inspired to transform your living space into a modern sanctuary.",
        category: "Lifestyle",
        coverImage:
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800&h=400",
        likes: 178,
        isLiked: false,
    },
    {
        id: 8,
        title: "Online Learning Revolution",
        description:
            "How digital platforms are transforming education worldwide. Discover the best online learning resources and strategies for effective virtual education.",
        category: "Education",
        coverImage:
            "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800&h=400",
        likes: 201,
        isLiked: false,
    },
    {
        id: 9,
        title: "The Rise of Esports",
        description:
            "An in-depth look at the growing world of competitive gaming, including major tournaments, professional players, and the future of digital sports.",
        category: "Entertainment",
        coverImage:
            "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800&h=400",
        likes: 289,
        isLiked: false,
    },
    {
        id: 10,
        title: "Sustainable Living Guide",
        description:
            "Practical tips and strategies for reducing your environmental impact and living a more sustainable lifestyle in today's modern world.",
        category: "Lifestyle",
        coverImage:
            "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800&h=400",
        likes: 334,
        isLiked: false,
    },
];

const BlogList = ({ selectedCategory, searchQuery }) => {
    const [blogs, setBlogs] = useState(sampleBlogs);

    const handleLike = (blog_id) => {
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
            <div className="space-y-6">
                {filteredBlogs.map((blog) => (
                    <Link
                        key={blog.id}
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
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleLike(blog.id);
                                        }}
                                        className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400"
                                    >
                                        <Heart
                                            className={`h-5 w-5 ${
                                                blog.isLiked
                                                    ? "fill-current text-teal-600 dark:text-teal-400"
                                                    : ""
                                            }`}
                                        />
                                        <span>{blog.likes}</span>
                                    </button>
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
                ))}
            </div>
        </div>
    );
};

export default BlogList;
