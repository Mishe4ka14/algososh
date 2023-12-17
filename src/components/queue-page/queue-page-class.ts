import { ElementStates } from "../../types/element-states";

interface IElem {
  letter: string | undefined;
  state: ElementStates;
}

interface QueueInterface {
  enqueue(value: string): void;
  dequeue(): void;
  clear(): void;
  getQueueArr(): IElem[];
  isAddDisabled(): boolean;
  isDeleteDisabled(): boolean;
  getHead(): number;
  getTail(): number;
}


export class Queue implements QueueInterface {
  private static readonly DEFAULT_QUEUE_SIZE = 7;
  private arr: IElem[];
  private head: number;
  private tail: number;

  constructor(size: number = Queue.DEFAULT_QUEUE_SIZE) {
    this.arr = Array.from({ length: size }, () => ({
      letter: undefined,
      state: ElementStates.Default,
    }));
    this.head = 0;
    this.tail = 0;
  }

  private setModifiedState(index: number) {
    setTimeout(() => {
      if (this.arr[index].state === ElementStates.Changing) {
        this.arr[index].state = ElementStates.Default;
      }
    }, 500);
  }

  enqueue(value: string) {
    if (value && this.tail < this.arr.length) {
      this.arr[this.tail].letter = value;
      this.arr[this.tail].state = ElementStates.Changing;
      this.setModifiedState(this.tail);
      this.tail += 1;
    }
  }

  dequeue() {
    if (this.head === this.tail) return;

    this.arr[this.head].state = ElementStates.Changing;
    this.arr[this.head].letter = undefined;
    this.setModifiedState(this.head);
    this.head += 1;
  }

  clear() {
    this.arr = Array.from({ length: this.arr.length }, () => ({
      letter: undefined,
      state: ElementStates.Default,
    }));
    this.head = 0;
    this.tail = 0;
  }

  getQueueArr() {
    return this.arr;
  }

  isAddDisabled() {
    return this.tail === this.arr.length;
  }

  isDeleteDisabled() {
    return this.head === this.tail;
  }

  getHead(){
    return this.head
  }

  getTail(){
    return this.tail
  }

  isEmpty = (): boolean => this.head === this.tail;

}