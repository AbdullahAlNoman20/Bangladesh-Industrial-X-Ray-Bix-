// FILE: admin/src/Components/layout/AdminSidebar.jsx
import { NavLink } from "react-router-dom";
import { CMS_MODULES } from "../constants/permissions";
import logo from "../../assets/BixLogo.jpg";

const NAV_ITEMS = [
  { to: "/admin/dashboard", label: "Overview", icon: "📊", end: true },
  {
    to: "/admin/dashboard/home",
    label: "Home Page",
    icon: "🏠",
    module: CMS_MODULES.HOME,
  },
  {
    to: "/admin/dashboard/about",
    label: "About",
    icon: "ℹ️",
    module: CMS_MODULES.ABOUT,
  },
  {
    to: "/admin/dashboard/services",
    label: "Services",
    icon: "🛠️",
    module: CMS_MODULES.SERVICES,
  },
  {
    to: "/admin/dashboard/equipment",
    label: "Equipment",
    icon: "📦",
    module: CMS_MODULES.EQUIPMENT,
  },
  {
    to: "/admin/dashboard/certifications",
    label: "Certifications",
    icon: "📜",
    module: CMS_MODULES.CERTIFICATIONS,
  },
  {
    to: "/admin/dashboard/gallery",
    label: "Gallery",
    icon: "🖼️",
    module: CMS_MODULES.GALLERY,
  },
  {
    to: "/admin/dashboard/projects",
    label: "Previous Projects",
    icon: "🏗️",
    module: CMS_MODULES.PROJECTS,
  },
  {
    to: "/admin/dashboard/training",
    label: "Training",
    icon: "🎓",
    module: CMS_MODULES.TRAINING,
  },
  {
    to: "/admin/dashboard/partners",
    label: "Partners",
    icon: "🤝",
    module: CMS_MODULES.PARTNERS,
  },
  {
    to: "/admin/dashboard/testimonials",
    label: "Testimonials",
    icon: "💬",
    module: CMS_MODULES.TESTIMONIALS,
  },
  {
    to: "/admin/dashboard/contact",
    label: "Contact Info",
    icon: "☎️",
    module: CMS_MODULES.CONTACT,
  },
  {
    to: "/admin/dashboard/contact-submissions",
    label: "Contact Submissions",
    icon: "📥",
    module: CMS_MODULES.CONTACT,
  },
  {
    to: "/admin/dashboard/seo",
    label: "SEO Settings",
    icon: "🔍",
    module: CMS_MODULES.SEO,
  },
  {
    to: "/admin/dashboard/social-links",
    label: "Social Links",
    icon: "🔗",
    module: CMS_MODULES.SOCIAL_LINKS,
  },
];

export default function AdminSidebar({ open, onClose }) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-ink/40 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform overflow-y-auto bg-ink text-white transition-transform lg:static lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center gap-2 border-b border-white/10 px-5 py-4">
          <img
            src={logo}
            alt="BIX"
            className="h-8 w-8 rounded-full bg-white p-0.5"
          />
          <span className="font-display text-lg tracking-wide">BIX CMS</span>
        </div>
        <nav className="scrollbar-thin flex flex-col gap-0.5 px-3 py-4">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${isActive ? "bg-brand text-white" : "text-white/70 hover:bg-white/10 hover:text-white"}`
              }
            >
              <span>{item.icon}</span> {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
