import React from 'react';
import education from '../../content/education.json';
import { useProgressiveReveal } from '../hooks/useProgressiveReveal';
import ProgressiveRevealControls from '../components/ProgressiveRevealControls';

type Edu = {
  institution: string
  degree: string
  gpa?: string
  start: string
  end: string
  priority?: number
};

const Education: React.FC = () => {
  const { visibleItems, visiblePriority, maxPriority, hiddenCount, fullyExpanded, reset, showMore } = useProgressiveReveal<Edu>({
    items: (education as Edu[]),
    normalizePriority: e => (typeof e.priority === 'number' ? e.priority : 0)
  });

  return (
    <section id="education" aria-labelledby="education-heading" className="scroll-mt-24">
      <h2 id="education-heading" className="mb-8 text-2xl font-semibold tracking-tight">Education</h2>
      <ul className="space-y-5" id="education-list">
        {visibleItems.map(e => (
          <li key={e.institution} className={(e.priority ?? 0) === 0 ? '' : 'opacity-90'}>
            <h3 className="m-0 text-base font-semibold leading-snug">{e.institution}</h3>
            <div className={`text-[0.65rem] font-semibold uppercase tracking-wider ${(e.priority ?? 0) === 0 ? 'text-text/60' : 'text-text/50'}`}>
              <time dateTime={e.start}>{e.start}</time> – <time dateTime={e.end}>{e.end}</time>
            </div>
            <p className={`mt-1 text-sm leading-relaxed ${(e.priority ?? 0) === 0 ? 'text-text/90' : 'text-text/80'}`}>{e.degree}{e.gpa ? ` · GPA ${e.gpa}` : ''}</p>
          </li>
        ))}
      </ul>
      {maxPriority > 0 && (
        <ProgressiveRevealControls
          id="education-list"
          canShowLess={visiblePriority > 0}
          canShowMore={!fullyExpanded}
          hiddenCount={hiddenCount}
          onShowLess={reset}
          onShowMore={showMore}
          baseLabel="education items"
          expanded={visiblePriority > 0}
        />
      )}
    </section>
  );
};

export default Education;