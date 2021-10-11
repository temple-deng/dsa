class NumArray {
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
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * var param_1 = obj.sumRange(left,right)
 */

function countRangeSum(nums: number[], lower: number = -Infinity, upper: number = Infinity): number {
    const segmentTree = new NumArray(nums);
    let count = 0;
    for (let i = 0; i < nums.length - 1; i++) {
        for (let j = i; j < nums.length; j++) {
            const sum = segmentTree.sumRange(i, j);
            if (sum >= lower && sum <= upper) {
                count++;
            }
        }
    }

    return count;
};

module.exports = NumArray;
for 