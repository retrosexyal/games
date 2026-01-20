'use client';

import type { RefObject } from 'react';
import { DirectionType } from '../types';
import { changeDirectionCore } from '../core/inputCore';

type ControlsProps = {
  directionRef: RefObject<DirectionType>;
};

export default function Controls({ directionRef }: ControlsProps) {
  return (
    <div className="flex flex-col items-center gap-3 select-none md:hidden">
      <button
        className="control-btn"
        onClick={() =>
          changeDirectionCore(directionRef, DirectionType.Up)
        }
      >
        ⬆️
      </button>

      <div className="flex gap-3">
        <button
          className="control-btn"
          onClick={() =>
            changeDirectionCore(directionRef, DirectionType.Left)
          }
        >
          ⬅️
        </button>

        <button
          className="control-btn"
          onClick={() =>
            changeDirectionCore(directionRef, DirectionType.Right)
          }
        >
          ➡️
        </button>
      </div>

      <button
        className="control-btn"
        onClick={() =>
          changeDirectionCore(directionRef, DirectionType.Down)
        }
      >
        ⬇️
      </button>
    </div>
  );
}
