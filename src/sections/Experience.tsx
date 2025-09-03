import React from 'react';
import experience from '../../content/experience.json';

type ExperienceItem = {
  company: string;
  role: string;
  start: string;
  end: string;
  summary: string;
};

const Experience: React.FC = () => {
  return (
    <section id="experience" aria-label="Work Experience">
      <h2 className="section-title">Experience</h2>
      <ol className="timeline">
        {experience.map((item: ExperienceItem) => (
          <li key={`${item.company}-${item.start}`} className="timeline-item">
            <span className="timeline-dot" />
            <h3 style={{ margin: '0 0 .25rem' }}>{item.role} · {item.company}</h3>
            <div style={{ fontSize: '.75rem', opacity: .7, letterSpacing: '.5px', textTransform: 'uppercase', marginBottom: '.4rem' }}>{item.start} – {item.end}</div>
            <p style={{ margin: 0, lineHeight: 1.45 }}>{item.summary}</p>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default Experience;
