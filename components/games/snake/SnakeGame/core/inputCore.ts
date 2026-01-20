import type { RefObject } from "react";
import { DirectionType } from "../types";

const OPPOSITE: Record<DirectionType, DirectionType> = {
  [DirectionType.Up]: DirectionType.Down,
  [DirectionType.Down]: DirectionType.Up,
  [DirectionType.Left]: DirectionType.Right,
  [DirectionType.Right]: DirectionType.Left,
};

export function changeDirectionCore(
  directionRef: RefObject<DirectionType>,
  nextDirection: DirectionType,
): void {
  if (OPPOSITE[nextDirection] === directionRef.current) {
    return;
  }

  directionRef.current = nextDirection;
}

export function handleKeyboardInputCore(
  event: KeyboardEvent,
  directionRef: RefObject<DirectionType>,
  isRunning: boolean,
  startGame: () => void,
): void {
  if (
    ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " ", "Enter"].includes(
      event.key,
    )
  ) {
    event.preventDefault();
  }

  if ((event.key === " " || event.key === "Enter") && !isRunning) {
    startGame();
    return;
  }

  const map: Record<string, DirectionType> = {
    ArrowUp: DirectionType.Up,
    ArrowDown: DirectionType.Down,
    ArrowLeft: DirectionType.Left,
    ArrowRight: DirectionType.Right,
    w: DirectionType.Up,
    a: DirectionType.Left,
    s: DirectionType.Down,
    d: DirectionType.Right,
  };

  const next = map[event.key];
  if (!next) return;
  if (OPPOSITE[next] === directionRef.current) return;

  directionRef.current = next;
}
