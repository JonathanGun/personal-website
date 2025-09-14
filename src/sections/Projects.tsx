import React from 'react';
import projects from '../../content/projects.json';
import ProjectCard, { ProjectData } from '../components/ProjectCard';
import { useProgressiveReveal } from '../hooks/useProgressiveReveal';
import ProgressiveRevealControls from '../components/ProgressiveRevealControls';

type Project = ProjectData;

// Derive priority: default 0 when undefined
const computePriority = (p: Project): number => (typeof p.priority === 'number' ? p.priority : 0);

const Projects: React.FC = () => {
  const { visibleItems, hiddenCount, fullyExpanded, visiblePriority, maxPriority, showMore, reset } = useProgressiveReveal<Project>({
    items: (projects as Project[]),
    normalizePriority: computePriority,
  });

  return (
    <section id="projects" aria-labelledby="projects-heading" className="scroll-mt-24">
      <h2 id="projects-heading" className="mb-8 text-2xl font-semibold tracking-tight">Projects</h2>
      <div className="grid gap-6 sm:grid-cols-3">
        {visibleItems.map((p: Project) => (
          <ProjectCard
            key={p.slug}
            project={p}
            variant={(p.priority ?? 0) === 0 ? 'main' : 'extra'}
          />
        ))}
      </div>
      {maxPriority > 0 && (
        <div className="mt-6 flex justify-center">
          <ProgressiveRevealControls
            id="projects"
            canShowLess={visiblePriority > 0}
            canShowMore={!fullyExpanded}
            hiddenCount={hiddenCount}
            onShowLess={reset}
            onShowMore={showMore}
            baseLabel="projects"
            expanded={visiblePriority > 0}
          />
        </div>
      )}
    </section>
  );
};

export default Projects;
