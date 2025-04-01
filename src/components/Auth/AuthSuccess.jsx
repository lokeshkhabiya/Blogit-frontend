import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUserData } from '../../services/operations/AuthAPI'
import { useAuthStore } from '../../stores/authStore';

const AuthSuccess = () => {

    const navigate = useNavigate();
    const { login  } = useAuthStore();

    useEffect(() => {
        const fetchUserData = async () => {
            const data = await getUserData();
            if (data?.success) {
                login(data.user, data.token);
                navigate("/dashboard")
            } else {
                navigate("/login")
            }
        }

        fetchUserData(); 
    }, [])

  return (
    <div className='flex justify-center items-center h-screen'>Loading...</div>
  )
}

export default AuthSuccess