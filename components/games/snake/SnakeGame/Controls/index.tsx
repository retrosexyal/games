"use client";

import type { RefObject } from "react";
import { DirectionType } from "../types";
import { changeDirectionCore } from "../core/inputCore";

type ControlsProps = {
  directionRef: RefObject<DirectionType>;
  isRunning: boolean;
  startGame: () => void;
};

export default function Controls({
  directionRef,
  startGame,
  isRunning,
}: ControlsProps) {
  const handleDirection = (control: DirectionType) => () => {
    changeDirectionCore(directionRef, control);

    if (!isRunning) {
      startGame();
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 select-none md:hidden">
      <button
        className="control-btn"
        onClick={handleDirection(DirectionType.Up)}
      >
        ⬆️
      </button>

      <div className="flex gap-20">
        <button
          className="control-btn"
          onClick={handleDirection(DirectionType.Left)}
        >
          ⬅️
        </button>

        <button
          className="control-btn"
          onClick={handleDirection(DirectionType.Right)}
        >
          ➡️
        </button>
      </div>

      <button
        className="control-btn"
        onClick={handleDirection(DirectionType.Down)}
      >
        ⬇️
      </button>
    </div>
  );
}
