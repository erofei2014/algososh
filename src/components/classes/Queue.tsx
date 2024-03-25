interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
  getSize: () => number;
  getAll: () => (T | null)[];
  clear: () => void;
}

export class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  enqueue = (item: T): void => {
    if (this.length > this.size) {
      throw new Error('Maximum length exceeded');
    }

    if (this.length > 0) {
      this.tail++;
    }

    if (this.tail > this.size-1) {
      this.tail = 0;
    }

    this.container[this.tail] = item;
    this.length++;
  };

  dequeue = (): void => {
    if (this.isEmpty()) {
      throw new Error('No elements in the queue');
    }

    this.container[this.head] = null;

    if (this.length > 0 && this.head !== this.size - 1 && this.head !== this.tail) {
      this.head++;
    }

    if (this.head > this.size-1) {
      this.head = 0;
    }

    this.length--;
  };

  peak = (): T | null => {
    if (this.isEmpty()) {
      throw new Error('No elements in the queue');
    }

    return this.container[this.head % this.size];
  };

  getAll = (): (T | null)[] => {
    const arr = [];
    for (let i = 0; i < this.size; i++) {
      arr.push(this.container[i]);
    }
    return arr;
  };

  getSize = (): number => this.length;
  getHead = (): number => this.head;
  getTail = (): number => this.tail;

  clear = (): void => {
    this.container = Array(this.size);
    this.length = 0;
    this.head = 0;
    this.tail = 0;
  };

  isEmpty = () => this.length === 0;
 }