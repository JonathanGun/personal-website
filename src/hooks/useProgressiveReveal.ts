import { useCallback, useMemo, useState } from 'react';

export interface LayeredItem { priority?: number }

export interface ProgressiveRevealOptions<T extends LayeredItem> {
  items: T[];
  initialPriority?: number; // default 0
  normalizePriority?: (item: T) => number; // optional override
}

export interface ProgressiveRevealResult<T extends LayeredItem> {
  visibleItems: T[];
  visiblePriority: number;
  maxPriority: number;
  hiddenCount: number; // remaining hidden items count
  fullyExpanded: boolean;
  showMore: () => void;
  reset: () => void; // go back to base layer (initialPriority)
}

const defaultNormalize = <T extends LayeredItem>(item: T) => (typeof item.priority === 'number' ? item.priority : 0);

export function useProgressiveReveal<T extends LayeredItem>(opts: ProgressiveRevealOptions<T>): ProgressiveRevealResult<T> {
  const { items, initialPriority = 0, normalizePriority = defaultNormalize } = opts;

  // Normalize items once (priority fallback to 0)
  const normalized = useMemo(() => items.map(i => ({ ...i, priority: normalizePriority(i) })), [items, normalizePriority]);

  const maxPriority = useMemo(() => normalized.reduce((m, i) => Math.max(m, i.priority ?? 0), 0), [normalized]);

  const [visiblePriority, setVisiblePriority] = useState(initialPriority);

  const visibleItems = useMemo(
    () => normalized.filter(i => (i.priority ?? 0) <= visiblePriority),
    [normalized, visiblePriority]
  );

  const hiddenCount = normalized.length - visibleItems.length;
  const fullyExpanded = visiblePriority >= maxPriority;

  const showMore = useCallback(() => {
    setVisiblePriority(p => (p >= maxPriority ? p : Math.min(p + 1, maxPriority)));
  }, [maxPriority]);

  const reset = useCallback(() => {
    setVisiblePriority(initialPriority);
  }, [initialPriority]);

  return { visibleItems, visiblePriority, maxPriority, hiddenCount, fullyExpanded, showMore, reset };
}

export default useProgressiveReveal;
