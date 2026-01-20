"use client";

import {
  RefObject,
  useCallback,
  useEffect,
  useEffectEvent,
  useMemo,
  useRef,
  useState,
} from "react";
import { DirectionType, SnakeStateType } from "./types";
import { createInitialSnake } from "./helpers";
import { calculateNextStateCore } from "./core/gameStateCore";
import { startGameLoopCore, stopGameLoopCore } from "./core/gameLoopCore";
import { handleKeyboardInputCore } from "./core/inputCore";

const STEP_MS = 120;
const HIGH_SCORE_KEY = "snake_high_score";

export function useSnakeGame(canvasRef: RefObject<HTMLCanvasElement | null>) {
  const initialState = useMemo<SnakeStateType>(
    () => ({
      snake: createInitialSnake(3, 5, 5),
      food: { x: 10, y: 10 },
      direction: DirectionType.Right,
      score: 0,
      gameOver: false,
    }),
    [],
  );

  const [state, setState] = useState<SnakeStateType>(initialState);
  const [isRunning, setIsRunning] = useState(false);
  const lastStepTimeRef = useRef<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const pendingHighScoreRef = useRef<number | null>(null);

  const setHightScore = useEffectEvent(() => {
    setHighScore(parseInt(localStorage?.getItem(HIGH_SCORE_KEY) || "0", 10));
  });

  useEffect(() => {
    setHightScore();
  }, []);

  const directionRef = useRef<DirectionType>(DirectionType.Right);
  const frameRef = useRef<number | null>(null);
  const highScoreRef = useRef<number>(highScore);

  useEffect(() => {
    highScoreRef.current = highScore;
  }, [highScore]);

  const tick = useCallback((time: number) => {
    if (time - lastStepTimeRef.current < STEP_MS) {
      return;
    }

    lastStepTimeRef.current = time;

    setState((prev) => {
      const { nextState, isGameOver } = calculateNextStateCore(
        prev,
        directionRef.current,
      );

      if (nextState.score > highScoreRef.current) {
        pendingHighScoreRef.current = nextState.score;
      }

      if (isGameOver) {
        stopGameLoopCore(frameRef);
        setIsRunning(false);
      }

      return nextState;
    });
  }, []);

  useEffect(() => {
    if (pendingHighScoreRef.current === null) return;

    const value = pendingHighScoreRef.current;
    pendingHighScoreRef.current = null;

    setHighScore(value);
    localStorage.setItem(HIGH_SCORE_KEY, String(value));
  }, [state.score]);

  const startGame = useCallback(() => {
    if (isRunning) return;

    setState(initialState);
    directionRef.current = DirectionType.Right;
    setIsRunning(true);

    startGameLoopCore(frameRef, tick);
  }, [initialState, isRunning, tick]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      handleKeyboardInputCore(e, directionRef, isRunning, startGame);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isRunning, startGame]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#22c55e";
    state.snake.forEach(({ x, y }) => ctx.fillRect(x * 15, y * 15, 15, 15));

    ctx.fillStyle = "#ef4444";
    ctx.fillRect(state.food.x * 15, state.food.y * 15, 15, 15);
  }, [state, canvasRef]);

  return {
    score: state.score,
    gameOver: state.gameOver,
    isRunning,
    startGame,
    highScore,
    directionRef,
  };
}
