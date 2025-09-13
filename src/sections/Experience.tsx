import React from 'react';
import experience from '../../content/experience.json';

type ExperienceItem = {
  company: string;
  role: string;
  start: string;
  end: string;
  summary: string;
  bullets?: string[];
  extra?: boolean;
};

const Experience: React.FC = () => {
  const [showExtra, setShowExtra] = React.useState(false);
  const main = (experience as ExperienceItem[]).filter(e => !e.extra);
  const extra = (experience as ExperienceItem[]).filter(e => e.extra);
  return (
    <section id="experience" aria-label="Work Experience" className="scroll-mt-24">
      <h2 className="mb-8 text-2xl font-semibold tracking-tight">Experience</h2>
      <ol className="timeline" id="experience-timeline">
        {main.map((item: ExperienceItem) => (
          <li key={`${item.company}-${item.start}`} className="timeline-item">
            <span className="timeline-dot" />
            <h3 className="mb-1 font-medium leading-snug">{item.role} · {item.company}</h3>
            <div className="mb-2 text-[0.65rem] font-semibold uppercase tracking-wider text-text/60">{item.start} – {item.end}</div>
            <p className="m-0 mb-2 text-sm leading-relaxed text-text/90">{item.summary}</p>
            {item.bullets && item.bullets.length > 0 && (
              <ul className="m-0 list-disc pl-5 space-y-1 text-sm text-text/80">
                {item.bullets.map(b => (
                  <li key={b} className="marker:text-accent">{b}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
        {showExtra && extra.map((item: ExperienceItem) => (
          <li key={`${item.company}-${item.start}`} className="timeline-item opacity-90">
            <span className="timeline-dot" />
            <h3 className="mb-1 font-medium leading-snug">{item.role} · {item.company}</h3>
            <div className="mb-2 text-[0.65rem] font-semibold uppercase tracking-wider text-text/60">{item.start} – {item.end}</div>
            <p className="m-0 mb-2 text-sm leading-relaxed text-text/80">{item.summary}</p>
            {item.bullets && item.bullets.length > 0 && (
              <ul className="m-0 list-disc pl-5 space-y-1 text-sm text-text/70">
                {item.bullets.map(b => (
                  <li key={b} className="marker:text-accent/80">{b}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
      {extra.length > 0 && (
        <div className="mt-4">
          <button
            type="button"
            onClick={() => setShowExtra(v => !v)}
            className="inline-flex items-center gap-2 rounded-md border border-border bg-bg-alt/60 px-4 py-2 text-sm font-medium text-text/90 shadow-sm transition hover:bg-bg-alt focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
            aria-expanded={showExtra}
            aria-controls="experience-timeline"
          >
            {showExtra ? 'Show less' : `Show more`}
            <span className={`transition-transform ${showExtra ? 'rotate-180' : ''}`}>▾</span>
          </button>
        </div>
      )}
    </section>
  );
};

export default Experience;
