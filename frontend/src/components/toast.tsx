import { useState, useEffect, ReactNode } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ToastProps {
  variant?: 'default' | 'success' | 'error' | 'warning';
  title: string;
  description?: string;
  duration?: number;
  onClose: () => void;
}

const Toast = ({
  variant = 'default',
  title,
  description,
  duration = 5000,
  onClose,
}: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Allow time for exit animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const variantStyles = {
    default: 'bg-white border-slate-200',
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    warning: 'bg-yellow-50 border-yellow-200',
  };

  const titleStyles = {
    default: 'text-slate-900',
    success: 'text-green-800',
    error: 'text-red-800',
    warning: 'text-yellow-800',
  };

  const descriptionStyles = {
    default: 'text-slate-500',
    success: 'text-green-700',
    error: 'text-red-700',
    warning: 'text-yellow-700',
  };

  return (
    <div
      className={cn(
        'max-w-md w-full rounded-lg border shadow-md p-4 transition-all duration-300',
        variantStyles[variant],
        isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4'
      )}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className={cn('font-medium text-sm', titleStyles[variant])}>{title}</h3>
          {description && (
            <div className={cn('mt-1 text-sm', descriptionStyles[variant])}>
              {description}
            </div>
          )}
        </div>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          className="flex-shrink-0 ml-4 text-slate-400 hover:text-slate-500"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default Toast;

// Toast container component to manage multiple toasts
export const ToastContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-md">
      {children}
    </div>
  );
};

// Toast hook for global state management would be created separately with Zustand
// This would be part of a more complete toast system