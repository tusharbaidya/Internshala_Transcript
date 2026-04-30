import { MessageSquare } from 'lucide-react';

export default function FollowUpQuestion({ item, index }) {
  return (
    <div className="flex gap-3 animate-slide-up">
      <div className="w-6 h-6 rounded-full bg-ink-900 text-white flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
        {index + 1}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-ink-800">{item.question}</p>
        {item.targetGap && (
          <span className="inline-flex items-center gap-1 mt-1 text-xs text-ink-400">
            <MessageSquare className="w-3 h-3" />
            Targets: {item.targetGap}
          </span>
        )}
      </div>
    </div>
  );
}
