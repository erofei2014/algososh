interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  getSize: () => number;
  getAll: () => T[];
  clear: () => void;
}

export class Stack<T> implements IStack<T> {
  private container: T[] = [];

  push = (item: T): void => {
    this.container.push(item);
  };

  pop = (): void => {
    this.container.pop();
  };

  peak = (): T | null => {
    if (this.container.length > 0) {
      return this.container[this.container.length - 1];
    }
    return null;
  };

  getSize = (): number => this.container.length;

  getAll = (): T[] => {
    const arr = [];
    for (let i = 0; i < this.getSize(); i++) {
      arr.push(this.container[i]);
    }
    return arr;
  };

  clear = (): void => {
    this.container = [];
  }
 }