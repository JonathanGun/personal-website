import React from 'react';
import '../styles/global.css';

interface Props { children: React.ReactNode; }

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="app-root">
      <header className="site-header">
        <div className="inner">
          <a href="/" className="brand">JG</a>
          <nav>
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
          </nav>
        </div>
      </header>
      <main className="site-main">{children}</main>
      <footer className="site-footer">© {new Date().getFullYear()} Jonathan Gunawan</footer>
    </div>
  );
};

export default Layout;
