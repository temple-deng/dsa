/**
 * @file 622 设计循环队列
 * @link https://leetcode-cn.com/problems/design-circular-queue/
 */
class MyCircularQueue {
    private data: number[];
    private front = 0;
    private tail = 0;

    constructor(k: number) {
        this.data = new Array(k + 1);
    }

    enQueue(value: number): boolean {
        const {data, front, tail} = this;
        if ((tail + 1) % data.length === front) {
            return false;
        }

        data[tail] = value;
        this.tail = (tail + 1) % data.length;
        return true;
    }

    deQueue(): boolean {
        const {data, front, tail} = this;
        if (front === tail) {
            return false;
        }
        this.front = (front + 1) % data.length;
        return true;
    }

    Front(): number {
        if (this.front === this.tail) {
            return -1;
        }
        return this.data[this.front];
    }

    Rear(): number {
        const {front, tail, data} = this;
        if (front === tail) {
            return -1;
        }
        if (tail) {
            return data[tail - 1];
        } else {
            return data[this.data.length - 1];
        }
    }

    isEmpty(): boolean {
        return this.front === this.tail;
    }

    isFull(): boolean {
        return (this.tail + 1) % this.data.length === this.front;
    }
}