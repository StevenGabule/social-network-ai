import { useAuthStore } from '../store/auth-store'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
	const { isAuthenticated } = useAuthStore()

	if (!isAuthenticated) {
		return <Navigate to="/login" replace />
	}

	return <Outlet />;
}

export default ProtectedRoute;