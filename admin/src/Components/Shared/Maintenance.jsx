// FILE: admin/src/Components/Shared/Maintenance.jsx
import logo from '../../assets/Texco_Tech_Logo.png';
export default function Maintenance() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-ink px-6 text-center text-white">
      <img src={logo} alt="BIX" className="h-14" />
      <h1 className="font-display text-2xl">সাইটটি রক্ষণাবেক্ষণাধীন</h1>
      <p className="max-w-md text-white/60">আমরা শীঘ্রই ফিরে আসছি। অসুবিধার জন্য দুঃখিত।</p>
    </div>
  );
}