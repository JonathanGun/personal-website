import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import Layout from '../components/Layout';
import Hero from '../sections/Hero';
import Experience from '../sections/Experience';
import Projects from '../sections/Projects';

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <Hero />
      <Experience />
      <Projects />
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Jonathan Gunawan</title>;
