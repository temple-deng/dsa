import type {Queue} from './queue';

export default class loopQueue<T> implements Queue<T> {
    private data: Array<T>;
    private front = 0;
    private tail = 0;
    private size = 0;

    constructor(capacity: number = 10) {
        this.data = new Array(capacity + 1);
    }

    getCapacity() {
        return this.data.length - 1;
    }

    isEmpty() {
        return this.front === this.tail;
    }

    getSize() {
        return this.size;
    }

    enqueue(e: T) {
        const {tail, front, data} = this;
        if ((tail + 1) % data.length === front) {
            this.resize(this.getCapacity() * 2);
        }

        this.data[tail] = e;
        this.tail++;
        this.size++;
        if (tail + 1 === data.length) {
            this.tail = 0;
        }
    }

    dequeue(): T {
        const {size, front, data} = this;
        if (!size) {
            throw new Error('Dequeue failed. Queue is Empty');
        }

        const ret = data[front];
        this.front++;
        this.size--;
        if (this.front === data.length) {
            this.front = 0;
        }
        if (this.size === this.getCapacity() / 4 && this.getCapacity() / 2 !== 0) {
            this.resize(this.getCapacity() / 2);
        }
        return ret;
    }

    getFront(): T {
        const {size, front, data} = this;
        if (!size) {
            throw new Error('Dequeue failed. Queue is Empty');
        }
        return data[front];
    }

    resize(newCapacity: number) {
        const {front, tail, data, size} = this;
        const newData = new Array(newCapacity + 1);

        for (let i = front, j = 0; i !== tail; i++, j++) {
            if (i === data.length) {
                i = 0;
            }
            newData[j] = data[i];
        }
        // for (let i = 0; i < size; i++) {
        //     newData[i] = data[(i + front) % data.length];
        // }
        this.front = 0;
        this.tail = size;
    }
}