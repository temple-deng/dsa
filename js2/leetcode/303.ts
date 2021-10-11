/**
 * @file 区域和检索 - 数组不可变
 * @link https://leetcode-cn.com/problems/range-sum-query-immutable/
 */

export class NumArray {
    private data: number[];
    private tree: number[];

    constructor(nums: number[]) {
        this.data = nums;
        this.tree = new Array(4 * nums.length);
        this.buildSegmentTree(0, 0, nums.length - 1);
    }

    buildSegmentTree(treeIndex: number, left: number, right: number) {
        if (left === right) {
            this.tree[treeIndex] = this.data[left];
            return;
        }
        const mid = Math.floor(left + (right - left) / 2);
        const leftIndex = this.leftChild(treeIndex);
        const rightIndex = this.rightChild(treeIndex);
        this.buildSegmentTree(leftIndex, left, mid);
        this.buildSegmentTree(rightIndex, mid + 1, right);
        this.tree[treeIndex] = this.tree[leftIndex] + this.tree[rightIndex];
    }

    sumRange(left: number, right: number): number {
        return this.sum(0, 0, this.data.length - 1, left, right);
    }

    sum(treeIndex: number, tl: number, tr: number, ql: number, qr: number): number {
        if (tl === ql && tr === qr) {
            return this.tree[treeIndex];
        }

        const mid = Math.floor(tl + (tr - tl) / 2);
        const leftIndex = this.leftChild(treeIndex);
        const rightIndex = this.rightChild(treeIndex);
        if (qr <= mid) {
            return this.sum(leftIndex, tl, mid, ql, qr);
        } else if (ql >= mid + 1) {
            return this.sum(rightIndex, mid + 1, tr, ql, qr);
        } else {
            const left = this.sum(leftIndex, tl, mid, ql, mid);
            const right = this.sum(rightIndex, mid + 1, tr, mid + 1, qr);
            return left + right;
        }
    }

    leftChild(index: number) {
        return index * 2 + 1;
    }

    rightChild(index: number) {
        return index * 2 + 2;
    }
}
