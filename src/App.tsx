import { useState } from 'react';
import { LandingPage } from './pages/LandingPage';
import { AdmissionPage } from './pages/AdmissionPage';
import { AdminDashboard } from './pages/AdminDashboard';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'admission' | 'admin'>('landing');

  return (
    <>
      {/* Temporary navigation for demo purposes */}
      <div className="fixed top-0 left-0 right-0 bg-slate-900 text-white text-xs p-1 flex justify-center gap-4 z-[100] opacity-50 hover:opacity-100 transition-opacity">
        <button onClick={() => setCurrentView('landing')} className="hover:underline">Landing</button>
        <button onClick={() => setCurrentView('admission')} className="hover:underline">Admisión</button>
        <button onClick={() => setCurrentView('admin')} className="hover:underline">Admin Panel</button>
      </div>

      <div className="pt-6">
        {currentView === 'landing' && (
          <LandingPage onStartAdmission={() => setCurrentView('admission')} />
        )}
        {currentView === 'admission' && (
          <AdmissionPage onBackToHome={() => setCurrentView('landing')} />
        )}
        {currentView === 'admin' && (
          <AdminDashboard />
        )}
      </div>
    </>
  );
}
