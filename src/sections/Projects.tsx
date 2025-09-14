import React from 'react';
import projects from '../../content/projects.json';
import ProjectCard, { ProjectData } from '../components/ProjectCard';

type Project = ProjectData;

// Derive priority: default 0 when undefined
const computePriority = (p: Project): number => (typeof p.priority === 'number' ? p.priority : 0);

const Projects: React.FC = () => {
  const all = (projects as Project[]).map(p => ({ ...p, priority: computePriority(p) }));
  const maxPriority = all.reduce((m, p) => Math.max(m, p.priority ?? 0), 0);
  const [visiblePriority, setVisiblePriority] = React.useState(0);

  const visible = all.filter(p => (p.priority ?? 0) <= visiblePriority);
  const nextHiddenCount = all.filter(p => (p.priority ?? 0) > visiblePriority).length;
  const fullyExpanded = visiblePriority >= maxPriority;

  const handleToggle = () => {
    if (fullyExpanded) {
      setVisiblePriority(0);
    } else {
      setVisiblePriority(p => Math.min(p + 1, maxPriority));
    }
  };

  return (
    <section id="projects" aria-label="Selected Projects" className="scroll-mt-24">
      <h2 className="mb-8 text-2xl font-semibold tracking-tight">Projects</h2>
      <div className="grid gap-6 sm:grid-cols-3">
        {visible.map((p: Project) => (
          <ProjectCard
            key={p.slug}
            project={p}
            variant={(p.priority ?? 0) === 0 ? 'main' : 'extra'}
          />
        ))}
      </div>
      {maxPriority > 0 && (
        <div className="mt-6 flex items-center justify-center gap-3">
          {visiblePriority > 0 && (
            <button
              type="button"
              onClick={() => setVisiblePriority(0)}
              className="inline-flex items-center gap-2 rounded-md border border-border bg-bg-alt/60 px-4 py-2 text-sm font-medium text-text/90 shadow-sm transition hover:bg-bg-alt focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
              aria-controls="projects"
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
              aria-controls="projects"
            >
              Show more
              <span className="text-sm leading-none">▾</span>
              <span className="text-[0.65rem] font-semibold text-text/60">(+{nextHiddenCount})</span>
            </button>
          )}
        </div>
      )}
    </section>
  );
};

export default Projects;
