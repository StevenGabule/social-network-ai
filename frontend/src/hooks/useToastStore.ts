import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

export type ToastVariant = 'default' | 'success' | 'error' | 'warning';

export interface Toast {
  id: string;
  variant: ToastVariant;
  title: string;
  description?: string;
  duration?: number;
}

interface ToastState {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  clearAllToasts: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  addToast: (toast) => 
    set((state) => ({
      toasts: [
        ...state.toasts,
        {
          id: uuidv4(),
          ...toast,
        },
      ],
    })),
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),
  clearAllToasts: () => set({ toasts: [] }),
}));

// Helper functions to make it easier to create specific types of toasts
export const toast = {
  show: (title: string, description?: string, duration?: number) => {
    useToastStore.getState().addToast({
      variant: 'default',
      title,
      description,
      duration,
    });
  },
  success: (title: string, description?: string, duration?: number) => {
    useToastStore.getState().addToast({
      variant: 'success',
      title,
      description,
      duration,
    });
  },
  error: (title: string, description?: string, duration?: number) => {
    useToastStore.getState().addToast({
      variant: 'error',
      title,
      description,
      duration,
    });
  },
  warning: (title: string, description?: string, duration?: number) => {
    useToastStore.getState().addToast({
      variant: 'warning',
      title,
      description,
      duration,
    });
  },
};