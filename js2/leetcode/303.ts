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

/**
 * sqrt 分解解法
 */
export class NumArray2 {
    nums: number[];
    sumArr: number[];
    blockNum: number;

    constructor(nums: number[]) {
        this.nums = nums;
        const sumArr = [];
        const sqrt = Math.floor(Math.sqrt(nums.length));
        const blockNum = Math.ceil(nums.length / sqrt);
        this.blockNum = blockNum;
        for (let i = 0; i < sqrt; i++) {
            let sum = 0;
            for (let j = i * blockNum; j < (i + 1) * blockNum && j < nums.length; j++) {
                sum += nums[j];
            }
            sumArr.push(sum);
        }
        this.sumArr = sumArr;
    }

    sumRange(left: number, right: number): number {
        const leftIndex = Math.ceil(left / this.blockNum) - 1;
        const rightIndex = Math.ceil(right / this.blockNum) - 1;
        // 可以分成几种情况，两者在一个分组中
        // 两者不在一个分组中
        // 我们先假设不在一个分组中，怎么求
        // 先求左边所在分组所在值，同理右边
        if (leftIndex === rightIndex) {
            return this.nums.slice(left, right + 1).reduce((prev, cur) => prev + cur, 0);
        } else {
            const part1 = this.nums.slice(left, (leftIndex + 1) * this.blockNum).reduce((prev, cur) => prev + cur, 0);
            const part2 = this.nums.slice(rightIndex * this.blockNum, right + 1).reduce((prev, cur) => prev + cur, 0);
            return part1 + part2 + this.sumArr.slice(leftIndex + 1, rightIndex).reduce((prev, cur) => prev + cur, 0);
        }
    }
}
