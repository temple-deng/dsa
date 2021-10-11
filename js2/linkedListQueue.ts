import type { Queue } from './queue';

class Node<T> {
    data: T | null;
    next: Node<T> | null;

    constructor(data: T | null, next:  Node<T> | null) {
        this.data = data || null;
        this.next = next || null;
    }

    toString() {
        return this.data;
    }
}

export default class LinkedListQueue<T> implements Queue<T> {
    head: Node<T> | null = null;
    tail: Node<T> | null = null;
    size = 0;

    enqueue(e: T) {
        if (!this.tail) {
            this.head = this.tail = new Node(e, null);
        } else {
            this.tail.next = new Node(e, null);
            this.tail = this.tail.next;
        }
        this.size++;
    }

    dequeue() {
        if (!this.head) {
            throw new Error ('error');
        }

        const ret = this.head;
        this.head = this.head.next;
        ret.next = null;
        if (!this.head) {
            this.tail = null;
        }
        this.size--;
        return ret.data as T;
    }

    getFront() {
        if (!this.head) {
            throw new Error('error');
        }

        return this.head.data as T;
    }

    getSize() {
        return this.size;
    }

    isEmpty() {
        return !this.size;
    }

    toString() {
        let str = 'Queue: front ';
        let cur = this.head;
        while(cur != null) {
            str += `${cur.data}->`;
            cur = cur.next;
        }
        str += 'Null tail';
        return str;
    }
}
