import React from 'react';
import { useProgressiveReveal } from '../hooks/useProgressiveReveal';
import ProgressiveRevealControls from './ProgressiveRevealControls';

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
  const { visibleItems, visiblePriority, hiddenCount, fullyExpanded, maxPriority, reset, showMore } = useProgressiveReveal<AchievementData>({
    items,
    initialPriority,
    normalizePriority: a => (typeof a.priority === 'number' ? a.priority : 0)
  });

  return (
    <div>
      <ul className="space-y-4" id="achievements-list">
        {visibleItems.map(a => (
          <li key={a.title} className={`leading-snug ${(a.priority ?? 0) === 0 ? '' : 'opacity-90'}`}>
            <div className={`text-[0.7rem] font-semibold uppercase tracking-wider ${(a.priority ?? 0) === 0 ? 'text-text/60' : 'text-text/50'}`}>{a.year}</div>
            <div className={`text-sm ${(a.priority ?? 0) === 0 ? 'text-text/90' : 'text-text/80'}`}>
              {a.title}{a.detail ? <span className={(a.priority ?? 0) === 0 ? 'text-text/70' : 'text-text/60'}> – {a.detail}</span> : null}
            </div>
          </li>
        ))}
      </ul>
      {maxPriority > 0 && (
        <ProgressiveRevealControls
          id="achievements-list"
          canShowLess={visiblePriority > 0}
          canShowMore={!fullyExpanded}
          hiddenCount={hiddenCount}
          onShowLess={reset}
          onShowMore={showMore}
          baseLabel="achievements"
        />
      )}
    </div>
  );
};

export default AchievementsList;
