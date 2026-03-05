import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ShieldCheck } from 'lucide-react';

export function Navbar() {
  const { user } = useAuth();
  const location = useLocation();

  // Only show if user is authenticated
  if (!user) return null;

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-slate-900 border-b border-slate-800 px-6 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
           <ShieldCheck className="w-6 h-6 text-cyan-400" />
           <span className="text-white font-semibold">Segunda Mirada</span>
        </div>
        <div className="flex gap-6">
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
