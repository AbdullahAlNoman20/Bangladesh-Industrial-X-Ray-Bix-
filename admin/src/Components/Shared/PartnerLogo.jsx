// FILE: admin/src/Components/Shared/PartnerLogo.jsx
export default function PartnerLogo({ partner }) {
  return (
    <div className="flex h-20 items-center justify-center rounded-lg border border-ink/5 bg-white px-4 grayscale transition-all hover:grayscale-0" title={partner.name}>
      <img src={partner.logo} alt={partner.name} loading="lazy" className="max-h-10 w-auto object-contain" />
    </div>
  );
}