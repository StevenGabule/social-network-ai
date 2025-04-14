import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import React from 'react'
import { Link } from 'react-router-dom';

export default function Dashboard(): React.ReactElement {
	const { logout, profile, isProfileLoading } = useAuth();

	const handleLogout = () => {
		logout();
	};

	const {data: profileInfo} = profile;
	
	return (
		<div className="min-h-screen bg-slate-50">
			<header className="bg-white shadow">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
					<h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
					<div className="flex items-center space-x-4">
						<Link to="/profile" className="text-sm font-medium text-slate-700 hover:text-slate-900">
							Profile
						</Link>
						<Button variant="outline" onClick={handleLogout}>
							Logout
						</Button>
					</div>
				</div>
			</header>

			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
				<div className="bg-white shadow rounded-lg p-6">
					<h2 className="text-lg font-medium text-slate-900 mb-4">Welcome to your Dashboard</h2>

					{isProfileLoading ? (
						<p>Loading profile...</p>
					) : (
						<div>
							<p className="text-sm text-slate-500">
								You are logged in as <span className="font-medium text-slate-700">{profileInfo.name}</span>
							</p>
							<p className="text-sm text-slate-500 mt-1">
								Email: <span className="font-medium text-slate-700">{profileInfo.email}</span>
							</p>
						</div>
					)}

					<div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{/* Dashboard content would go here */}
						<div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
							<h3 className="font-medium text-slate-900">Getting Started</h3>
							<p className="mt-1 text-sm text-slate-500">
								This is a basic dashboard template. Add your content here.
							</p>
						</div>
						<div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
							<h3 className="font-medium text-slate-900">Recent Activity</h3>
							<p className="mt-1 text-sm text-slate-500">
								No recent activity to display.
							</p>
						</div>
						<div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
							<h3 className="font-medium text-slate-900">Quick Actions</h3>
							<p className="mt-1 text-sm text-slate-500">
								Add quick action buttons here.
							</p>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
