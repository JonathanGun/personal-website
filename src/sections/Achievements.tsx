import React from 'react';
import achievements from '../../content/achievements.json';
import AchievementsList from '../components/AchievementsList';

const Achievements: React.FC = () => {
  return (
    <section id="achievements" aria-label="Achievements & Awards" className="scroll-mt-24">
      <h2 className="mb-8 text-2xl font-semibold tracking-tight">Achievements</h2>
      <AchievementsList items={achievements as any} />
    </section>
  );
};

export default Achievements;