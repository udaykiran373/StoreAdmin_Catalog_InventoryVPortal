import { Link, useLocation } from 'react-router-dom';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-primary-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold hover:text-primary-200 transition-colors">
              StoreAdmin
            </Link>
            <div className="flex gap-4">
              <Link
                to="/"
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isActive('/') && location.pathname === '/'
                    ? 'bg-primary-600'
                    : 'hover:bg-primary-600'
                }`}
              >
                Home
              </Link>
              <Link
                to="/inventory"
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isActive('/inventory') ? 'bg-primary-600' : 'hover:bg-primary-600'
                }`}
              >
                Inventory
              </Link>
              <Link
                to="/catalogue"
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isActive('/catalogue') ? 'bg-primary-600' : 'hover:bg-primary-600'
                }`}
              >
                Catalogue
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
      <footer className="bg-gray-800 text-white py-4 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 StoreAdmin. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

