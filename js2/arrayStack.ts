import MyArray from './myArray';
import type {Stack} from './stack';

export default class ArrayStack<T> implements Stack<T> {
    array: MyArray<T>;

    constructor(capacity: number) {
        this.array = new MyArray(capacity);
    }

    getSize() {
        return this.array.getSize();
    }

    isEmpty() {
        return this.array.isEmpty();
    }

    getCapacity(): number {
        return this.array.getCapacity();
    }

    push(e: T) {
        this.array.addLast(e);
    }

    pop(): T {
        return this.array.removeLast();
    }

    peek(): T {
        return this.array.getLast();
    }

    toString() {
        const {array} = this;
        let str = 'Stack: [';

        for (let i = 0; i < array.getSize(); i++) {
            str += array.get(i);
            i !== array.getSize() - 1 && (str += ', ');
        }

        return str + '] top';
    }
}