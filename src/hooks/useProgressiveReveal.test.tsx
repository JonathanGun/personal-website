import { renderHook, act } from '@testing-library/react';
import { useProgressiveReveal } from './useProgressiveReveal';

describe('useProgressiveReveal', () => {
  const items = [
    { id: 'a', priority: 0 },
    { id: 'b', priority: 0 },
    { id: 'c', priority: 1 },
    { id: 'd', priority: 2 },
  ];

  it('initializes with base layer only', () => {
    const { result } = renderHook(() => useProgressiveReveal({ items }));
    expect(result.current.visibleItems.map(i => i.id)).toEqual(['a', 'b']);
    expect(result.current.hiddenCount).toBe(2);
    expect(result.current.fullyExpanded).toBe(false);
  });

  it('showMore reveals next layer incrementally', () => {
    const { result } = renderHook(() => useProgressiveReveal({ items }));
    act(() => result.current.showMore());
    expect(result.current.visibleItems.map(i => i.id)).toEqual(['a', 'b', 'c']);
    expect(result.current.hiddenCount).toBe(1);
    expect(result.current.fullyExpanded).toBe(false);
    act(() => result.current.showMore());
    expect(result.current.visibleItems.map(i => i.id)).toEqual(['a', 'b', 'c', 'd']);
    expect(result.current.hiddenCount).toBe(0);
    expect(result.current.fullyExpanded).toBe(true);
  });

  it('clamps when exceeding max priority', () => {
    const { result } = renderHook(() => useProgressiveReveal({ items }));
    act(() => {
      result.current.showMore();
      result.current.showMore();
      result.current.showMore(); // should have no effect beyond max
    });
    expect(result.current.visibleItems.length).toBe(4);
    expect(result.current.fullyExpanded).toBe(true);
  });

  it('reset restores initial priority', () => {
    const { result } = renderHook(() => useProgressiveReveal({ items }));
    act(() => {
      result.current.showMore();
      result.current.reset();
    });
    expect(result.current.visibleItems.map(i => i.id)).toEqual(['a', 'b']);
    expect(result.current.hiddenCount).toBe(2);
  });

  it('fires onChange callback with correct values', () => {
    const changes: Array<{ next: number; prev: number }> = [];
    const { result } = renderHook(() => useProgressiveReveal({ items, onChange: (next, prev) => changes.push({ next, prev }) }));
    act(() => {
      result.current.showMore(); // 0 -> 1
      result.current.showMore(); // 1 -> 2
      result.current.reset(); // 2 -> 0
    });
    expect(changes).toEqual([
      { prev: 0, next: 1 },
      { prev: 1, next: 2 },
      { prev: 2, next: 0 }
    ]);
  });

  it('remainingCount alias matches hiddenCount', () => {
    const { result } = renderHook(() => useProgressiveReveal({ items }));
    expect(result.current.remainingCount).toBe(result.current.hiddenCount);
    act(() => result.current.showMore());
    expect(result.current.remainingCount).toBe(result.current.hiddenCount);
  });
});
