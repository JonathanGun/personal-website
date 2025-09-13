import React from 'react';
import education from '../../content/education.json';

type Edu = { institution: string; degree: string; gpa?: string; start: string; end: string; extra?: boolean };

const Education: React.FC = () => {
  const [showExtra, setShowExtra] = React.useState(false);
  const main = (education as Edu[]).filter(e => !e.extra);
  const extra = (education as Edu[]).filter(e => e.extra);
  return (
    <section id="education" aria-label="Education" className="scroll-mt-24">
      <h2 className="mb-8 text-2xl font-semibold tracking-tight">Education</h2>
      <ul className="space-y-5" id="education-list">
        {main.map(e => (
          <li key={e.institution}>
            <h3 className="m-0 text-base font-semibold leading-snug">{e.institution}</h3>
            <div className="text-[0.65rem] font-semibold uppercase tracking-wider text-text/60">{e.start} - {e.end}</div>
            <p className="mt-1 text-sm leading-relaxed text-text/90">{e.degree}{e.gpa ? ` · GPA ${e.gpa}` : ''}</p>
          </li>
        ))}
        {showExtra && extra.map(e => (
          <li key={e.institution} className="opacity-90">
            <h3 className="m-0 text-base font-semibold leading-snug">{e.institution}</h3>
            <div className="text-[0.65rem] font-semibold uppercase tracking-wider text-text/50">{e.start} - {e.end}</div>
            <p className="mt-1 text-sm leading-relaxed text-text/80">{e.degree}{e.gpa ? ` · GPA ${e.gpa}` : ''}</p>
          </li>
        ))}
      </ul>
      {extra.length > 0 && (
        <div className="mt-4">
          <button
            type="button"
            onClick={() => setShowExtra(v => !v)}
            className="inline-flex items-center gap-2 rounded-md border border-border bg-bg-alt/60 px-4 py-2 text-sm font-medium text-text/90 shadow-sm transition hover:bg-bg-alt focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
            aria-expanded={showExtra}
            aria-controls="education-list"
          >
            {showExtra ? 'Show fewer entries' : `Show ${extra.length} more entries`}
            <span className={`transition-transform ${showExtra ? 'rotate-180' : ''}`}>▾</span>
          </button>
        </div>
      )}
    </section>
  );
};

export default Education;