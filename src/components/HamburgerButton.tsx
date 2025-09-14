import React from 'react';

interface HamburgerButtonProps {
  open: boolean;
  onToggle: () => void;
  className?: string;
  ariaLabelOpen?: string; // aria-label when menu is closed (intent to open)
  ariaLabelClose?: string; // aria-label when menu is open (intent to close)
}

// Accessible, animated hamburger button extracted for reuse.
const HamburgerButton: React.FC<HamburgerButtonProps> = ({
  open,
  onToggle,
  className = '',
  ariaLabelOpen = 'Open navigation',
  ariaLabelClose = 'Close navigation'
}) => {
  return (
    <button
      aria-label={open ? ariaLabelClose : ariaLabelOpen}
      aria-expanded={open}
      onClick={onToggle}
      className={`relative flex h-9 w-9 items-center justify-center rounded border border-border transition-colors hover:border-accent ${className}`}
      type="button"
    >
      <span className="sr-only">Menu</span>
      <span className="relative h-5 w-5">
        <span
          className={
            `absolute left-0 h-0.5 w-full rounded bg-text transition-all duration-300 ${
              open
                ? 'top-1/2 -translate-y-1/2 rotate-45'
                : 'top-0.5'
            }`
          }
        ></span>
        <span
          className={
            `absolute left-0 h-0.5 w-full rounded bg-text transition-all duration-300 ${
              open
                ? 'top-1/2 -translate-y-1/2 opacity-0 scale-x-0'
                : 'top-1/2 -translate-y-1/2'
            }`
          }
        ></span>
        <span
          className={
            `absolute left-0 h-0.5 w-full rounded bg-text transition-all duration-300 ${
              open
                ? 'top-1/2 -translate-y-1/2 -rotate-45'
                : 'bottom-0.5'
            }`
          }
        ></span>
      </span>
    </button>
  );
};

export default HamburgerButton;