import React from 'react';
import education from '../../content/education.json';

type Edu = {
  institution: string
  degree: string
  gpa?: string
  start: string
  end: string
  priority?: number
};

const Education: React.FC = () => {
  const items = (education as Edu[]).map(e => ({ ...e, priority: typeof e.priority === 'number' ? e.priority : 0 }));
  const maxPriority = items.reduce((m, e) => Math.max(m, e.priority ?? 0), 0);
  const [visiblePriority, setVisiblePriority] = React.useState(0);
  const visible = items.filter(e => (e.priority ?? 0) <= visiblePriority);
  const hiddenCount = items.length - visible.length;
  const fullyExpanded = visiblePriority >= maxPriority;

  return (
    <section id="education" aria-label="Education" className="scroll-mt-24">
      <h2 className="mb-8 text-2xl font-semibold tracking-tight">Education</h2>
      <ul className="space-y-5" id="education-list">
        {visible.map(e => (
          <li key={e.institution} className={(e.priority ?? 0) === 0 ? '' : 'opacity-90'}>
            <h3 className="m-0 text-base font-semibold leading-snug">{e.institution}</h3>
            <div className={`text-[0.65rem] font-semibold uppercase tracking-wider ${(e.priority ?? 0) === 0 ? 'text-text/60' : 'text-text/50'}`}>{e.start} - {e.end}</div>
            <p className={`mt-1 text-sm leading-relaxed ${(e.priority ?? 0) === 0 ? 'text-text/90' : 'text-text/80'}`}>{e.degree}{e.gpa ? ` · GPA ${e.gpa}` : ''}</p>
          </li>
        ))}
      </ul>
      {maxPriority > 0 && (
        <div className="mt-4 flex items-center gap-3">
          {visiblePriority > 0 && (
            <button
              type="button"
              onClick={() => setVisiblePriority(0)}
              className="inline-flex items-center gap-2 rounded-md border border-border bg-bg-alt/60 px-4 py-2 text-sm font-medium text-text/90 shadow-sm transition hover:bg-bg-alt focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
              aria-controls="education-list"
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
              aria-controls="education-list"
            >
              Show more <span className="text-sm leading-none">▾</span> <span className="text-[0.65rem] font-semibold text-text/60">(+{hiddenCount})</span>
            </button>
          )}
        </div>
      )}
    </section>
  );
};

export default Education;