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
      <nav className="bg-dark-900/80 backdrop-blur-xl border-b border-dark-700/50 shadow-2xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <Link 
              to="/" 
              className="text-3xl font-extrabold text-gradient hover:scale-105 transition-transform duration-300"
            >
              StoreAdmin
            </Link>
            <div className="flex gap-3">
              <Link
                to="/"
                className={`nav-link ${isActive('/') && location.pathname === '/' ? 'nav-link-active' : 'text-dark-200 hover:text-white'}`}
              >
                Home
              </Link>
              <Link
                to="/inventory"
                className={`nav-link ${isActive('/inventory') ? 'nav-link-active' : 'text-dark-200 hover:text-white'}`}
              >
                Inventory
              </Link>
              <Link
                to="/catalogue"
                className={`nav-link ${isActive('/catalogue') ? 'nav-link-active' : 'text-dark-200 hover:text-white'}`}
              >
                Catalogue
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="flex-1 container mx-auto px-4 py-10 animate-fade-in">{children}</main>
      <footer className="bg-dark-900/60 backdrop-blur-xl border-t border-dark-700/50 py-6 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-dark-300 text-sm">
            &copy; 2024 StoreAdmin. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

