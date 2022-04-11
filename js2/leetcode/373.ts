export {}

// 仔细想一想，这和类似 topK 的问题，所以建议用堆做


// 最大堆，维护最小的 k 个值，如果你小于 top，插入，大于不说话

class HeapNode {
    val = 0;
    arr: number[] = [];

    constructor(val: number, arr: number[]) {
        this.val = val;
        this.arr = arr;
    }
}

class MaxHeap {
    data: HeapNode[] = [];

    getSize() {
        return this.data.length;
    }

    add(node: HeapNode) {
        this.data[this.data.length] = node;
        this.shiftUp(this.data.length - 1);
    }

    peek() {
        return this.data[0].val;
    }

    replaceTop(node: HeapNode) {
        this.data[0] = node;
        this.shiftDown(0);
    }

    shiftUp(index: number) {
        while (index > 0) {
            const pIndex = this.parent(index);
            if (this.data[pIndex].val < this.data[index].val) {
                this.swap(index, pIndex);
                index = pIndex;
            } else {
                break;
            }
        }
    }

    shiftDown(index: number) {
        while (this.left(index) < this.data.length) {
            let left = this.left(index);

            if (left + 1 < this.data.length && this.data[left].val < this.data[left + 1].val) {
                left++;
            }

            if (this.data[left].val > this.data[index].val) {
                this.swap(left, index);
                index = left;
            } else {
                break;
            }
        }
    }

    parent(index: number) {
        return Math.floor((index - 1) / 2);
    }

    left(index: number) {
        return index * 2 + 1;
    }

    swap(i: number, j: number) {
        const temp = this.data[j];
        this.data[j] = this.data[i];
        this.data[i] = temp;
    }
}

function kSmallestPairs(nums1: number[], nums2: number[], k: number): number[][] {
    let i = 0;
    let j = 0;
    let res: number[][] = [];

    if (k < 0 || nums1.length === 0 || nums2.length === 0) {
        return [];
    }

    const heap = new MaxHeap();

    for (let i = 0; i < nums1.length; i++) {
        for (let j = 0; j < nums2.length; j++) {
            let sum = nums1[i] + nums2[j];
            if (heap.getSize() < k) {
                heap.add({
                    val: sum,
                    arr: [nums1[i], nums2[j]]
                });
            } else {
                // 堆已经满了
                const top = heap.peek();
                if (sum < top) {
                    heap.replaceTop({
                        val: sum,
                        arr: [nums1[i], nums2[j]]
                    });
                } else {
                    break;
                    // 大于堆顶
                }
            }
        }
    }

    for (let i = 0; i < heap.data.length; i++) {
        res.push(heap.data[i].arr);
    }

    return res;
};