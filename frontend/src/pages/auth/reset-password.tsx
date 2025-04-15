import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/use-auth';
import React, { FormEvent, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';

export default function ResetPassword(): React.ReactElement {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirmation, setPasswordConfirmation] = useState('');
	const [token, setToken] = useState('');
	const { resetPassword, isResetPasswordLoading, resetPasswordError } = useAuth();
	const location = useLocation();

	useEffect(() => {
		// Extract token and email from URL query params
		const queryParams = new URLSearchParams(location.search);
		const tokenParam = queryParams.get('token');
		const emailParam = queryParams.get('email');

		if (tokenParam) setToken(tokenParam);
		if (emailParam) setEmail(emailParam);
	}, [location]);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		resetPassword({
			email,
			token,
			password,
			password_confirmation: passwordConfirmation
		});
	};


	return (
		<div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
			<Card className="w-full max-w-md">
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl font-bold text-center">Reset Password</CardTitle>
					<CardDescription className="text-center">
						Enter your new password
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-4">
						{resetPasswordError && (
							<div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
								{/* @ts-expect-error some */}
								{resetPasswordError.response?.data?.message || 'An error occurred while resetting password'}
							</div>
						)}
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="name@example.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="password">New Password</Label>
							<Input
								id="password"
								type="password"
								placeholder="••••••••"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="password_confirmation">Confirm New Password</Label>
							<Input
								id="password_confirmation"
								type="password"
								placeholder="••••••••"
								value={passwordConfirmation}
								onChange={(e) => setPasswordConfirmation(e.target.value)}
								required
							/>
						</div>
						<input type="hidden" name="token" value={token} />
						<Button type="submit" className="w-full" disabled={isResetPasswordLoading}>
							{isResetPasswordLoading ? 'Resetting...' : 'Reset Password'}
						</Button>
					</form>
				</CardContent>
				<CardFooter className="flex justify-center">
					<Link to="/login" className="text-sm text-slate-500 hover:text-slate-900">
						Back to Login
					</Link>
				</CardFooter>
			</Card>
		</div>
	);
}
