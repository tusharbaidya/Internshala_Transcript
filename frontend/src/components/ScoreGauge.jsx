export default function ScoreGauge({ score }) {
  if (!score) return null;
  const pct = (score / 10) * 100;

  const color =
    score >= 8 ? '#5d8463' :
    score >= 6 ? '#9d7f67' :
    score >= 4 ? '#c47c5a' : '#a85f3d';

  const label =
    score >= 9 ? 'Exceptional' :
    score >= 7 ? 'Exceeding Expectations' :
    score >= 5 ? 'Meeting Expectations' :
    score >= 3 ? 'Below Expectations' : 'Critical Issues';

  return (
    <div className="flex items-center gap-5">
      {/* Circular score */}
      <div className="relative w-20 h-20 flex-shrink-0">
        <svg viewBox="0 0 80 80" className="w-20 h-20 -rotate-90">
          <circle cx="40" cy="40" r="34" fill="none" stroke="#eeeae3" strokeWidth="8" />
          <circle
            cx="40" cy="40" r="34"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={`${2 * Math.PI * 34}`}
            strokeDashoffset={`${2 * Math.PI * 34 * (1 - pct / 100)}`}
            strokeLinecap="round"
            className="transition-all duration-700"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center rotate-0">
          <span className="font-display text-2xl text-ink-900">{score}</span>
        </div>
      </div>

      <div>
        <p className="font-display text-xl text-ink-900">{label}</p>
        <p className="text-sm text-ink-500 mt-0.5">Score {score} out of 10</p>
        <div className="mt-2 h-1.5 w-48 bg-ink-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${pct}%`, backgroundColor: color }}
          />
        </div>
      </div>
    </div>
  );
}
