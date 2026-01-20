import type { RefObject } from 'react';
import type { DirectionType, SnakeStateType } from '../types';

export type GameLoopRefsType = {
  directionRef: RefObject<DirectionType>;
  frameRef: RefObject<number | null>;
};

export type GameTickResultType = {
  nextState: SnakeStateType;
  didEatFood: boolean;
  isGameOver: boolean;
};
