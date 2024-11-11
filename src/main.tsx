import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { SolanaProvider } from './contexts/SolanaContext';
import { FirebaseProvider } from './contexts/FirebaseContext';
import { AuthProvider } from './contexts/AuthContext';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <SolanaProvider>
        <FirebaseProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </FirebaseProvider>
      </SolanaProvider>
    </BrowserRouter>
  </StrictMode>
);