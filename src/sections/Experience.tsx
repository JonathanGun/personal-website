import React from 'react';
import experience from '../../content/experience.json';
import { useProgressiveReveal } from '../hooks/useProgressiveReveal';
import ProgressiveRevealControls from '../components/ProgressiveRevealControls';

type ExperienceItem = {
  company: string;
  role: string;
  start: string;
  end: string;
  summary: string;
  bullets?: string[];
  priority?: number; // 0 base layer
};

const Experience: React.FC = () => {
  const { visibleItems, visiblePriority, maxPriority, hiddenCount, fullyExpanded, reset, showMore } = useProgressiveReveal<ExperienceItem>({
    items: (experience as ExperienceItem[]),
    normalizePriority: e => (typeof e.priority === 'number' ? e.priority : 0)
  });

  return (
    <section id="experience" aria-labelledby="experience-heading" className="scroll-mt-24">
      <h2 id="experience-heading" className="mb-8 text-2xl font-semibold tracking-tight">Experience</h2>
      <ol className="timeline" id="experience-timeline">
        {visibleItems.map(item => (
          <li
            key={`${item.company}-${item.start}`}
            className={`timeline-item ${(item.priority ?? 0) === 0 ? '' : 'opacity-90'}`}
          >
            <span className="timeline-dot" />
            <h3 className="mb-1 font-medium leading-snug">{item.role} · {item.company}</h3>
            <div className="mb-2 text-[0.65rem] font-semibold uppercase tracking-wider text-text/60">
              <time dateTime={item.start}>{item.start}</time> – <time dateTime={item.end}>{item.end}</time>
            </div>
            <p className={`m-0 mb-2 text-sm leading-relaxed ${(item.priority ?? 0) === 0 ? 'text-text/90' : 'text-text/80'}`}>{item.summary}</p>
            {item.bullets && item.bullets.length > 0 && (
              <ul className={`m-0 list-disc pl-5 space-y-1 text-sm ${(item.priority ?? 0) === 0 ? 'text-text/80' : 'text-text/70'}`}>
                {item.bullets.map(b => (
                  <li key={b} className={`marker:${(item.priority ?? 0) === 0 ? 'text-accent' : 'text-accent/80'}`}>{b}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
      {maxPriority > 0 && (
        <ProgressiveRevealControls
          id="experience-timeline"
          canShowLess={visiblePriority > 0}
          canShowMore={!fullyExpanded}
          hiddenCount={hiddenCount}
          onShowLess={reset}
          onShowMore={showMore}
          baseLabel="experience items"
          expanded={visiblePriority > 0}
        />
      )}
    </section>
  );
};

export default Experience;
