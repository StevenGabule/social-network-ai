import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import React, { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Login(): React.ReactElement {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('')
	const {login, isLoggingIn, loginError} = useAuth();

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		login({email, password});
	}

	return (
		<div className='flex min-h-screen items-center justify-center bg-slate-50 p-4'>
			<Card className='w-full max-w-md'>
				<CardHeader className='space-y-1'>
					<CardTitle className='text-2xl font-bold text-center'>Login</CardTitle>
					<CardDescription>Enter your email and password to sign in.</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className='space-y-4'>
						{loginError && (
								<div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
									{/* @ts-expect-error some */}
									{loginError.response?.data?.message || 'An error occurred during login'}
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
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" className="text-sm text-slate-500 hover:text-slate-900">
                  Forgot Password?
                </Link>
              </div>
              <Input 
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoggingIn}>
              {isLoggingIn ? 'Signing in...' : 'Sign in'}
            </Button>
					</form>
				</CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-slate-500">
            Don't have an account?{' '}
            <Link to="/register" className="text-slate-900 hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
			</Card>
		</div>
	)
}
