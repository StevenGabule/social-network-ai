import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import ForgotPassword from './pages/auth/forgot-password';
import ResetPassword from './pages/auth/reset-password';
import Dashboard from './pages/dashboard/dashboard';
import Profile from './pages/dashboard/profile';
import ProtectedRoute from './components/protected-route';
import ToastProvider from './toast-provider';
import SocialCallback from './pages/auth/social-callback';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
      queryFn: async ({ queryKey }) => {
        const abortController = new AbortController();
        const timeoutId = setTimeout(() => abortController.abort(), 15000); // 15 sec timeout
        
        try {
          const result = await fetch(queryKey[0] as string, { 
            signal: abortController.signal 
          });
          clearTimeout(timeoutId);
          return result.json();
        } catch (err) {
          clearTimeout(timeoutId);
          throw err;
        }
      },
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/reset-password' element={<ResetPassword />} />
            <Route path='/social-callback' element={<SocialCallback />} />

            <Route element={<ProtectedRoute />}>
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/profile' element={<Profile />} />
            </Route>

            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>

      </ToastProvider>
    </QueryClientProvider>
  )
}
