import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { useSocialAuth } from '@/hooks/use-social-auth';
import { toast } from '@/hooks/use-toast-store';

export default function SocialCallback() {
	const [error, setError] = useState<string | null>(null)
	const location = useLocation();
	const navigate = useNavigate();
	const { handleCallback, isLoading } = useSocialAuth();

	const  handleSocialCallback = useCallback(async () => {
		try {
			console.log('handleSocialCallback')
			const params = new URLSearchParams(location.search);
			const token = params.get('token');
			const error = params.get('error');

			if (error) {
				setError(error);
				toast.error('Social login failed.', error)
				setTimeout(() => navigate('/login'), 3000);
				return;
			}

			if (!token) {
				setError('No authentication token received.');
				toast.error('Social login failed.', 'No authentication token received.');
				setTimeout(() => navigate('/login'), 3000);
				return;
			}

			await handleCallback(token);
			
		} catch (err) {
			console.error('Error during social callback: ', err);
			setError('Failed to process authentication.')
			toast.error('Social login failed.', 'Failed to process authentication.');
			setTimeout(() => navigate('/login'), 3000)
		}

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	
	useEffect(() => {
		handleSocialCallback();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className='flex min-h-screen items-center justify-center bg-slate-50 p-4'>
			<Card className='w-full max-w-md'>
				<CardContent className='p-6 text-center'>
					{error ? (
						<div>
							<h2 className="text-xl font-semibold text-red-500 mb-4">Authentication Failed</h2>
							<p className="text-slate-500 mb-4">{error}</p>
							<p className="text-slate-500">Redirecting to login page...</p>
						</div>
					) : (
						<div>
							<h2 className="text-xl font-semibold text-slate-900 mb-4">
								{isLoading ? 'Completing Authentication...' : 'Authentication Successful!'}
							</h2>
							{isLoading ? (
								<div className="flex justify-center my-6">
									<div className="w-10 h-10 border-4 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent rounded-full animate-spin"></div>
								</div>
							) : (
								<p className="text-slate-500">Redirecting to dashboard...</p>
							)}
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	)

}