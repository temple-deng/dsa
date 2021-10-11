import MyArray from './myArray';
import type { Queue } from './queue';

export default class ArrayQueue<T> implements Queue<T> {
    array: MyArray<T>;

    constructor(capacity: number) {
        this.array = new MyArray(capacity);
    }

    getSize() {
        return this.array.getSize();
    }

    getCapacity() {
        return this.array.getCapacity();
    }

    isEmpty() {
        return this.array.isEmpty();
    }

    enqueue(e: T) {
        this.array.addLast(e);
    }

    dequeue(): T {
        return this.array.removeFirst();
    }

    getFront(): T {
        return this.array.getFirst();
    }
}