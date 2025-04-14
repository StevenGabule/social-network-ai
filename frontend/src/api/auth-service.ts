import axiosClient from './axios-config';

export interface RegisterData {
	name: string;
	email: string;
	password: string;
	password_confirmation: string;
}

export interface LoginData {
	email: string;
	password: string;
}

export interface ForgotPasswordData {
	email: string;
}

export interface ResetPasswordData {
	email: string;
	token: string;
	password: string;
	password_confirmation: string;
}

export const authService = {
	register: (data: RegisterData) => axiosClient.post('/auth/register', data),
	login: (data: LoginData) => axiosClient.post('/auth/login', data),
	forgotPassword: (data: ForgotPasswordData) => axiosClient.post('/auth/forgot-password', data),
	resetPassword: (data: ResetPasswordData) => axiosClient.post('/auth/reset-password', data),
	logout: () => axiosClient.post('/auth/logout'),
	getProfile: () => axiosClient.get('/auth/profile')
};
