// FILE: admin/src/Pages/Admin/AdminLogin.jsx
import { useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../../Components/hooks/useAuth";
import logo from "../../assets/BixLogo.jpg";

// SRS §14 — শুধুমাত্র development-এ সাহায্যকারী প্যানেল, ডেলিভারির আগে এই কনস্ট্যান্টটি বাদ দিতে হবে।
const DEV_HINT = import.meta.env.DEV
  ? { email: "admin@bixndt.com", password: "Admin@12345" }
  : null;

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (isAuthenticated) return <Navigate to="/admin/dashboard" replace />;

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login({ email, password });
      navigate(location.state?.from?.pathname ?? "/admin/dashboard", {
        replace: true,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl">
        <div className="mb-6 flex flex-col items-center">
          <img src={logo} alt="BIX" className="mb-3 h-12" />
          <h1 className="font-display text-xl text-ink">Admin Login</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-4"
          autoComplete="off"
        >
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-ink"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-medium text-ink"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            />
          </div>

          {error && (
            <p className="text-xs text-red-600" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-md bg-brand py-2.5 text-sm font-medium text-white hover:bg-brand-dark disabled:opacity-60"
          >
            {submitting ? "Signing in…" : "Sign In"}
          </button>
        </form>
        {DEV_HINT && (
          <button
            type="button"
            disabled={submitting}
            onClick={async () => {
              setError("");
              setSubmitting(true);

              try {
                await login({
                  email: DEV_HINT.email,
                  password: DEV_HINT.password,
                });

                navigate(location.state?.from?.pathname ?? "/admin/dashboard", {
                  replace: true,
                });
              } catch (err) {
                setError(err.message);
              } finally {
                setSubmitting(false);
              }
            }}
            className="mt-5 w-full rounded-md border border-dashed border-ink/15 bg-surface p-3 text-left text-xs text-ink/60 transition hover:border-brand hover:bg-brand/5 disabled:opacity-60"
          >
            <p className="font-medium text-ink/70">
              {submitting ? "Signing in…" : "Dev Login"}
            </p>

            <p className="mt-1">Click here to automatically login</p>
          </button>
        )}
      </div>
    </div>
  );
}
