import React from 'react';

const Hero: React.FC = () => {
  return (
    <section aria-label="Intro" className="scroll-mt-24">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Jonathan Yudi Gunawan</h1>
      <p className="max-w-2xl leading-relaxed text-sm sm:text-base text-text/90">
        Infrastructure engineer focused on cloud platforms, database reliability, and automation. Track record scaling distributed systems and building developer tooling. Award‑winning competitive programmer passionate about making systems faster, safer, and more efficient.
      </p>
    </section>
  );
};

export default Hero;
