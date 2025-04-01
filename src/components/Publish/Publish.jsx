import React, { useEffect, useState } from "react";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { ImagePlus, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { categories } from "../../constants/Categories";
import toast, { Toaster } from "react-hot-toast";
import { publishBlog } from "../../services/operations/BlogAPI";
import { useAuthStore } from "../../stores/authStore";

const Publish = () => {
    const navigate = useNavigate();
    const editor = useCreateBlockNote();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [coverImage, setCoverImage] = useState(null);
    const [coverImagePreview, setCoverImagePreview] = useState(null);
    const [content, setContent] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const { token } = useAuthStore();

    const onChange = async () => {
        const docJSON = JSON.stringify(editor.document);
        setContent(docJSON);
    };

    useEffect(() => {
        onChange();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCoverImage(file);
            setCoverImagePreview(URL.createObjectURL(file));
        }
    };

    const handlePublish = async() => {
        try {
            const response = await publishBlog(
                title,
                description,
                coverImage,
                selectedCategory,
                content,
                token || ""
            );

            if (response && response.data) {
                toast.success(response.data.message);
				navigate(`/blog/${response.data.blog_id}`)
            } else {
                throw new Error("Invalid response");
            }
        } catch (error) {
            toast.error("Please check the credentials again");
            console.log("Error while publishing blog: ", error);
        }
    };

    return (
        <div className="min-h-screen w-full dark:bg-[#121212] p-6">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => navigate("/dashboard")}
                    className="flex items-center text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 mb-6 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Dashboard
                </button>
                
                <div className="space-y-6">
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full text-4xl font-bold bg-transparent border-none outline-none placeholder-gray-400 dark:text-white"
                    />

                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full text-lg bg-transparent border-none outline-none resize-none placeholder-gray-400 dark:text-white"
                        rows={2}
                    />

                    <div className="space-y-4">
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full text-lg p-4 bg-transparent border border-gray-300 dark:border-gray-600 rounded-md outline-none dark:text-white focus:ring-2 focus:ring-teal-500 transition-colors"
                        >
                            <option value="" disabled>
                                Select category
                            </option>
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="relative">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                            id="cover-image"
                        />
                        <label
                            htmlFor="cover-image"
                            className="cursor-pointer block w-full h-48 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-teal-500 dark:hover:border-teal-500 transition-colors"
                        >
                            {coverImagePreview ? (
                                <img
                                    src={coverImagePreview}
                                    alt="Cover"
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full space-y-2">
                                    <ImagePlus className="w-8 h-8 text-gray-400" />
                                    <span className="text-gray-400">
                                        Add cover image
                                    </span>
                                </div>
                            )}
                        </label>
                    </div>

                    <div className="border border-gray-300  dark:border-gray-800 rounded-lg overflow-hidden">
                        <BlockNoteView
                            editor={editor}
                            className="min-h-[400px]"
                            onChange={onChange}
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            onClick={handlePublish}
                            className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors"
                        >
                            Publish
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Publish;
