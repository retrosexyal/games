export type GameId = 'snake';

export type GameConfig = {
  id: GameId;
  path: string;
};

export const GAMES: readonly GameConfig[] = [
  {
    id: 'snake',
    path: '/games/snake',
  },
] as const;
