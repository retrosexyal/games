import { LanguageType } from "./types";

export const DICTIONARY = {
  en: {
    site: {
      title: "Online Games",
      description: "Play free online games directly in your browser.",
    },
    navigation: {
      games: "Games",
    },
    games: {
      allGames: "All games",
      play: "Play",
      snake: {
        title: "Snake",
        description: "Classic snake game",
      },
    },
    snake: {
      title: "Snake Game Online",
      description: "Play the classic Snake game online for free.",
      restart: "Restart",
      score: "Score",
      gameOver: "Game Over",
      start: "Start",
    },
    common: {
      loading: "Loading...",
      error: "Something went wrong",
    },
  },

  ru: {
    site: {
      title: "Игры онлайн",
      description: "Играть беслатно прямо в браузере онлайн.",
    },
    navigation: {
      games: "Игры",
    },
    games: {
      allGames: "Все игры",
      play: "Играть",
      snake: {
        title: "Змейка",
        description: "Классическая игра змейка",
      },
    },
    snake: {
      title: "Игра Змейка онлайн",
      description: "Классическая игра Змейка — играйте бесплатно онлайн.",
      restart: "Заново",
      score: "Счёт",
      gameOver: "Игра окончена",
      start: "Начать",
    },
    common: {
      loading: "Загрузка...",
      error: "Что-то пошло не так",
    },
  },
} as const;

export function getDictionary(lang?: LanguageType) {
  if (lang && lang in DICTIONARY) {
    return DICTIONARY[lang];
  }

  return DICTIONARY.en;
}
