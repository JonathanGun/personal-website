import React from 'react';
import projects from '../../content/projects.json';

type Project = {
  slug: string;
  name: string;
  description: string;
  tech: string[];
  image: string;
  url?: string;
  repo?: string;
};

const Projects: React.FC = () => {
  return (
    <section id="projects" aria-label="Selected Projects">
      <h2 className="section-title">Projects</h2>
      <div className="card-grid">
        {projects.map((p: Project) => (
          <article key={p.slug} className="project-card" aria-labelledby={`proj-${p.slug}`}>            
            <img src={p.image} alt="" loading="lazy" />
            <h3 id={`proj-${p.slug}`} style={{ margin: '0 0 .4rem', fontSize: '1.05rem' }}>
              {p.url ? <a href={p.url}>{p.name}</a> : p.name}
            </h3>
            <p style={{ margin: 0, fontSize: '.85rem', lineHeight: 1.45 }}>{p.description}</p>
            <div className="badges">
              {p.tech.map(t => <span key={t} className="badge">{t}</span>)}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Projects;
