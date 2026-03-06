import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export function Navbar() {
  const { user } = useAuth();
  const location = useLocation();

  // Ocultar la barra de navegación si no hay usuario autenticado
  if (!user) return null;

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-brand-dark border-b border-brand-petrol-dark px-4 sm:px-6 py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
           <img 
             src="https://ntjqzfvqwnwddxbeeipu.supabase.co/storage/v1/object/public/logos/logo-segunda-mirada.png" 
             alt="Segunda Mirada" 
             className="h-12 w-auto object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.4)] transition-transform duration-300 group-hover:scale-105"
             referrerPolicy="no-referrer"
           />
        </Link>
        <div className="flex gap-4 md:gap-6">
          {user && (
            <>
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
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
