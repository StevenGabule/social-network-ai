import { useAuth } from '@/hooks/useAuth';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

interface MainLayoutProps {
  children: ReactNode;
  title: string;
}

const MainLayout = ({ children, title }: MainLayoutProps) => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
          <div className="flex items-center space-x-4">
            <Link to="/dashboard" className="text-sm font-medium text-slate-700 hover:text-slate-900">
              Dashboard
            </Link>
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
        {children}
      </main>
    </div>
  );
};

export default MainLayout;