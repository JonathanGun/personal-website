import React from 'react';
import achievements from '../../content/achievements.json';

type Achievement = { year: string; title: string; detail?: string; extra?: boolean };

const Achievements: React.FC = () => {
  const [showExtra, setShowExtra] = React.useState(false);
  const main = (achievements as Achievement[]).filter(a => !a.extra);
  const extra = (achievements as Achievement[]).filter(a => a.extra);
  return (
    <section id="achievements" aria-label="Achievements & Awards" className="scroll-mt-24">
      <h2 className="mb-8 text-2xl font-semibold tracking-tight">Achievements</h2>
      <ul className="space-y-4" id="achievements-list">
        {main.map(a => (
          <li key={a.title} className="leading-snug">
            <div className="text-[0.7rem] font-semibold uppercase tracking-wider text-text/60">{a.year}</div>
            <div className="text-sm text-text/90">
              {a.title}{a.detail ? <span className="text-text/70"> – {a.detail}</span> : null}
            </div>
          </li>
        ))}
        {showExtra && extra.map(a => (
          <li key={a.title} className="leading-snug opacity-90">
            <div className="text-[0.7rem] font-semibold uppercase tracking-wider text-text/50">{a.year}</div>
            <div className="text-sm text-text/80">
              {a.title}{a.detail ? <span className="text-text/60"> – {a.detail}</span> : null}
            </div>
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
            aria-controls="achievements-list"
          >
            {showExtra ? 'Show fewer achievements' : `Show ${extra.length} more achievements`}
            <span className={`transition-transform ${showExtra ? 'rotate-180' : ''}`}>▾</span>
          </button>
        </div>
      )}
    </section>
  );
};

export default Achievements;