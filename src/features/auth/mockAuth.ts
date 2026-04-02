const MOCK_AUTH_KEY = 'itsme-mock-auth';

export const isMockAuthenticated = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  return window.sessionStorage.getItem(MOCK_AUTH_KEY) === 'true';
};

export const setMockAuthenticated = (value: boolean) => {
  if (typeof window === 'undefined') {
    return;
  }

  if (value) {
    window.sessionStorage.setItem(MOCK_AUTH_KEY, 'true');
    return;
  }

  window.sessionStorage.removeItem(MOCK_AUTH_KEY);
};
