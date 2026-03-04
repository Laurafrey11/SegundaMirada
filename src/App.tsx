import { Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { AdmissionPage } from './pages/AdmissionPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminLogin } from './pages/AdminLogin';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage onStartAdmission={() => { window.location.href = '/admission'; }} />} />
      <Route path="/admission" element={<AdmissionPage onBackToHome={() => { window.location.href = '/'; }} />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
