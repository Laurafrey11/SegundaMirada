import { Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { AdmissionPage } from './pages/AdmissionPage';
import { TermsPage } from './pages/TermsPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminLogin } from './pages/AdminLogin';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Navbar } from './components/layout/Navbar';
import { Chatbot } from './components/chat/Chatbot';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage onStartAdmission={() => { window.location.href = '/admission'; }} />} />
        <Route path="/admission" element={<AdmissionPage onBackToHome={() => { window.location.href = '/'; }} />} />
        <Route path="/terms" element={<TermsPage />} />
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
      <Chatbot />
    </>
  );
}
