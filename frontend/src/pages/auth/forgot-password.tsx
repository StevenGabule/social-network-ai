import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/use-auth';
import React, { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom';

export default function ForgotPassword(): React.ReactElement {
	const [email, setEmail] = useState('');
	const [submitted, setSubmitted] = useState(false);
	const { forgotPassword, isForgotPasswordLoading, forgotPasswordError } = useAuth();

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		forgotPassword({ email }, {
			onSuccess: () => {
				setSubmitted(true);
			}
		});
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
			<Card className="w-full max-w-md">
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl font-bold text-center">Forgot Password</CardTitle>
					<CardDescription className="text-center">
						Enter your email address and we'll send you a link to reset your password
					</CardDescription>
				</CardHeader>
				<CardContent>
					{submitted ? (
						<div className="bg-green-50 text-green-700 p-4 rounded-md text-center space-y-3">
							<p>Reset link sent! Check your email for instructions.</p>
							<Link to="/login" className="block text-sm text-slate-900 hover:underline">
								Back to Login
							</Link>
						</div>
					) : (
						<form onSubmit={handleSubmit} className="space-y-4">
							{forgotPasswordError && (
								<div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
									{/* @ts-expect-error some */}
									{forgotPasswordError.response?.data?.message || 'An error occurred'}
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
							<Button type="submit" className="w-full" disabled={isForgotPasswordLoading}>
								{isForgotPasswordLoading ? 'Sending...' : 'Send Reset Link'}
							</Button>
						</form>
					)}
				</CardContent>
			</Card>
		</div>
	)
}
