import { DirectionType } from '../types';

const OPPOSITE_DIRECTION: Record<DirectionType, DirectionType> = {
  [DirectionType.Up]: DirectionType.Down,
  [DirectionType.Down]: DirectionType.Up,
  [DirectionType.Left]: DirectionType.Right,
  [DirectionType.Right]: DirectionType.Left,
};

export function handleKeyboardInputCore(
  event: KeyboardEvent,
  directionRef: React.MutableRefObject<DirectionType>,
  isRunning: boolean,
  startGame: () => void
): void {
  if (
    ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', 'Enter'].includes(
      event.key
    )
  ) {
    event.preventDefault();
  }

  if ((event.key === ' ' || event.key === 'Enter') && !isRunning) {
    startGame();
    return;
  }

  const keyMap: Record<string, DirectionType> = {
    ArrowUp: DirectionType.Up,
    ArrowDown: DirectionType.Down,
    ArrowLeft: DirectionType.Left,
    ArrowRight: DirectionType.Right,
    w: DirectionType.Up,
    a: DirectionType.Left,
    s: DirectionType.Down,
    d: DirectionType.Right,
  };

  const nextDirection = keyMap[event.key];
  if (!nextDirection) return;

  if (OPPOSITE_DIRECTION[nextDirection] === directionRef.current) {
    return;
  }

  directionRef.current = nextDirection;
}
