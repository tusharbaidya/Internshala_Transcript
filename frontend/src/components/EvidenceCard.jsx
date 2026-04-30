import { ThumbsUp, ThumbsDown, Minus } from 'lucide-react';

const icons = {
  positive: <ThumbsUp className="w-3.5 h-3.5" />,
  negative: <ThumbsDown className="w-3.5 h-3.5" />,
  neutral: <Minus className="w-3.5 h-3.5" />,
};

const badgeClass = {
  positive: 'badge-positive',
  negative: 'badge-negative',
  neutral: 'badge-neutral',
};

export default function EvidenceCard({ item }) {
  return (
    <div className="card p-4 animate-slide-up">
      <div className="flex items-start justify-between gap-3 mb-2">
        <span className={`${badgeClass[item.sentiment]} flex items-center gap-1.5`}>
          {icons[item.sentiment]}
          {item.sentiment}
        </span>
        <span className="text-xs text-ink-400 font-mono bg-ink-50 px-2 py-0.5 rounded border border-ink-200 whitespace-nowrap">
          {item.dimension}
        </span>
      </div>
      <blockquote className="font-mono text-sm text-ink-700 bg-ink-50 border-l-2 border-ink-300 pl-3 py-1 rounded-r-md my-2 italic">
        "{item.quote}"
      </blockquote>
      {item.explanation && (
        <p className="text-sm text-ink-500 mt-2">{item.explanation}</p>
      )}
    </div>
  );
}
