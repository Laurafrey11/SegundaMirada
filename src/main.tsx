import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import './i18n/config';
import { ThemeProvider } from './contexts/ThemeContext.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { SettingsToggle } from './components/layout/SettingsToggle.tsx';
import { ConfigGuard } from './components/layout/ConfigGuard.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ConfigGuard>
        <AuthProvider>
          <SettingsToggle />
          <App />
        </AuthProvider>
      </ConfigGuard>
    </BrowserRouter>
  </StrictMode>,
);
