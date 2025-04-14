import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function Profile(): React.ReactElement {
	const { logout, profile, isProfileLoading } = useAuth();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [passwordConfirmation, setPasswordConfirmation] = useState('');

	// Set initial form data once profile is loaded
	useState(() => {
		if (profile) {
			setName(profile.name || '');
			setEmail(profile.email || '');
		}
	});

	const handleLogout = () => {
		logout();
	};

	const handleProfileUpdate = (e: React.FormEvent) => {
		e.preventDefault();
	};

	const handlePasswordUpdate = (e: React.FormEvent) => {
		e.preventDefault();
	};

	if (isProfileLoading) {
		return (
			<div className="min-h-screen bg-slate-50 flex items-center justify-center">
				<p>Loading profile...</p>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-slate-50">
			<header className="bg-white shadow">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
					<h1 className="text-2xl font-semibold text-slate-900">Profile</h1>
					<div className="flex items-center space-x-4">
						<Link to="/dashboard" className="text-sm font-medium text-slate-700 hover:text-slate-900">
							Dashboard
						</Link>
						<Button variant="outline" onClick={handleLogout}>
							Logout
						</Button>
					</div>
				</div>
			</header>
			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
				<div className="grid gap-6 md:grid-cols-2">
					{/* Profile Information */}
					<Card>
						<CardHeader>
							<CardTitle>Profile Information</CardTitle>
							<CardDescription>Update your account's profile information</CardDescription>
						</CardHeader>
						<CardContent>
							<form onSubmit={handleProfileUpdate} className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="name">Name</Label>
									<Input
										id="name"
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										type="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>
								<Button type="submit">Save</Button>
							</form>
						</CardContent>
					</Card>

					{/* Password Update */}
					<Card>
						<CardHeader>
							<CardTitle>Update Password</CardTitle>
							<CardDescription>Ensure your account is using a secure password</CardDescription>
						</CardHeader>
						<CardContent>
							<form onSubmit={handlePasswordUpdate} className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="current_password">Current Password</Label>
									<Input
										id="current_password"
										type="password"
										value={currentPassword}
										onChange={(e) => setCurrentPassword(e.target.value)}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="new_password">New Password</Label>
									<Input
										id="new_password"
										type="password"
										value={newPassword}
										onChange={(e) => setNewPassword(e.target.value)}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="password_confirmation">Confirm Password</Label>
									<Input
										id="password_confirmation"
										type="password"
										value={passwordConfirmation}
										onChange={(e) => setPasswordConfirmation(e.target.value)}
									/>
								</div>
								<Button type="submit">Update Password</Button>
							</form>
						</CardContent>
					</Card>
				</div>
			</main>
		</div>
	);
}
