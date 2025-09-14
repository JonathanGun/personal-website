import React from 'react';

interface IconProps { className?: string; }

const ExternalLinkIcon: React.FC<IconProps> = ({ className = 'h-4 w-4' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M12.5 3a.75.75 0 0 0 0 1.5h2.19l-6.97 6.97a.75.75 0 1 0 1.06 1.06l6.97-6.97V11.5a.75.75 0 0 0 1.5 0v-8A.75.75 0 0 0 16 2.75h-8a.75.75 0 0 0 0 1.5h4.5Z" />
    <path d="M4.25 5A2.25 2.25 0 0 0 2 7.25v8.5A2.25 2.25 0 0 0 4.25 18h8.5A2.25 2.25 0 0 0 15 15.75V12a.75.75 0 0 0-1.5 0v3.75c0 .414-.336.75-.75.75h-8.5a.75.75 0 0 1-.75-.75v-8.5c0-.414.336-.75.75-.75H8a.75.75 0 0 0 0-1.5H4.25Z" />
  </svg>
);

export default ExternalLinkIcon;
