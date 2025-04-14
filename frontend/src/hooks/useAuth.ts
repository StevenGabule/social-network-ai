import { authService, ForgotPasswordData, LoginData, RegisterData, ResetPasswordData } from '@/api/auth-service';
import { useAuthStore } from '@/store/authStore';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom'

export const useAuth = () => {
	const navigate = useNavigate();
	const {setAuth, clearAuth} = useAuthStore();

	// register mutation
	const registerMutation = useMutation({
		mutationFn: (data: RegisterData) => authService.register(data),
		onSuccess: () => {
			navigate('/login')
		}
	})

	// Login mutation
	const loginMutation = useMutation({
		mutationFn: (data: LoginData) => authService.login(data),
		onSuccess: (response) => {
			const {user, token} = response.data.data;
			setAuth(user, token)
			navigate('/dashboard');
		}
	});

	const forgotPasswordMutation = useMutation({
		mutationFn: (data: ForgotPasswordData) => authService.forgotPassword(data)
	})

	const resetPasswordMutation = useMutation({
		mutationFn: (data: ResetPasswordData) => authService.resetPassword(data),
		onSuccess: () => {
			navigate('/login');
		}
	})

	// Logout mutation
	const logoutMutation = useMutation({
		mutationFn: () => authService.logout(),
		onSuccess: () => {
			clearAuth();
			navigate('/login')
		},
		onError: () => {
			clearAuth();
			navigate('/login')
		}
	});

	// Get user profile query
	const profileQuery = useQuery({
		queryKey: ['profile'],
		queryFn: () => authService.getProfile(),
		enabled: useAuthStore.getState().isAuthenticated
	})

	return {
		register: registerMutation.mutate,
		login: loginMutation.mutate,
		forgotPassword: forgotPasswordMutation.mutate,
		resetPassword: resetPasswordMutation.mutate,
		logout: logoutMutation.mutate,
		profile: profileQuery.data?.data,

		isRegistering: registerMutation.isPending,
		isLoggingIn: loginMutation.isPending,
		isForgotPasswordLoading: forgotPasswordMutation.isPending,
		isResetPasswordLoading: resetPasswordMutation.isPending,
		isLoggingOut: logoutMutation.isPending,
		isProfileLoading: profileQuery.isLoading,

		registerError: registerMutation.error,
		loginError: loginMutation.error,
		forgotPasswordError: forgotPasswordMutation.error,
		resetPasswordError: resetPasswordMutation.error,
		profileError: profileQuery.error,
	}
}