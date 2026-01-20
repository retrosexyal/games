import { DirectionType } from '../types';
import type {
  StartGameCoreParamsType,
  StopGameCoreParamsType,
} from './types';

export function startGameCore({
  setState,
  setIsRunning,
  directionRef,
  intervalRef,
  tick,
  speed,
  initialState,
}: StartGameCoreParamsType): void {
  if (intervalRef.current !== null) return;

  setState(initialState);
  directionRef.current = DirectionType.Right;
  setIsRunning(true);

  intervalRef.current = window.setInterval(tick, speed);
}

export function stopGameCore({
  intervalRef,
  setIsRunning,
}: StopGameCoreParamsType): void {
  if (intervalRef.current !== null) {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }

  setIsRunning(false);
}
