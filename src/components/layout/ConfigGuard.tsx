import React from 'react';
import { AlertCircle } from 'lucide-react';

export function ConfigGuard({ children }: { children: React.ReactNode }) {
  const isSupabaseConfigured = !!(import.meta as any).env.VITE_SUPABASE_URL && !!(import.meta as any).env.VITE_SUPABASE_ANON_KEY;

  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center border border-red-100">
          <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h1 className="text-xl font-bold text-slate-900 mb-2">Configuración Incompleta</h1>
          <p className="text-slate-600 mb-6 leading-relaxed">
            Faltan las credenciales de <strong>Supabase</strong>. <br /><br />
            Por favor, agrega las variables <strong>VITE_SUPABASE_URL</strong> y <strong>VITE_SUPABASE_ANON_KEY</strong> en el panel de <strong>Secrets</strong> de AI Studio para que la aplicación pueda funcionar.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
          >
            Ya las configuré, reintentar
          </button>
          <p className="mt-4 text-xs text-slate-400">
            Nota: Después de guardar los secretos, es posible que debas esperar unos segundos.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
