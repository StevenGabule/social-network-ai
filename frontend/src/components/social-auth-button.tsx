import React from 'react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface SocialAuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	provider: 'google' | 'facebook' | 'twitter'
}

const SocialAuthButton = ({ provider, className, ...props }: SocialAuthButtonProps) => {
	const getProviderStyles = () => {
		switch (provider) {
			case 'google':
				return 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300';
			case 'facebook':
				return 'bg-blue-600 text-white hover:bg-blue-700';
			case 'twitter':
				return 'bg-black text-white hover:bg-gray-900';
			default:
				return '';
		}
	}

	const getProviderIcon = () => {
		switch (provider) {
			case 'google':
				return (
					<svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
						<path
							fill="currentColor"
							d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
						/>
					</svg>
				);
			case 'facebook':
				return (
					<svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
						<path
							fill="currentColor"
							d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"
						/>
					</svg>
				);
			case 'twitter':
				return (
					<svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
						<path
							fill="currentColor"
							d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
						/>
					</svg>
				);
			default:
				return null;
		}
	}

	const getProviderName = () => {
		switch (provider) {
			case 'google':
				return 'Google';
			case 'facebook':
				return 'Facebook';
			case 'twitter':
				return 'X';
			default:
				return '';
		}
	}

	return (
		<Button
			type='button'
			className={cn('flex items-center justify-center w-full', getProviderStyles(), className)}
			{...props}>
			{getProviderIcon()}
			<span>Continue with {getProviderName()}</span>
		</Button>
	)
}

export default SocialAuthButton;