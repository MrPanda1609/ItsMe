import { useEffect } from 'react';
import { LoginPage } from './features/auth/pages/LoginPage';
import { isMockAuthenticated } from './features/auth/mockAuth';
import { EditorPage } from './features/builder/pages/EditorPage';
import { PublicProfilePage } from './features/builder/pages/PublicProfilePage';
import { LandingPage } from './features/marketing/pages/LandingPage';

function RouteRedirect({ to }: { to: string }) {
  useEffect(() => {
    if (window.location.pathname !== to) {
      window.location.replace(to);
    }
  }, [to]);

  return null;
}

export default function App() {
  const pathname = window.location.pathname;
  const authenticated = isMockAuthenticated();

  if (pathname.startsWith('/login') || pathname.startsWith('/signup')) {
    return authenticated ? <RouteRedirect to="/editor" /> : <LoginPage />;
  }

  if (pathname.startsWith('/editor')) {
    return authenticated ? <EditorPage /> : <RouteRedirect to="/login" />;
  }

  if (pathname.startsWith('/profile')) {
    return <PublicProfilePage />;
  }

  return <LandingPage />;
}
