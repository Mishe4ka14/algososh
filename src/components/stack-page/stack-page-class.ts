import { ElementStates } from "../../types/element-states";

interface IElem<T> {
  letter: T;
  state: ElementStates;
}

export class Stack<T> {
  private data: IElem<T>[];
  private readonly maxSize: number;

  constructor(maxSize: number = Infinity) {
    this.data = [];
    this.maxSize = maxSize;
  }

  push = (item: IElem<T>): void => {
    this.data.push(item)
};

  pop() {
    if (this.data.length === 0) return;

    const lastIndex = this.data.length - 1;
    this.data[lastIndex].state = ElementStates.Changing;
    setTimeout(() => {
      this.data.pop();
      this.data.forEach((char) => {
        char.state = ElementStates.Default;
      });
    }, 1000);
  }

  clear() {
    this.data = [];
  }

  getElements(){
    return this.data;
  }

  getSize(): number {
    return this.data.length;
  }

  getMaxSize(): number {
    return this.maxSize;
  }
}