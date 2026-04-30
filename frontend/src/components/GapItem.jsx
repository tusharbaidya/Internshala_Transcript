import { AlertCircle } from 'lucide-react';

export default function GapItem({ item }) {
  return (
    <div className="flex gap-3 p-3 bg-clay-400/8 border border-clay-400/20 rounded-lg animate-slide-up">
      <AlertCircle className="w-4 h-4 text-clay-500 flex-shrink-0 mt-0.5" />
      <div>
        <p className="text-sm font-medium text-ink-800">{item.dimension}</p>
        <p className="text-sm text-ink-500 mt-0.5">{item.description}</p>
      </div>
    </div>
  );
}
