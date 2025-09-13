import React from 'react';
import { withPrefix } from 'gatsby';
import projects from '../../content/projects.json';
// Using root-served static images placed in /static/images. JSON supplies root-relative URLs (e.g. /images/foo.png)

type Project = {
  slug: string;
  name: string;
  description: string;
  tech: string[];
  image: string;
  url?: string;
  extra?: boolean;
};

const Projects: React.FC = () => {
  const resolveSrc = (src: string) => src.startsWith('/') ? withPrefix(src) : withPrefix('/images/icon.png');
  const [showExtra, setShowExtra] = React.useState(false);
  const main = (projects as Project[]).filter(p => !p.extra);
  const extra = (projects as Project[]).filter(p => p.extra);

  return (
    <section id="projects" aria-label="Selected Projects" className="scroll-mt-24">
      <h2 className="mb-8 text-2xl font-semibold tracking-tight">Projects</h2>
      <div className="grid gap-6 sm:grid-cols-3">
        {main.map((p: Project) => (
          <article
            key={p.slug}
            className="group flex flex-col overflow-hidden rounded-lg border border-border bg-bg-alt/40 p-4 shadow-sm transition hover:shadow-md"
            aria-labelledby={`proj-${p.slug}`}
          >
            <div className="mb-3 overflow-hidden rounded-md border border-border/60 bg-bg/40">
              <img
                className="aspect-video h-auto w-full object-cover transition group-hover:scale-[1.02]"
                src={resolveSrc(p.image)}
                alt={p.name}
                loading="lazy"
              />
            </div>
            <h3 id={`proj-${p.slug}`} className="mb-2 text-base font-semibold leading-snug">
              {p.url ? <a className="hover:underline" href={p.url}>{p.name}</a> : p.name}
            </h3>
            <p className="mb-3 flex-1 text-sm leading-relaxed text-text/90">{p.description}</p>
            <div className="flex flex-wrap gap-2">
              {p.tech.map(t => <span key={t} className="badge">{t}</span>)}
            </div>
          </article>
        ))}
        {showExtra && extra.map((p: Project) => (
          <article
            key={p.slug}
            className="group flex flex-col overflow-hidden rounded-lg border border-border bg-bg-alt/30 p-4 shadow-sm transition hover:shadow-md"
            aria-labelledby={`proj-${p.slug}`}
          >
            <div className="mb-3 overflow-hidden rounded-md border border-border/40 bg-bg/40">
              <img
                className="aspect-video h-auto w-full object-cover"
                src={resolveSrc(p.image)}
                alt={p.name}
                loading="lazy"
              />
            </div>
            <h3 id={`proj-${p.slug}`} className="mb-2 text-base font-semibold leading-snug">
              {p.url ? <a className="hover:underline" href={p.url}>{p.name}</a> : p.name}
            </h3>
            <p className="mb-3 flex-1 text-sm leading-relaxed text-text/80">{p.description}</p>
            <div className="flex flex-wrap gap-2">
              {p.tech.map(t => <span key={t} className="badge opacity-80">{t}</span>)}
            </div>
          </article>
        ))}
      </div>
      {extra.length > 0 && (
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setShowExtra(v => !v)}
            className="inline-flex items-center gap-2 rounded-md border border-border bg-bg-alt/60 px-4 py-2 text-sm font-medium text-text/90 shadow-sm transition hover:bg-bg-alt focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
            aria-expanded={showExtra}
            aria-controls="extra-projects"
          >
            {showExtra ? 'Show less' : `Show ${extra.length} more projects`}
            <span className={`transition-transform ${showExtra ? 'rotate-180' : ''}`}>▾</span>
          </button>
        </div>
      )}
    </section>
  );
};

export default Projects;
