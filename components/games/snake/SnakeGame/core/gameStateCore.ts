import type { DirectionType, SnakeStateType } from '../types';
import type { GameTickResultType } from './types';
import {
  getNextHeadPosition,
  getRandomPosition,
  isOutOfBounds,
} from '../helpers';

export function calculateNextStateCore(
  state: SnakeStateType,
  direction: DirectionType
): GameTickResultType {
  const head = state.snake[0];
  const nextHead = getNextHeadPosition(head, direction);

  if (
    isOutOfBounds(nextHead) ||
    state.snake.some(
      (s) => s.x === nextHead.x && s.y === nextHead.y
    )
  ) {
    return {
      nextState: { ...state, gameOver: true },
      didEatFood: false,
      isGameOver: true,
    };
  }

  const newSnake = [nextHead, ...state.snake];
  let didEatFood = false;
  let newFood = state.food;
  let newScore = state.score;

  if (
    nextHead.x === state.food.x &&
    nextHead.y === state.food.y
  ) {
    didEatFood = true;
    newScore += 1;
    newFood = getRandomPosition();
  } else {
    newSnake.pop();
  }

  return {
    isGameOver: false,
    didEatFood,
    nextState: {
      ...state,
      snake: newSnake,
      food: newFood,
      score: newScore,
    },
  };
}
