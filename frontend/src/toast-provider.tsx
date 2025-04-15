import { ReactNode } from 'react';
import { useToastStore } from './hooks/use-toast-store';
import Toast, { ToastContainer } from './components/toast';

interface ToastProviderProps {
  children: ReactNode;
}

const ToastProvider = ({ children }: ToastProviderProps) => {
  const { toasts, removeToast } = useToastStore();
  return (
    <>
      {children}
      <ToastContainer>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            variant={toast.variant}
            title={toast.title}
            description={toast.description}
            duration={toast.duration}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </ToastContainer>
    </>
  );
};

export default ToastProvider;