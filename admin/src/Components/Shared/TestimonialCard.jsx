// FILE: admin/src/Components/Shared/TestimonialCard.jsx
export default function TestimonialCard({ testimonial }) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-ink/5 bg-white p-6 shadow-sm">
      <div className="mb-3 text-caution" aria-label={`${testimonial.rating} out of 5 stars`}>
        {'★'.repeat(testimonial.rating)}{'☆'.repeat(5 - testimonial.rating)}
      </div>
      <p className="flex-1 text-sm text-ink/70">“{testimonial.feedback}”</p>
      <div className="mt-4 flex items-center gap-3">
        {testimonial.clientPhoto && (
          <img src={testimonial.clientPhoto} alt={testimonial.clientName} className="h-10 w-10 rounded-full object-cover" />
        )}
        <div>
          <p className="text-sm font-medium text-ink">{testimonial.clientName}</p>
          <p className="text-xs text-ink/50">{testimonial.designation}</p>
        </div>
      </div>
    </div>
  );
}