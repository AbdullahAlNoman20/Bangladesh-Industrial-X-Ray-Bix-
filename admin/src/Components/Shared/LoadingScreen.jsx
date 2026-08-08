// FILE: admin/src/Components/Shared/LoadingScreen.jsx
import logo from '../../assets/Texco_Tech_Logo.png';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-4 bg-ink">
      <img src={logo} alt="BIX" className="h-14 animate-pulse" />
      <div className="h-1 w-40 overflow-hidden rounded-full bg-white/10">
        <div className="h-full w-1/3 animate-loading rounded-full bg-brand" />
      </div>
    </div>
  );
}