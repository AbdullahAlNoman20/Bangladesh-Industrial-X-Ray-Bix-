// FILE: admin/src/Pages/Admin/AdminLogin.jsx
import { useState } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../../Components/hooks/useAuth';
import SEO from '../../Components/Shared/SEO';
import logo from '../../assets/Texco_Tech_Logo.png';

export default function AdminLogin() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [values, setValues] = useState({ email: '', password: '', website: '' }); // "website" = honeypot
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (isAuthenticated) return <Navigate to="/admin/dashboard" replace />;

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    // Honeypot — বট স্ক্রিপ্ট সাধারণত hidden field-ও পূরণ করে ফেলে
    if (values.website) return;

    setSubmitting(true);
    try {
      await login({ email: values.email, password: values.password });
      navigate(location.state?.from?.pathname ?? '/admin/dashboard', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-4">
      <SEO title="Admin Login" path="/admin" noindex />

      <div className="flex w-full max-w-3xl flex-col gap-6 lg:flex-row">
        <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl">
          <div className="mb-6 flex flex-col items-center">
            <img src={logo} alt="BIX" className="mb-3 h-12" />
            <h1 className="font-display text-xl text-ink">Administrator Login</h1>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-4" autoComplete="off">
            {/* Honeypot field — visually hidden, real users never fill it */}
            <input
              type="text"
              name="website"
              value={values.website}
              onChange={(e) => setValues((v) => ({ ...v, website: e.target.value }))}
              className="absolute left-[-9999px]"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-ink">Email</span>
              <input
                type="email"
                required
                autoComplete="username"
                value={values.email}
                onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
                className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-ink">Password</span>
              <input
                type="password"
                required
                autoComplete="current-password"
                value={values.password}
                onChange={(e) => setValues((v) => ({ ...v, password: e.target.value }))}
                className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
              />
            </label>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-md bg-brand py-2.5 text-sm font-medium text-white hover:bg-brand-dark disabled:opacity-60"
            >
              {submitting ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>

        {/* SRS §14 — শুধু development মোডে দেখা যাবে, production build-এ import.meta.env.DEV=false হওয়ায় স্বয়ংক্রিয়ভাবে বাদ পড়ে যায় */}
        {import.meta.env.DEV && (
          <div className="w-full max-w-sm self-start rounded-2xl border border-dashed border-white/30 bg-white/5 p-6 text-sm text-white/70">
            <p className="mb-2 font-semibold text-white">Dev Login Info (auto-removed in production)</p>
            <p>Email: admin@bixndt.com</p>
            <p>Password: Admin@12345</p>
          </div>
        )}
      </div>
    </div>
  );
}