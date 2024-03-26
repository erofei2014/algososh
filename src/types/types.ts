import { Direction } from "./direction";

export type TCircleStatus = {
  index: number;
  steps: string[][];
  currStepIndex: number;
};

export type TColumnStatus = {
  index: number;
  steps: [number[], number, number, number[]][];
  currStepIndex: number;
};

export type TSort = {
  active: boolean;
  direction: Direction;
};

export type TStackStatus = {
  index: number;
  lastIndex: number;
  currStepIndex: number;
}

export type TQueueStatus = {
  index: number;
  keyIndex: number;
  currStepIndex: number;
}