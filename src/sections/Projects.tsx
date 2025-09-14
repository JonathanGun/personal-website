import React from 'react';
import { withPrefix } from 'gatsby';
import projects from '../../content/projects.json';
import ProjectCard, { ProjectData } from '../components/ProjectCard';
// Using root-served static images placed in /static/images. JSON supplies root-relative URLs (e.g. /images/foo.png)

type Project = ProjectData;

const Projects: React.FC = () => {
  const [showExtra, setShowExtra] = React.useState(false);
  const main = (projects as Project[]).filter(p => !p.extra);
  const extra = (projects as Project[]).filter(p => p.extra);

  return (
    <section id="projects" aria-label="Selected Projects" className="scroll-mt-24">
      <h2 className="mb-8 text-2xl font-semibold tracking-tight">Projects</h2>
      <div className="grid gap-6 sm:grid-cols-3">
        {main.map((p: Project) => (
          <ProjectCard key={p.slug} project={p} variant="main" />
        ))}
        {showExtra && extra.map((p: Project) => (
          <ProjectCard key={p.slug} project={p} variant="extra" />
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
