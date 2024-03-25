import { ElementStates } from "../types/element-states";
import { TCircleStatus, TColumnStatus, TStackStatus, TQueueStatus } from "../types/types";
import { queueSize } from "../components/queue-page/queue-page";
import { Circle } from "../components/ui/circle/circle";

export const reverseString = (string: string): string[][] => {
  const arr = string.split('');
  const result: string[][] = [[...arr]];

  if (string.length <= 1) {
    return result;
  }

  let start = 0;
  let end = arr.length - 1;
  while (start <= end) {
    [arr[start], arr[end]] = [arr[end], arr[start]];
    result.push([...arr]);
    start ++;
    end --;
  }
  return result;
};

export const getCircleStatus = ({index, steps, currStepIndex}: TCircleStatus): ElementStates => {
  const maxIndex = steps[currStepIndex].length - 1;

  if (
    index < currStepIndex ||
    index > maxIndex - currStepIndex ||
    currStepIndex === steps.length - 1
  ) {
    return ElementStates.Modified;
  }

  if (index === currStepIndex || index === maxIndex - currStepIndex) {
    return ElementStates.Changing;
  }

  return ElementStates.Default;
};

export const getElementColor = (color: string | null): ElementStates => {
  switch (color) {
    case 'default': {
      return ElementStates.Default
    }
    case 'changing': {
      return ElementStates.Changing
    }
    case 'modified': {
      return ElementStates.Modified
    }
    default:
      return ElementStates.Default
  }
};


export const getColumnStatus = ({index, steps, currStepIndex}: TColumnStatus): ElementStates => {
  const minIndex = steps[currStepIndex][1];
  const currIndex = steps[currStepIndex][2];
  const sortedArr = steps[currStepIndex][3];

  const isSorted = sortedArr.includes(index);
    
  if (isSorted) {
    return ElementStates.Modified;
  }

  if (index === minIndex || index === currIndex) {
    return ElementStates.Changing;
  }

  return ElementStates.Default;
};

export const getStackElementStatus = ({index, lastIndex, currStepIndex}: TStackStatus): ElementStates => {
  if (index === lastIndex && currStepIndex === 0) {
    return ElementStates.Changing; 
  }

  return ElementStates.Default;
};

export const getQueueElementStatus = ({ index, keyIndex, currStepIndex}: TQueueStatus): ElementStates => {
  if (index === keyIndex && (currStepIndex === 0 || currStepIndex === 1)) {
    return ElementStates.Changing; 
  }

  return ElementStates.Default;
};

export const getArrowStatus = (color?: string): string => {
  switch (color) {
    case 'changing': {
      return '#D252E1'
    }
    default:
      return '#0032FF';
  }
};

export const getCircleSize = (index: number, maxIndex:number, text:string, value: string | null, color: string | null): string | React.ReactElement | null => {
  if (value) {
    return <Circle
      state={getElementColor(color)}
      letter={value}
      isSmall={true}>
      </Circle>;
  } else { 
    return index===0 && text==='head' ? 'head' : index===maxIndex-1 && text==='tail' ? 'tail' : '';
  }
};

export const getFibonacciSequence = (n: number): number[] => {
  const result: number[] = [1, 1];
  for (let i = 1; i < n; i++) {
    let temp = result[i - 1] + result[i];
    result.push(temp);
  }
  return result;
};

export const makeStepsFromArray = (arr: number[]): number[][] => {
  let result: number[][] = [];
  let newArr: number[] = [];
  for (let i = 0; i < arr.length; i++) {
    newArr = [...newArr, arr[i]];
    result = [...result, newArr];
  }
  return result;
};

export const getRandomArr = (): number[] => {
  let arr: number[] = [];
  const minLen = 3;
  const maxLen = 17;
  const min = 0;
  const max = 100;
  let arrLength = Math.round(Math.random() * (maxLen - minLen) + minLen);

  for (let i = 0; i < arrLength; i++) {
    arr[i] = Math.round(Math.random() * (max - min) + min);
  }
  return arr;
};

export const sortWithSelection = (initialArray: number[], isAscending: boolean): [number[], number, number, number[]][] => {
  const array = [...initialArray];
  const sorted: number[] = [];
  const steps: [number[], number, number, number[]][] = [];
  const length = array.length;

  for (let i = 0; i < length - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < length; j++) {
      steps.push([[...array], minIndex, j, [...sorted]]);

      if (isAscending ? array[j] < array[minIndex] : array[j] > array[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
    }

    sorted.push(i);
  }

  steps.push([[...array], -1, -1, [...sorted, length - 1]]);

  return steps;
};

export const sortWithBubbles = (initialArray: number[], isAscending: boolean): [number[], number, number, number[]][] => {
  const array = [...initialArray];
  const sorted: number[] = [];
  const steps: [number[], number, number, number[]][] = [];
  const length = array.length;

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      steps.push([[...array], j, j + 1, [...sorted]]);

      if (isAscending ? array[j] > array[j + 1] : array[j] < array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }

    sorted.push(length - i - 1);
  }

  steps.push([[...array], -1, -1, [...sorted]]);

  return steps;
};

export const getQueue = (): string[][] => {
  const arr: string[][] = [];
  for (let i = 0; i < queueSize; i++) {
    arr.push(['', 'default']);
  }
  return arr;
};

export const initLinkedList = (listArr: string[]): Array<Array<string | null>> => {
  const arr = [];
  for (let i = 0; i < listArr.length; i++) {
    arr.push([listArr[i], 'default', null, null, null, null]);
  }
  return arr;
};

