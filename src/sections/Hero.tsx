import React from 'react';
import hero from '../../content/hero.json';

interface HeroContent {
  name: string;
  headline: string;
  tagline?: string;
  summary?: string;
  keywords?: string[];
}

const heroContent: HeroContent = hero as HeroContent;

const Hero: React.FC = () => {
  const { name, headline, tagline, summary } = heroContent;
  return (
    <section id="intro" aria-labelledby="intro-heading" className="scroll-mt-24">
      <h1 id="intro-heading" className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">{name}</h1>
      <p className="max-w-2xl leading-relaxed text-sm sm:text-base text-text/90">
        {headline}
        {tagline ? ' ' + tagline : ''}
        {summary ? ' ' + summary : ''}
      </p>
    </section>
  );
};

export default Hero;
