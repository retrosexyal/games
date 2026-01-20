"use client";

import { useRef } from "react";
import { useSnakeGame } from "./useSnakeGame";
import type { SnakeGameProps } from "./types";

export default function SnakeGame({ dict }: SnakeGameProps) {
  const { snake } = dict;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { score, highScore, gameOver, isRunning, startGame } =
    useSnakeGame(canvasRef);

  return (
    <div className="flex flex-col items-center gap-4">
      <canvas
        ref={canvasRef}
        width={300}
        height={300}
        className="border rounded bg-white touch-none"
      />

      <div className="flex gap-6 text-sm font-medium">
        <div>
          {snake.score}: <b>{score}</b>
        </div>
        <div>
          Best: <b>{highScore}</b>
        </div>
      </div>

      {gameOver && (
        <div className="text-red-600 font-semibold">{snake.gameOver}</div>
      )}

      <button
        onClick={startGame}
        disabled={isRunning}
        className={`
          px-6 py-2 rounded text-white font-medium
          ${
            isRunning
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-black hover:bg-gray-800"
          }
          focus:outline-none
        `}
      >
        {snake.start}
      </button>

      <div className="text-xs text-gray-500">
        Press <b>Enter</b> or <b>Space</b> to start
      </div>
    </div>
  );
}
