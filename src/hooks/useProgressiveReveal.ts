import { useCallback, useMemo, useState } from 'react';

export interface LayeredItem { priority?: number }

export interface ProgressiveRevealOptions<T extends LayeredItem> {
  /** Complete array of layered items */
  items: T[];
  /** Starting visible priority (defaults to 0) */
  initialPriority?: number;
  /** Convert arbitrary item into numeric priority (defaults to item.priority || 0) */
  normalizePriority?: (item: T) => number;
  /** Optional callback fired whenever visible priority changes */
  onChange?: (next: number, prev: number) => void;
}

export interface ProgressiveRevealResult<T extends LayeredItem> {
  /** Items with priority <= current visible priority */
  visibleItems: T[];
  /** Current highest visible priority */
  visiblePriority: number;
  /** Maximum priority present in the normalized items */
  maxPriority: number;
  /** Remaining hidden items (alias: remainingCount) */
  hiddenCount: number;
  /** Same as hiddenCount for clearer semantics */
  remainingCount: number;
  /** Whether visiblePriority has reached maxPriority */
  fullyExpanded: boolean;
  /** Increment visible priority by one layer (clamped) */
  showMore: () => void;
  /** Reset to initial priority */
  reset: () => void;
}

const defaultNormalize = <T extends LayeredItem>(item: T) => (typeof item.priority === 'number' ? item.priority : 0);

export function useProgressiveReveal<T extends LayeredItem>(opts: ProgressiveRevealOptions<T>): ProgressiveRevealResult<T> {
  const { items, initialPriority = 0, normalizePriority = defaultNormalize, onChange } = opts;

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
    setVisiblePriority(p => {
      if (p >= maxPriority) return p;
      const next = Math.min(p + 1, maxPriority);
      if (next !== p && onChange) onChange(next, p);
      return next;
    });
  }, [maxPriority, onChange]);

  const reset = useCallback(() => {
    setVisiblePriority(p => {
      if (p !== initialPriority && onChange) onChange(initialPriority, p);
      return initialPriority;
    });
  }, [initialPriority, onChange]);
  const result: ProgressiveRevealResult<T> = useMemo(() => ({
    visibleItems,
    visiblePriority,
    maxPriority,
    hiddenCount,
    remainingCount: hiddenCount,
    fullyExpanded,
    showMore,
    reset
  }), [visibleItems, visiblePriority, maxPriority, hiddenCount, fullyExpanded, showMore, reset]);

  return result;
}

export default useProgressiveReveal;
