import React from 'react';

interface ProgressiveRevealControlsProps {
  id: string; // aria-controls target id
  canShowLess: boolean;
  canShowMore: boolean;
  hiddenCount: number;
  onShowMore: () => void;
  onShowLess: () => void;
  baseLabel?: string; // optional base label for aria descriptions
}

const ProgressiveRevealControls: React.FC<ProgressiveRevealControlsProps> = ({
  id,
  canShowLess,
  canShowMore,
  hiddenCount,
  onShowMore,
  onShowLess,
  baseLabel = 'items'
}) => {
  if (!canShowLess && !canShowMore) return null;

  return (
    <div className="mt-4 flex items-center gap-3">
      {canShowLess && (
        <button
          type="button"
          onClick={onShowLess}
          className="inline-flex items-center gap-2 rounded-md border border-border bg-bg-alt/60 px-4 py-2 text-sm font-medium text-text/90 shadow-sm transition hover:bg-bg-alt focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
          aria-controls={id}
          aria-label={`Show fewer ${baseLabel}`}
        >
          <span className="text-sm leading-none" aria-hidden="true">▴</span>
          Show less
        </button>
      )}
      {canShowMore && (
        <button
          type="button"
          onClick={onShowMore}
          className="inline-flex items-center gap-2 rounded-md border border-border bg-bg-alt/60 px-4 py-2 text-sm font-medium text-text/90 shadow-sm transition hover:bg-bg-alt focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
          aria-controls={id}
          aria-label={`Show more ${baseLabel}. ${hiddenCount} hidden`}
        >
          Show more <span className="text-sm leading-none" aria-hidden="true">▾</span> {hiddenCount > 0 && (
            <span className="text-[0.65rem] font-semibold text-text/60">(+{hiddenCount})</span>
          )}
        </button>
      )}
    </div>
  );
};

export default ProgressiveRevealControls;
