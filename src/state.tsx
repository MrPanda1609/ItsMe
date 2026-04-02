import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';
import { createBlankSite, DEMO_ACCOUNTS, DEMO_HINTS, DEMO_USERS, normalizeSiteRecord, normalizeUserSession, SEED_SITES } from './data';
import type { LoginResult, SiteRecord, UserSession } from './types';

const AUTH_STORAGE_KEY = 'itsme.auth.session.v1';
const SITES_STORAGE_KEY = 'itsme.sites.v2';

interface AuthContextValue {
  user: UserSession | null;
  demoHints: typeof DEMO_HINTS;
  login: (email: string, password: string) => Promise<LoginResult>;
  logout: () => void;
}

interface SitesContextValue {
  sites: SiteRecord[];
  demoUsers: UserSession[];
  saveSite: (site: SiteRecord) => void;
  createSite: (owner: UserSession) => SiteRecord;
}

const AuthContext = createContext<AuthContextValue | null>(null);
const SitesContext = createContext<SitesContextValue | null>(null);

function readFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;

  const raw = window.localStorage.getItem(key);
  if (!raw) return fallback;

  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<UserSession | null>(() => normalizeUserSession(readFromStorage<UserSession | null>(AUTH_STORAGE_KEY, null)));

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (user) {
      window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [user]);

  const login = useCallback(async (email: string, password: string) => {
    const account = DEMO_ACCOUNTS.find(
      (entry) => entry.email.toLowerCase() === email.trim().toLowerCase() && entry.password === password.trim(),
    );

    if (!account) {
      return { ok: false, error: 'Sai email hoặc mật khẩu.' } satisfies LoginResult;
    }

    const { password: _password, ...session } = account;
    setUser(normalizeUserSession(session));

    return { ok: true } satisfies LoginResult;
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const value = useMemo(
    () => ({
      user,
      demoHints: DEMO_HINTS,
      login,
      logout,
    }),
    [login, logout, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function SitesProvider({ children }: PropsWithChildren) {
  const [sites, setSites] = useState<SiteRecord[]>(() => readFromStorage<SiteRecord[]>(SITES_STORAGE_KEY, SEED_SITES).map(normalizeSiteRecord));

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(SITES_STORAGE_KEY, JSON.stringify(sites));
  }, [sites]);

  const saveSite = useCallback((site: SiteRecord) => {
    setSites((current) =>
      current.map((entry) =>
        entry.id === site.id ? normalizeSiteRecord({ ...site, updatedAt: new Date().toISOString() }) : normalizeSiteRecord(entry),
      ),
    );
  }, []);

  const createSite = useCallback((owner: UserSession) => {
    const next = normalizeSiteRecord(createBlankSite(owner, sites.length));
    setSites((current) => [next, ...current.map(normalizeSiteRecord)]);
    return next;
  }, [sites.length]);

  const value = useMemo(
    () => ({
      sites,
      demoUsers: DEMO_USERS,
      saveSite,
      createSite,
    }),
    [createSite, saveSite, sites],
  );

  return <SitesContext.Provider value={value}>{children}</SitesContext.Provider>;
}

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <AuthProvider>
      <SitesProvider>{children}</SitesProvider>
    </AuthProvider>
  );
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuth must be used inside AuthProvider');
  return value;
}

export function useSites() {
  const value = useContext(SitesContext);
  if (!value) throw new Error('useSites must be used inside SitesProvider');
  return value;
}
