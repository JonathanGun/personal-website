import React from 'react';

export interface NavLink {
  label: string;
  href: string;
}

interface NavBarProps {
  links: NavLink[];
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  onNavigate?: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ links, orientation = 'horizontal', className = '', onNavigate }) => {
  const base = orientation === 'horizontal'
    ? 'flex gap-5'
    : 'flex flex-col gap-4';
  return (
    <nav className={`${base} ${className}`} aria-label="Primary navigation">
      {links.map(l => (
        <a
          key={l.href}
            href={l.href}
            onClick={onNavigate}
            className="hover:text-accent transition-colors text-sm font-medium"
        >
          {l.label}
        </a>
      ))}
    </nav>
  );
};

export default NavBar;