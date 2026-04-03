import { useEffect } from 'react';
import { LoginPage } from './features/auth/pages/LoginPage';
import { EditorPage } from './features/builder/pages/EditorPage';
import { PrivatePreviewPage } from './features/builder/pages/PrivatePreviewPage';
import { PublicProfilePage } from './features/builder/pages/PublicProfilePage';
import { LandingPage } from './features/marketing/pages/LandingPage';
import { useAuth } from './providers/AuthProvider';

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
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-[#fafafa] text-sm font-medium text-slate-500 dark:bg-[#0a0a0a] dark:text-slate-400">Đang tải phiên đăng nhập...</div>;
  }

  if (pathname.startsWith('/login') || pathname.startsWith('/signup')) {
    return user ? <RouteRedirect to="/editor" /> : <LoginPage mode={pathname.startsWith('/signup') ? 'signup' : 'login'} />;
  }

  if (pathname.startsWith('/editor')) {
    return user ? <EditorPage /> : <RouteRedirect to="/login" />;
  }

  if (pathname.startsWith('/preview')) {
    return user ? <PrivatePreviewPage /> : <RouteRedirect to="/login" />;
  }

  if (pathname.startsWith('/profile')) {
    return <PublicProfilePage />;
  }

  return <LandingPage />;
}
