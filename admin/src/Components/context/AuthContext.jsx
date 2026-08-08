// FILE: admin/src/Components/context/AuthContext.jsx
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { fetchAll } from '../services/dataStore';

export const AuthContext = createContext(null);

const SESSION_KEY = 'bix_admin_session';
const TOKEN_KEY = 'bix_admin_token';
const ATTEMPTS_KEY = 'bix_admin_login_attempts';
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 5 * 60 * 1000; // 5 minutes — brute-force mitigation (SRS §15)

async function sha256Hex(text) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

function readAttempts() {
  const raw = localStorage.getItem(ATTEMPTS_KEY);
  return raw ? JSON.parse(raw) : { count: 0, lockedUntil: 0 };
}
function writeAttempts(v) {
  localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(v));
}

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (raw) {
      try {
        setAdmin(JSON.parse(raw));
      } catch {
        sessionStorage.removeItem(SESSION_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async ({ email, password }) => {
    const attempts = readAttempts();
    if (attempts.lockedUntil > Date.now()) {
      const minutesLeft = Math.ceil((attempts.lockedUntil - Date.now()) / 60000);
      throw new Error(`অনেকবার ভুল চেষ্টা হয়েছে। ${minutesLeft} মিনিট পর আবার চেষ্টা করুন।`);
    }

    const safeEmail = String(email ?? '').trim().toLowerCase();
    const safePassword = String(password ?? '');
    if (!safeEmail || !safePassword) throw new Error('ইমেইল ও পাসওয়ার্ড আবশ্যক।');

    const [record] = await fetchAll('admin');
    const passwordHash = await sha256Hex(safePassword);

    if (!record || record.email.toLowerCase() !== safeEmail || record.passwordHash !== passwordHash) {
      const next = { count: attempts.count + 1, lockedUntil: 0 };
      if (next.count >= MAX_ATTEMPTS) next.lockedUntil = Date.now() + LOCKOUT_MS;
      writeAttempts(next);
      throw new Error('ভুল ইমেইল অথবা পাসওয়ার্ড।');
    }

    writeAttempts({ count: 0, lockedUntil: 0 });
    const { passwordHash: _h, ...safeAdmin } = record;
    const token = crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(safeAdmin));
    sessionStorage.setItem(TOKEN_KEY, token);
    setAdmin(safeAdmin);
    return safeAdmin;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    setAdmin(null);
  }, []);

  const value = useMemo(
    () => ({ admin, isAuthenticated: Boolean(admin), isLoading, login, logout }),
    [admin, isLoading, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}