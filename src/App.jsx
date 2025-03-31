import './App.css'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from './stores/authStore'
import LandingPage from './components/LandingPage/LandingPage'
import Signup from './components/Auth/Signup'
import Signin from './components/Auth/Signin'
import Dashboard from './components/DashBoard/Dashboard'
import Blog from './components/Blogs/Blogs'
import AuthSuccess from './components/Auth/AuthSuccess'
import Publish from './components/Publish/Publish'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/auth/success" element={<AuthSuccess />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/blog/:blog_id" element={<Blog />} />
        <Route path="/publish" element={<Publish />} />
      </Route>
    </Routes>
  )
}

// Protected Route
const ProtectedRoute = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)
  
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />
  }

  return <Outlet />
}

export default App
