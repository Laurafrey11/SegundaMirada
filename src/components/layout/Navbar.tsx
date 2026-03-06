import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export function Navbar() {
  const { user } = useAuth();
  const location = useLocation();

  // Show if user is authenticated OR if env var is explicitly 'true'
  const showAdminMenu = user || import.meta.env.VITE_SHOW_ADMIN_MENU === 'true';

  if (!showAdminMenu) return null;

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-slate-900 border-b border-slate-800 px-4 sm:px-6 py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
           <img 
             src="/logo-segunda-mirada.jpg" 
             alt="Segunda Mirada Logo" 
             className="h-10 md:h-12 w-auto object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.15)] transition-transform duration-300 group-hover:scale-105 rounded-lg"
             referrerPolicy="no-referrer"
           />
        </Link>
        <div className="flex gap-4 md:gap-6">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors ${isActive('/') ? 'text-cyan-400' : 'text-slate-400 hover:text-white'}`}
          >
            Landing
          </Link>
          <Link
            to="/admission"
            className={`text-sm font-medium transition-colors ${isActive('/admission') ? 'text-cyan-400' : 'text-slate-400 hover:text-white'}`}
          >
            Admisión
          </Link>
          <Link
            to="/admin"
            className={`text-sm font-medium transition-colors ${isActive('/admin') ? 'text-cyan-400' : 'text-slate-400 hover:text-white'}`}
          >
            Admin Panel
          </Link>
        </div>
      </div>
    </nav>
  );
}
