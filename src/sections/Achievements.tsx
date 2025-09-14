import React from 'react';
import achievements from '../../content/achievements.json';
import { useProgressiveReveal } from '../hooks/useProgressiveReveal';
import ProgressiveRevealControls from '../components/ProgressiveRevealControls';

interface AchievementData {
  year: string;
  title: string;
  detail?: string;
  priority?: number;
}

const Achievements: React.FC = () => {
  const { visibleItems, visiblePriority, hiddenCount, fullyExpanded, maxPriority, reset, showMore } = useProgressiveReveal<AchievementData>({
    items: achievements as AchievementData[],
    normalizePriority: a => (typeof a.priority === 'number' ? a.priority : 0)
  });
  return (
    <section id="achievements" aria-labelledby="achievements-heading" className="scroll-mt-24">
      <h2 id="achievements-heading" className="mb-8 text-2xl font-semibold tracking-tight">Achievements</h2>
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
          expanded={visiblePriority > 0}
        />
      )}
    </section>
  );
};

export default Achievements;