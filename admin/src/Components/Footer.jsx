// FILE: admin/src/Components/Footer.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAll } from './services/dataStore';
import { NAV_LINKS } from './constants/navLinks';
import logo from '../assets/Texco_Tech_Logo2.png';

export default function Footer() {
  const [contact, setContact] = useState(null);
  const [social, setSocial] = useState([]);

  useEffect(() => {
    fetchAll('contactInfo').then((data) => setContact(data[0]));
    fetchAll('socialLinks').then(setSocial);
  }, []);

  return (
    <footer className="border-t border-ink/5 bg-ink py-12 text-white/70">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <img src={logo} alt="BIX" className="h-10 w-10 rounded-full bg-white p-1" />
          <p className="mt-3 text-sm">An ISO/IEC 17025:2017 BAB Accredited NDT company — An Ideal Home of NDT since 1995.</p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-white">Quick Links</h3>
          <ul className="space-y-1.5 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.to}><Link to={l.to} className="hover:text-white">{l.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-white">Contact</h3>
          {contact && (
            <ul className="space-y-1.5 text-sm">
              <li>{contact.headOffice}</li>
              <li><a href={`mailto:${contact.email}`} className="hover:text-white">{contact.email}</a></li>
              <li><a href={`tel:${contact.phone}`} className="hover:text-white">{contact.phone}</a></li>
            </ul>
          )}
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-white">Follow Us</h3>
          <div className="flex gap-3">
            {social.map((s) => (
              <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.platform} className="rounded-full bg-white/10 p-2 hover:bg-white/20">
                {s.platform.slice(0, 1).toUpperCase()}
              </a>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-10 text-center text-xs text-white/40">© {new Date().getFullYear()} Bangladesh Industrial X-Ray. All rights reserved.</p>
    </footer>
  );
}