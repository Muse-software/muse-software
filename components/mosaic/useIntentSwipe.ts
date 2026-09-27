"use client";

import {useRef, type Dispatch, type SetStateAction, type PointerEvent, type MouseEvent} from 'react';

/** Horizontal touch gestures select an intent; vertical gestures remain browser scrolling. */
export function useIntentSwipe(count: number, rtl: boolean, select: Dispatch<SetStateAction<number>>) {
  const gesture = useRef<{id: number; x: number; y: number; axis: 'pending' | 'horizontal'} | null>(null);
  const suppressClickUntil = useRef(0);
  return {
    onPointerDown(event: PointerEvent<HTMLDivElement>) {
      if (!event.isPrimary) { gesture.current = null; return; }
      if (event.pointerType === 'mouse' || !window.matchMedia('(max-width:699px)').matches) return;
      suppressClickUntil.current = 0;
      gesture.current = {id: event.pointerId, x: event.clientX, y: event.clientY, axis: 'pending'};
    },
    onPointerMove(event: PointerEvent<HTMLDivElement>) {
      const start = gesture.current;
      if (!start || start.id !== event.pointerId) return;
      const dx = Math.abs(event.clientX - start.x), dy = Math.abs(event.clientY - start.y);
      if (start.axis === 'pending') {
        if (dy > 10 && dy >= dx) { gesture.current = null; return; }
        if (dx > 10 && dx > dy * 1.3) {
          start.axis = 'horizontal';
          event.currentTarget.setPointerCapture(event.pointerId);
        }
      }
      if (start.axis === 'horizontal') suppressClickUntil.current = performance.now() + 500;
    },
    onPointerUp(event: PointerEvent<HTMLDivElement>) {
      const start = gesture.current;
      gesture.current = null;
      if (!start || start.id !== event.pointerId || start.axis !== 'horizontal') return;
      const dx = event.clientX - start.x, dy = event.clientY - start.y;
      suppressClickUntil.current = performance.now() + 500;
      if (Math.abs(dx) < 44 || Math.abs(dx) < Math.abs(dy) * 1.3) return;
      const step = (dx < 0 ? 1 : -1) * (rtl ? -1 : 1);
      select(current => Math.max(0, Math.min(count - 1, current + step)));
    },
    onPointerCancel() { gesture.current = null; },
    onLostPointerCapture(event: PointerEvent<HTMLDivElement>) {
      // Taking capture from a child also bubbles a lost-capture event; keep the gesture.
      if (event.target === event.currentTarget) gesture.current = null;
    },
    onClickCapture(event: MouseEvent<HTMLDivElement>) {
      if (event.detail !== 0 && performance.now() < suppressClickUntil.current) {
        event.preventDefault();
        event.stopPropagation();
      }
    },
  };
}
