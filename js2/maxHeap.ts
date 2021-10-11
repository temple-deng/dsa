export default class MaxHeap<T> {
    private data = new Array<T>();

    getSize() {
        return this.data.length;
    }

    isEmpty() {
        return !this.getSize();
    }

    private parent(i: number) {
        if (i === 0) {
            throw new Error();
        }
        return Math.floor((i - 1)/ 2);
    }

    private leftChild(i: number) {
        return i * 2 + 1;
    }

    private rightChild(i: number) {
        return  i * 2 + 2;
    }

    add(e: T) {
        this.data.push(e);
        this.siftUp(this.data.length - 1);
    }

    private siftUp(index: number) {
        while (index > 0) {
            const parent = this.parent(index);
            if (this.data[parent] < this.data[index]) {
                this.exchange(parent, index);
                index = parent;
            } else {
                break;
            }
        }
    }

    extractMax(): T {
        if (this.isEmpty()) {
            throw new Error();
        }
        const ret = this.data[0];
        this.data[0] = this.data.pop() as T;
        this.siftDown(0);
        return ret;
    }

    findMax(): T {
        if (this.isEmpty()) {
            throw new Error();
        }
        return this.data[0];
    }

    private siftDown(index: number) {
        while (this.leftChild(index) < this.data.length) {
            let i = this.leftChild(index);
            if (i + 1 < this.data.length && this.data[i] < this.data[i + 1]) {
                i = i + 1;
            }
            if (this.data[index] < this.data[i]) {
                this.exchange(index, i);
                index = i;
            } else {
                break;
            }
        }
    }

    private exchange(i: number, j: number) {
        const temp = this.data[i];
        this.data[i] = this.data[j];
        this.data[j] = temp;
    }

    replace(e: T): T {
        const ret = this.data[0];
        this.data[0] = e;
        this.siftDown(0);
        return ret;
    }

    // O(n)
    heapify(arr: T[]) {
        this.data = arr;
        for (let i = this.parent(arr.length); i >= 0; i--) {
            this.siftDown(i);
        }
    }
}