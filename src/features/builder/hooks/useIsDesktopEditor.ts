import { useEffect, useState } from 'react';

const DESKTOP_EDITOR_QUERY = '(min-width: 1024px) and (hover: hover) and (pointer: fine)';

const getMatch = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  if (typeof window.matchMedia !== 'function') {
    return window.innerWidth >= 1024;
  }

  return window.matchMedia(DESKTOP_EDITOR_QUERY).matches;
};

export const useIsDesktopEditor = () => {
  const [isDesktop, setIsDesktop] = useState<boolean>(getMatch);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined;
    }

    const mediaQuery = window.matchMedia(DESKTOP_EDITOR_QUERY);
    const updateMatch = () => setIsDesktop(mediaQuery.matches);

    updateMatch();

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', updateMatch);

      return () => mediaQuery.removeEventListener('change', updateMatch);
    }

    mediaQuery.addListener(updateMatch);
    return () => mediaQuery.removeListener(updateMatch);
  }, []);

  return isDesktop;
};
