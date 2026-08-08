// FILE: admin/src/Components/Shared/ComingSoon.jsx
export default function ComingSoon({ title }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-2">
      <p className="font-display text-3xl text-ink/30">{title}</p>
      <p className="text-sm text-ink/40">এই পেজটি পরবর্তী ইটারেশনে তৈরি করা হবে।</p>
    </div>
  );
}