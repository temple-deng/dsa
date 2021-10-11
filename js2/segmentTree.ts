export interface Merger<T> {
    merge(a: T, b: T): T; 
}

export default class SegmentTree<T> {
    private data: T[];
    private tree: T[];
    private merger: Merger<T>;

    constructor(arr: T[], merger: Merger<T>) {
        this.data = Array.from(arr);
        this.tree = new Array(4 * arr.length);
        this.merger = merger;
        this.buildSegmentTree(0, 0, arr.length - 1);
    }

    private buildSegmentTree(treeIndex: number, left: number, right: number) {
        if (left === right) {
            this.tree[treeIndex] = this.data[left];
        } else {
            const leftTreeIndex = this.leftChild(treeIndex);
            const rightTreeIndex = this.rightChild(treeIndex);
            const mid = Math.floor(left + (right - left) / 2);
            this.buildSegmentTree(leftTreeIndex, left, mid);
            this.buildSegmentTree(rightTreeIndex, mid + 1, right);

            this.tree[treeIndex] = this.merger.merge(this.tree[leftTreeIndex], this.tree[rightTreeIndex]);
        }
    }

    query(ql: number, qr: number): T {
        if (ql < 0 || qr < 0 || ql >= this.data.length || qr >= this.data.length) {
            throw new Error();
        }
        return this.queryTree(0, 0, this.data.length - 1, ql, qr);
    }

    queryTree(treeIndex: number, treeL: number, treeR: number, queryL: number, queryR: number) : T{
        if (treeL === queryL && treeR === queryR) {
            return this.tree[treeIndex];
        }

        const mid = Math.floor(treeL + (treeR - treeL) / 2);
        if (queryR <= mid) {
            return this.queryTree(this.leftChild(treeIndex), treeL, mid, queryL, queryR);
        } else if (queryL >= mid + 1) {
            return this.queryTree(this.rightChild(treeIndex), mid + 1, treeR, queryL, queryR);
        } else {
            const left = this.queryTree(this.leftChild(treeIndex), treeL, mid, queryL, mid);
            const right = this.queryTree(this.rightChild(treeIndex), mid + 1, treeR, mid + 1, queryR);
            const res = this.merger.merge(left, right);
            return res;
        }
    }

    getSize() {
        return this.data.length;
    }

    isEmpty() {
        return !this.data.length;
    }

    get(index: number) {
        if (index < 0 || index >= this.data.length) {
            throw new Error();
        }
        return this.data[index];
    }

    private leftChild(index: number) {
        return index * 2 + 1;
    }

    private rightChild(index: number) {
        return index * 2 + 2;
    }
}