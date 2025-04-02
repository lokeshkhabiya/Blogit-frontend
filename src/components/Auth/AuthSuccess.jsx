import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { getUserData } from '../../services/operations/AuthAPI'
import { useAuthStore } from '../../stores/authStore';

const AuthSuccess = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuthStore();

    useEffect(() => {
        const fetchUserData = async () => {
            // Extract token from URL query parameters
            const searchParams = new URLSearchParams(location.search);
            const token = searchParams.get('token');
            
            if (token) {
                // If token is in URL, use it directly
                const data = await getUserData(token);
                if (data?.success) {
                    login(data.user, data.token);
                    navigate("/dashboard");
                } else {
                    navigate("/signin");
                }
            } else {
                navigate("/signin");
            }
        }

        fetchUserData();
    }, [location, login, navigate]);

    return (
        <div className='flex justify-center items-center h-screen'>Loading...</div>
    )
}

export default AuthSuccess