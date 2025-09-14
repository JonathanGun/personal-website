import React from 'react';
import experience from '../../content/experience.json';

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
  const items = (experience as ExperienceItem[]).map(e => ({ ...e, priority: typeof e.priority === 'number' ? e.priority : 0 }));
  const maxPriority = items.reduce((m, e) => Math.max(m, e.priority ?? 0), 0);
  const [visiblePriority, setVisiblePriority] = React.useState(0);
  const visible = items.filter(e => (e.priority ?? 0) <= visiblePriority);
  const hiddenCount = items.length - visible.length;
  const fullyExpanded = visiblePriority >= maxPriority;

  const toggle = () => {
    if (fullyExpanded) setVisiblePriority(0); else setVisiblePriority(p => Math.min(p + 1, maxPriority));
  };

  return (
    <section id="experience" aria-label="Work Experience" className="scroll-mt-24">
      <h2 className="mb-8 text-2xl font-semibold tracking-tight">Experience</h2>
      <ol className="timeline" id="experience-timeline">
        {visible.map(item => (
          <li
            key={`${item.company}-${item.start}`}
            className={`timeline-item ${(item.priority ?? 0) === 0 ? '' : 'opacity-90'}`}
          >
            <span className="timeline-dot" />
            <h3 className="mb-1 font-medium leading-snug">{item.role} · {item.company}</h3>
            <div className="mb-2 text-[0.65rem] font-semibold uppercase tracking-wider text-text/60">{item.start} – {item.end}</div>
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
        <div className="mt-4 flex items-center gap-3">
          {visiblePriority > 0 && (
            <button
              type="button"
              onClick={() => setVisiblePriority(0)}
              className="inline-flex items-center gap-2 rounded-md border border-border bg-bg-alt/60 px-4 py-2 text-sm font-medium text-text/90 shadow-sm transition hover:bg-bg-alt focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
              aria-controls="experience-timeline"
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
              aria-controls="experience-timeline"
            >
              Show more
              <span className="text-sm leading-none">▾</span>
              <span className="text-[0.65rem] font-semibold text-text/60">(+{hiddenCount})</span>
            </button>
          )}
        </div>
      )}
    </section>
  );
};

export default Experience;
