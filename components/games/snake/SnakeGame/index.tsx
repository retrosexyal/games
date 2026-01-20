"use client";

import { useRef } from "react";
import { useSnakeGame } from "./useSnakeGame";
import type { SnakeGameProps } from "./types";
import Controls from "./Controls";

export default function SnakeGame({ dict }: SnakeGameProps) {
  const { snake } = dict;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { score, highScore, gameOver, isRunning, startGame, directionRef } =
    useSnakeGame(canvasRef);

  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-sm mx-auto">
      <div
        className="
          flex items-center justify-between w-full
          px-2 py-1
          text-xs font-medium
          bg-black/40 rounded
          select-none
        "
      >
        <div className="flex gap-2 whitespace-nowrap">
          <span>
            {snake.score}: <b>{score}</b>
          </span>
          <span>
            Best: <b>{highScore}</b>
          </span>
        </div>

        <div className="text-red-500 font-semibold text-center flex-1">
          {gameOver ? snake.gameOver : null}
        </div>
        <button
          onClick={startGame}
          disabled={isRunning}
          className={`
            px-2 py-1 rounded text-xs text-white
            ${
              isRunning
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-green-600 active:bg-green-700"
            }
          `}
        >
          {snake.start}
        </button>
      </div>

      <canvas
        ref={canvasRef}
        width={300}
        height={300}
        className="border rounded bg-white touch-none"
      />

      <Controls
        directionRef={directionRef}
        isRunning={isRunning}
        startGame={startGame}
      />
    </div>
  );
}
