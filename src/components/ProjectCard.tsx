import React from 'react';
import { withPrefix } from 'gatsby';
import ExternalLinkIcon from './icons/ExternalLinkIcon';
import GitHubIcon from './icons/GitHubIcon';

export type ProjectData = {
  slug: string;
  name: string;
  description: string;
  tech: string[];
  image?: string; // optional; fallback placeholder will be used if absent
  url?: string;
  repo?: string;
  priority?: number; // 0 = always visible; higher numbers revealed incrementally
};

type Variant = 'main' | 'extra';

interface ProjectCardProps {
  project: ProjectData;
  variant?: Variant;
}

const placeholderFor = (name: string) => `https://placehold.co/600x400/0d1117/ffffff?text=${encodeURIComponent(name)}`;

const resolveImage = (src: string | undefined, name: string) => {
  if (!src) return placeholderFor(name);
  if (src.startsWith('http://') || src.startsWith('https://')) return src;
  const normalized = src.startsWith('/') ? src : `/${src.replace(/^\\+/, '')}`;
  return withPrefix(normalized);
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, variant = 'main' }) => {
  const { slug, name, description, tech, image, url, repo } = project;
  const containerBase = 'group flex flex-col overflow-hidden rounded-lg border p-4 shadow-sm transition hover:shadow-md';
  const variantClasses = variant === 'main'
    ? 'border-border bg-bg-alt/40'
    : 'border-border bg-bg-alt/30';
  const textDesc = variant === 'main' ? 'text-text/90' : 'text-text/80';
  const badgeExtra = variant === 'main' ? '' : ' opacity-80';

  return (
    <article
      key={slug}
      className={`${containerBase} ${variantClasses}`}
      aria-labelledby={`proj-${slug}`}
    >
      <div className="relative mb-3 overflow-hidden rounded-md border border-border/60 bg-bg/40">
        {(url || repo) && (
          <div className="absolute right-2 top-2 z-10 flex gap-2">
            {repo && (
              <a
                href={repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-bg-alt/80 text-text/80 backdrop-blur-sm transition hover:bg-bg-alt hover:text-text"
                aria-label={`Open GitHub repository for ${name}`}
              >
                <GitHubIcon />
                <span className="sr-only">Open GitHub repository</span>
              </a>
            )}
            {url && (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-bg-alt/80 text-text/80 backdrop-blur-sm transition hover:bg-bg-alt hover:text-text"
                aria-label={`Open live site for ${name}`}
              >
                <ExternalLinkIcon />
                <span className="sr-only">Open live site</span>
              </a>
            )}
          </div>
        )}
        <img
          className="aspect-video h-auto w-full object-cover transition group-hover:scale-[1.02]"
          src={resolveImage(image, name)}
          alt={`Screenshot of ${name}`}
          loading="lazy"
          decoding="async"
        />
      </div>
      <h3 id={`proj-${slug}`} className="mb-2 text-base font-semibold leading-snug">
        { (url || repo) ? (
          <a
            className="hover:underline"
            href={url || repo}
            target="_blank"
            rel="noopener noreferrer"
          >
            {name}
          </a>
        ) : name }
      </h3>
      <p className={`mb-3 flex-1 text-sm leading-relaxed ${textDesc}`}>{description}</p>
      <div className="flex flex-wrap gap-2">
        {tech.map(t => <span key={t} className={`badge${badgeExtra}`}>{t}</span>)}
      </div>
    </article>
  );
};

export default ProjectCard;