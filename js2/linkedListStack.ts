import LinkedList from "./linkedList";
import type { Stack } from './stack';

export default class LinkedListStack<T> implements Stack<T> {
    list = new LinkedList<T>();

    push(e: T) {
        this.list.addFirst(e);
    }

    pop(): T {
        return this.list.deleteFirst() as T;
    }

    peek() {
        return this.list.getFirst() as T;
    }

    getSize() {
        return this.list.getSize();
    }

    isEmpty() {
        return this.list.isEmpty();
    }
}
