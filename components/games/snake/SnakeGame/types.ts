import { DictionaryType } from "@/lib/i18n/types";

export type SnakeGameProps = {
  dict: DictionaryType;
};
export type PositionType = {
  x: number;
  y: number;
};

export enum DirectionType {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}

export type SnakeStateType = {
  snake: PositionType[];
  food: PositionType;
  direction: DirectionType;
  score: number;
  gameOver: boolean;
};

export type BoardConfigType = {
  cellSize: number;
  width: number;
  height: number;
};

export type UseSnakeGameReturnType = {
  score: number;
  highScore: number;
  gameOver: boolean;
  startGame: () => void;
  restartGame: () => void;
};