import React, { useState } from 'react';
import NavBar, { NavLink } from './NavBar';
import '../styles/global.css';

interface Props { children: React.ReactNode; }

const Layout: React.FC<Props> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(o => !o);
  const close = () => setOpen(false);
  const links: NavLink[] = [
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Achievements', href: '#achievements' },
    { label: 'Education', href: '#education' },
    { label: 'Skills', href: '#skills' }
  ];
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur supports-[backdrop-filter]:bg-bg/70">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
          <a href="/" className="text-lg font-bold tracking-wide text-accent" onClick={close}>JG</a>
          <NavBar links={links} onNavigate={close} className="hidden md:flex" />
          <button
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            aria-expanded={open}
            onClick={toggle}
            className="md:hidden relative h-9 w-9 rounded border border-border flex items-center justify-center transition-colors hover:border-accent"
          >
            <span className="sr-only">Menu</span>
            <span className="relative flex h-5 w-5 flex-col items-center justify-between">
              <span className={`block h-0.5 w-full origin-center rounded bg-text transition-all duration-300 ${open ? 'translate-y-2 rotate-45' : ''}`}></span>
              <span className={`block h-0.5 w-full origin-center rounded bg-text transition-all duration-300 ${open ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'}`}></span>
              <span className={`block h-0.5 w-full origin-center rounded bg-text transition-all duration-300 ${open ? '-translate-y-2 -rotate-45' : ''}`}></span>
            </span>
          </button>
        </div>
        {/* Mobile tray */}
        <div
          className={`md:hidden overflow-hidden border-b border-border bg-bg/95 backdrop-blur transition-[max-height,opacity] duration-300 ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <NavBar links={links} orientation="vertical" onNavigate={close} className="mx-auto max-w-5xl px-5 py-6" />
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl flex-1 px-5 py-10 space-y-20">{children}</main>
      <footer className="mt-10 border-t border-border py-8 text-center text-xs tracking-wide text-text/70">© {new Date().getFullYear()} Jonathan Gunawan</footer>
    </div>
  );
};

export default Layout;
