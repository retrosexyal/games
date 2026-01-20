import {
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { DirectionType, SnakeStateType } from "./types";
import {
  createInitialSnake,
  getNextHeadPosition,
  getRandomPosition,
  isOutOfBounds,
} from "./helpers";
import { BOARD_CONFIG, GAME_SPEED, INITIAL_SNAKE_LENGTH } from "./config";
import { handleKeyboardInputCore } from "./core/inputCore";

const HIGH_SCORE_KEY = "snake_high_score";
const HIGH_SCORE_EVENT = "snake_high_score_changed";

function readHighScore(): number {
  if (typeof window === "undefined") return 0;
  const stored = localStorage.getItem(HIGH_SCORE_KEY);
  const value = stored ? Number(stored) : 0;
  return Number.isFinite(value) ? value : 0;
}

function writeHighScore(value: number): void {
  localStorage.setItem(HIGH_SCORE_KEY, String(value));
  window.dispatchEvent(new Event(HIGH_SCORE_EVENT));
}

function subscribeHighScore(onStoreChange: () => void): () => void {
  function onStorage(event: StorageEvent): void {
    if (event.key === HIGH_SCORE_KEY) onStoreChange();
  }

  function onCustom(): void {
    onStoreChange();
  }

  window.addEventListener("storage", onStorage);
  window.addEventListener(HIGH_SCORE_EVENT, onCustom);

  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(HIGH_SCORE_EVENT, onCustom);
  };
}

export function useSnakeGame(canvasRef: RefObject<HTMLCanvasElement | null>) {
  const initialState = useMemo<SnakeStateType>(
    () => ({
      snake: createInitialSnake(INITIAL_SNAKE_LENGTH, 5, 5),
      food: getRandomPosition(),
      direction: DirectionType.Right,
      score: 0,
      gameOver: false,
    }),
    [],
  );

  const pendingHighScoreRef = useRef<number | null>(null);

  const [state, setState] = useState<SnakeStateType>(initialState);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // ✅ highScore без setState в useEffect и без hydration mismatch
  const highScore = useSyncExternalStore(
    subscribeHighScore,
    readHighScore,
    () => 0, // server snapshot
  );

  const directionRef = useRef<DirectionType>(DirectionType.Right);
  const intervalRef = useRef<number | null>(null);

  const stopGame = useCallback((): void => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
  }, []);

  const tick = useCallback((): void => {
    setState((prev) => {
      if (prev.gameOver) return prev;

      const head = prev.snake[0];
      const nextHead = getNextHeadPosition(head, directionRef.current);

      if (
        isOutOfBounds(nextHead) ||
        prev.snake.some((s) => s.x === nextHead.x && s.y === nextHead.y)
      ) {
        stopGame();
        return { ...prev, gameOver: true };
      }

      const newSnake = [nextHead, ...prev.snake];
      let newScore = prev.score;
      let newFood = prev.food;

      if (nextHead.x === prev.food.x && nextHead.y === prev.food.y) {
        newFood = getRandomPosition();
        newScore += 1;

        // ✅ highScore обновляем тут (не в эффекте)
        if (newScore > readHighScore()) {
          pendingHighScoreRef.current = newScore;
        }
      } else {
        newSnake.pop();
      }

      return {
        ...prev,
        snake: newSnake,
        food: newFood,
        score: newScore,
      };
    });
  }, [stopGame]);

  useEffect(() => {
    if (pendingHighScoreRef.current === null) return;

    writeHighScore(pendingHighScoreRef.current);
    pendingHighScoreRef.current = null;
  }, [state.score]);

  const startGame = useCallback((): void => {
    if (isRunning) return;

    // сбрасываем состояние и запускаем
    setState(initialState);
    directionRef.current = DirectionType.Right;

    setIsRunning(true);
    intervalRef.current = window.setInterval(tick, GAME_SPEED);
  }, [initialState, isRunning, tick]);

  // ⌨️ keyboard — без setState в effect (startGame вызывается по событию)
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent): void {
      handleKeyboardInputCore(event, directionRef, isRunning, startGame);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isRunning, startGame]);

  // 🧹 cleanup interval on unmount — без setState в effect
  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  // 🎨 DRAW — вот тут canvasRef реально используется
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { cellSize, width, height } = BOARD_CONFIG;

    // background
    ctx.fillStyle = "#f8fafc";
    ctx.fillRect(0, 0, width, height);

    // food
    ctx.fillStyle = "#ef4444";
    ctx.fillRect(
      state.food.x * cellSize,
      state.food.y * cellSize,
      cellSize,
      cellSize,
    );

    // snake
    ctx.fillStyle = "#22c55e";
    state.snake.forEach(({ x, y }) => {
      ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    });
  }, [canvasRef, state]);

  return {
    score: state.score,
    highScore,
    gameOver: state.gameOver,
    isRunning,
    startGame,
  };
}
