import type { RefObject } from 'react';

export function startGameLoopCore(
  frameRef: RefObject<number | null>,
  tick: (time: number) => void
): void {
  function loop(time: number) {
    tick(time);
    frameRef.current = requestAnimationFrame(loop);
  }

  if (frameRef.current === null) {
    frameRef.current = requestAnimationFrame(loop);
  }
}


export function stopGameLoopCore(
  frameRef: RefObject<number | null>
): void {
  if (frameRef.current !== null) {
    cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
  }
}
