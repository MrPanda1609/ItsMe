import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './lib/i18n';
import { AppExperienceProvider } from './providers/AppExperienceProvider';
import { AuthProvider } from './providers/AuthProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppExperienceProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </AppExperienceProvider>
  </React.StrictMode>,
);
