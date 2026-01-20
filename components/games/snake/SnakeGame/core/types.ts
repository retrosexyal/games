import { RefObject } from 'react';
import type { DirectionType, SnakeStateType } from '../types';

export type StartGameCoreParamsType = {
  setState: React.Dispatch<React.SetStateAction<SnakeStateType>>;
  setIsRunning: (value: boolean) => void;
  directionRef: RefObject<DirectionType>;
  intervalRef: RefObject<number | null>;
  tick: () => void;
  speed: number;
  initialState: SnakeStateType;
};

export type StopGameCoreParamsType = {
  intervalRef: RefObject<number | null>;
  setIsRunning: (value: boolean) => void;
};
