import Lenis from 'lenis';
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

type ThemeMode = 'dark' | 'light';

interface AppExperienceContextValue {
  mode: ThemeMode;
  toggleMode: () => void;
  setMode: (mode: ThemeMode) => void;
}

const STORAGE_KEY = 'itsme-experience-theme';

const AppExperienceContext = createContext<AppExperienceContextValue | null>(null);

const getInitialMode = (): ThemeMode => {
  if (typeof window === 'undefined') {
    return 'dark';
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === 'light' ? 'light' : 'dark';
};

export function AppExperienceProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(getInitialMode);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, mode);
    document.documentElement.dataset.themeMode = mode;
    document.documentElement.style.colorScheme = mode;
    document.documentElement.classList.toggle('dark', mode === 'dark');
  }, [mode]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const pathname = window.location.pathname;
    const shouldEnableLenis = pathname === '/' || pathname.startsWith('/login') || pathname.startsWith('/signup');

    if (!shouldEnableLenis) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
    });

    let frameId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frameId = window.requestAnimationFrame(raf);
    };

    frameId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);

  const value = useMemo<AppExperienceContextValue>(
    () => ({
      mode,
      setMode,
      toggleMode: () => setMode((current) => (current === 'dark' ? 'light' : 'dark')),
    }),
    [mode],
  );

  return <AppExperienceContext.Provider value={value}>{children}</AppExperienceContext.Provider>;
}

export const useAppExperience = () => {
  const context = useContext(AppExperienceContext);

  if (!context) {
    throw new Error('useAppExperience must be used inside AppExperienceProvider');
  }

  return context;
};
