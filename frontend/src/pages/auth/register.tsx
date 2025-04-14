import React, { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Register(): React.ReactElement {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirmation, setPasswordConfirmation] = useState('');
	const { register, isRegistering, registerError } = useAuth();

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		register({
			name,
			email,
			password,
			password_confirmation: passwordConfirmation
		});
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
			<Card className="w-full max-w-md">
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
					<CardDescription className="text-center">
						Enter your details to create your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-4">
						{registerError && (
							<div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
								{/* @ts-expect-error some */}
								{registerError.response?.data?.message || 'An error occurred during registration'}
							</div>
						)}
						<div className="space-y-2">
							<Label htmlFor="name">Name</Label>
							<Input
								id="name"
								placeholder="John Doe"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
							/>
						</div>
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
							<Label htmlFor="password">Password</Label>
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
							<Label htmlFor="password_confirmation">Confirm Password</Label>
							<Input
								id="password_confirmation"
								type="password"
								placeholder="••••••••"
								value={passwordConfirmation}
								onChange={(e) => setPasswordConfirmation(e.target.value)}
								required
							/>
						</div>
						<Button type="submit" className="w-full" disabled={isRegistering}>
							{isRegistering ? 'Creating account...' : 'Create account'}
						</Button>
					</form>
				</CardContent>
				<CardFooter className="flex justify-center">
					<p className="text-sm text-slate-500">
						Already have an account?{' '}
						<Link to="/login" className="text-slate-900 hover:underline">
							Sign in
						</Link>
					</p>
				</CardFooter>
			</Card>
		</div>
	);
}
