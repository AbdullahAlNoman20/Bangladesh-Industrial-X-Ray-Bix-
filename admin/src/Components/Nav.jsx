// FILE: admin/src/Components/Nav.jsx
import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { NAV_LINKS } from './constants/navLinks';
import logo from '../../src/assets/BixLogo.jpg';

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-ink/5 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link to="/" className="flex items-center gap-2" aria-label="BIX Home">
          <img src={logo} alt="Bangladesh Industrial X-Ray" className="h-9" fetchPriority="high" />
        </Link>

        <nav className="hidden items-center gap-5 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => `text-sm font-medium transition-colors ${isActive ? 'text-brand' : 'text-ink/70 hover:text-ink'}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="rounded-md p-2 text-ink/70 hover:bg-ink/5 lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      {open && (
        <nav className="border-t border-ink/5 bg-white px-6 py-3 lg:hidden">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) => `block py-2 text-sm font-medium ${isActive ? 'text-brand' : 'text-ink/70'}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}