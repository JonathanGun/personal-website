import React from 'react';

export interface AchievementData {
  year: string;
  title: string;
  detail?: string;
  priority?: number; // 0 default layer
}

interface AchievementsListProps {
  items: AchievementData[];
  initialPriority?: number; // defaults to 0
}

const AchievementsList: React.FC<AchievementsListProps> = ({ items, initialPriority = 0 }) => {
  const normalized = React.useMemo(() => items.map(a => ({ ...a, priority: typeof a.priority === 'number' ? a.priority : 0 })), [items]);
  const maxPriority = normalized.reduce((m, a) => Math.max(m, a.priority ?? 0), 0);
  const [visiblePriority, setVisiblePriority] = React.useState(initialPriority);

  const visible = normalized.filter(a => (a.priority ?? 0) <= visiblePriority);
  const hiddenCount = normalized.length - visible.length;
  const fullyExpanded = visiblePriority >= maxPriority;

  return (
    <div>
      <ul className="space-y-4" id="achievements-list">
        {visible.map(a => (
          <li key={a.title} className={`leading-snug ${(a.priority ?? 0) === 0 ? '' : 'opacity-90'}`}>
            <div className={`text-[0.7rem] font-semibold uppercase tracking-wider ${(a.priority ?? 0) === 0 ? 'text-text/60' : 'text-text/50'}`}>{a.year}</div>
            <div className={`text-sm ${(a.priority ?? 0) === 0 ? 'text-text/90' : 'text-text/80'}`}>
              {a.title}{a.detail ? <span className={(a.priority ?? 0) === 0 ? 'text-text/70' : 'text-text/60'}> – {a.detail}</span> : null}
            </div>
          </li>
        ))}
      </ul>
      {maxPriority > 0 && (
        <div className="mt-4 flex items-center gap-3">
          {visiblePriority > 0 && (
            <button
              type="button"
              onClick={() => setVisiblePriority(initialPriority)}
              className="inline-flex items-center gap-2 rounded-md border border-border bg-bg-alt/60 px-4 py-2 text-sm font-medium text-text/90 shadow-sm transition hover:bg-bg-alt focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
              aria-controls="achievements-list"
            >
              <span className="text-sm leading-none">▴</span>
              Show less
            </button>
          )}
          {!fullyExpanded && (
            <button
              type="button"
              onClick={() => setVisiblePriority(p => Math.min(p + 1, maxPriority))}
              className="inline-flex items-center gap-2 rounded-md border border-border bg-bg-alt/60 px-4 py-2 text-sm font-medium text-text/90 shadow-sm transition hover:bg-bg-alt focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
              aria-controls="achievements-list"
            >
              Show more <span className="text-sm leading-none">▾</span> <span className="text-[0.65rem] font-semibold text-text/60">(+{hiddenCount})</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AchievementsList;
