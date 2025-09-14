import React from 'react';
import skills from '../../content/skills.json';

type SkillsShape = Record<string, string[]>;

const Skills: React.FC = () => {
  const data = skills as SkillsShape;
  return (
    <section id="skills" aria-labelledby="skills-heading" className="scroll-mt-24">
      <h2 id="skills-heading" className="mb-8 text-2xl font-semibold tracking-tight">Skills</h2>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {Object.entries(data).map(([group, list]) => (
          <div key={group}>
            <h3 className="mb-2 text-[0.65rem] font-semibold uppercase tracking-wider text-text/60">{group}</h3>
            <div className="flex flex-wrap gap-2">
              {list.map(item => <span key={item} className="badge">{item}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;