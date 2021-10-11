import type { Queue } from './queue';
import MaxHeap from './maxHeap';

export default class PriorityQueue<T> implements Queue<T> {
    private maxHeap = new MaxHeap<T>();

    getSize() {
        return this.maxHeap.getSize();
    }

    isEmpty() {
        return this.maxHeap.isEmpty();
    }

    enqueue(e: T) {
        this.maxHeap.add(e);
    }

    dequeue(): T {
        return this.maxHeap.extractMax();
    }

    getFront(): T {
        return this.maxHeap.findMax();
    }
}