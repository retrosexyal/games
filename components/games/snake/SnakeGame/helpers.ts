import { PositionType, DirectionType } from './types';
import { BOARD_CONFIG } from './config';

const { cellSize, width, height } = BOARD_CONFIG;

export function getRandomPosition(): PositionType {
  const maxX = width / cellSize;
  const maxY = height / cellSize;

  return {
    x: Math.floor(Math.random() * maxX),
    y: Math.floor(Math.random() * maxY),
  };
}

export function getNextHeadPosition(
  head: PositionType,
  direction: DirectionType
): PositionType {
  switch (direction) {
    case DirectionType.Up:
      return { x: head.x, y: head.y - 1 };
    case DirectionType.Down:
      return { x: head.x, y: head.y + 1 };
    case DirectionType.Left:
      return { x: head.x - 1, y: head.y };
    case DirectionType.Right:
      return { x: head.x + 1, y: head.y };
  }
}

export function isOutOfBounds(
  position: PositionType
): boolean {
  return (
    position.x < 0 ||
    position.y < 0 ||
    position.x >= width / cellSize ||
    position.y >= height / cellSize
  );
}

export function createInitialSnake(
  length: number,
  startX: number,
  startY: number
): PositionType[] {
  return Array.from({ length }).map((_, index) => ({
    x: startX - index,
    y: startY,
  }));
}
