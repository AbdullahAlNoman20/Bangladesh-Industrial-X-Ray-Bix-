// FILE: admin/src/Components/Shared/FaqAccordion.jsx
import { useState } from 'react';

export default function FaqAccordion({ items = [] }) {
  const [openId, setOpenId] = useState(null);

  return (
    <div className="divide-y divide-ink/5 rounded-xl border border-ink/5 bg-white">
      {items.map((faq) => {
        const isOpen = openId === faq.id;
        return (
          <div key={faq.id}>
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : faq.id)}
              className="flex w-full items-center justify-between px-5 py-4 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-sm font-medium text-ink">{faq.question}</span>
              <span className="text-ink/40">{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen && <div className="px-5 pb-4 text-sm text-ink/60">{faq.answer}</div>}
          </div>
        );
      })}
    </div>
  );
}