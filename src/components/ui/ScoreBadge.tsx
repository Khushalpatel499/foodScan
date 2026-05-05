import type { HealthScore } from '../../types';

interface ScoreBadgeProps {
  healthScore: HealthScore;
}

const colorMap = {
  green: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800',
  yellow: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800',
  red: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800',
};

const ringColor = {
  green: 'stroke-green-500',
  yellow: 'stroke-amber-500',
  red: 'stroke-red-500',
};

export function ScoreBadge({ healthScore }: ScoreBadgeProps) {
  const { score, label, color } = healthScore;
  const circumference = 2 * Math.PI * 36;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className={`flex items-center gap-4 p-4 rounded-2xl border ${colorMap[color]}`}>
      {/* Circular progress */}
      <div className="relative w-20 h-20 flex-shrink-0">
        <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="36" fill="none" strokeWidth="6" className="stroke-gray-200 dark:stroke-gray-700" />
          <circle
            cx="40" cy="40" r="36" fill="none" strokeWidth="6"
            strokeDasharray={circumference} strokeDashoffset={offset}
            strokeLinecap="round" className={`${ringColor[color]} transition-all duration-700`}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-lg font-bold">{score}</span>
      </div>

      <div>
        <p className="text-lg font-bold">{label}</p>
        <p className="text-sm opacity-75">Health Score</p>
      </div>
    </div>
  );
}
