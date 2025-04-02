import React, { useState } from 'react';
import { X, LogOut, Edit2, Save, X as Cancel } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { updateDetails } from '../../services/operations/UserAPI';

const ProfileModal = ({ isOpen, onClose }) => {
    const { user, logout, updateUser, token } = useAuthStore();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        full_name: user?.full_name || '',
        email: user?.email || '',
        bio: user?.bio || '',
        profile_pic: user?.profile_pic || ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    profile_pic: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateDetails(formData.full_name, formData.bio, token);
            
            if (response?.data?.success) {
                updateUser(response.data.user);
                setIsEditing(false);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleCancel = () => {
        setFormData({
            full_name: user?.full_name || '',
            email: user?.email || '',
            bio: user?.bio || '',
            profile_pic: user?.profile_pic || ''
        });
        setIsEditing(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 min-h-screen">
            <div 
                className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-md p-8 relative shadow-2xl transform transition-all duration-300 ease-in-out my-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
                >
                    <X size={24} />
                </button>

                <div className="flex flex-col items-center">
                    <div className="relative">
                        {isEditing ? (
                            <div className="relative">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                    id="profile-pic-input"
                                />
                                <label htmlFor="profile-pic-input" className="cursor-pointer">
                                    {formData.profile_pic ? (
                                        <img
                                            src={formData.profile_pic}
                                            alt="Profile"
                                            className="w-24 h-24 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-24 h-24 rounded-full bg-teal-600 flex items-center justify-center">
                                            <span className="text-white text-2xl">
                                                {formData.full_name?.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                    )}
                                    <div className="absolute bottom-0 right-0 bg-teal-600 rounded-full p-1">
                                        <Edit2 size={16} className="text-white" />
                                    </div>
                                </label>
                            </div>
                        ) : (
                            user?.profile_pic ? (
                                <img
                                    src={user.profile_pic}
                                    alt="Profile"
                                    className="w-24 h-24 rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-24 h-24 rounded-full bg-teal-600 flex items-center justify-center">
                                    <span className="text-white text-2xl">
                                        {user?.full_name?.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                            )
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="w-full mt-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Name
                            </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="full_name"
                                    value={formData.full_name}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                            ) : (
                                <p className="mt-1 text-gray-900 dark:text-white">{user?.full_name}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Email
                            </label>
                            <p className="mt-1 text-gray-900 dark:text-white">{user?.email}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Bio
                            </label>
                            {isEditing ? (
                                <textarea
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleChange}
                                    rows="3"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                            ) : (
                                <p className="mt-1 text-gray-900 dark:text-white">{user?.bio || 'No bio added'}</p>
                            )}
                        </div>

                        <div className="flex justify-between pt-4">
                            <button
                                type="button"
                                onClick={logout}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                                <LogOut size={16} className="mr-2" />
                                Logout
                            </button>

                            <div className="flex space-x-2">
                                {isEditing ? (
                                    <>
                                        <button
                                            type="button"
                                            onClick={handleCancel}
                                            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 dark:bg-gray-600 dark:text-gray-200 dark:border-gray-500 dark:hover:bg-gray-700"
                                        >
                                            <Cancel size={16} className="mr-2" />
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                                        >
                                            <Save size={16} className="mr-2" />
                                            Save
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(true)}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                                    >
                                        <Edit2 size={16} className="mr-2" />
                                        Edit
                                    </button>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfileModal;