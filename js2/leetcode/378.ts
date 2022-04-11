/** */

export {}

// 这最简单的拍个序即可
// 这是一版基于归并排序的实现
function kthSmallest(matrix: number[][], k: number): number {
    const sorted = matrix.reduce((prev, curr) => {
        if (prev[prev.length - 1] < curr[0]) {
            return prev.concat(curr);
        } else {
            return merge(prev, curr);
        }
    }, []);

    return sorted[k - 1];
};

function merge(arr1: number[], arr2: number[]): number[] {
    const copy = [];

    let i = 0;
    let j = 0;
    let k = 0;

    while (k < arr1.length + arr2.length) {
        // 第一个遍历完了
        if (i >= arr1.length) {
            copy.push(arr2[j]);
            k++;
            j++;
        } else if (j >= arr2.length) {
            copy.push(arr1[i]);
            k++;
            i++;
        } else if (arr1[i] > arr2[j]) {
            copy.push(arr2[j]);
            j++;
            k++;
        } else {
            copy.push(arr1[i]);
            i++;
            k++;
        }
    }

    return copy;
}

// 具体想一下，是要一个最小堆还是一个最大堆
// 如果是最小堆，那堆中的是最小的 k 的元素吗，好像是无法确定的
// 那假如是最大堆，堆中的是最小的 k 个元素可能吗，好像是可以的，写一个试试
class MaxHeap {
    size = 0;
    data: number[] = [];

    constructor(capacity: number) {
        this.data = new Array(capacity);
    }

    leftChild(i: number) {
        return i * 2 + 1;
    }

    rightChild(i: number) {
        return i * 2 + 2;
    }

    parent(i: number) {
        return Math.floor((i - 1) / 2);
    }

    add(num: number) {
        this.data[this.size] = num;
        this.shiftUp(this.size);
        this.size++;
    }

    shiftUp(index: number) {
        while (this.parent(index) >= 0) {
            const pIndex = this.parent(index);
            if (this.data[pIndex] < this.data[index]) {
                this.swap(pIndex, index);
                index = pIndex;
            } else {
                return;
            }
        }
    }

    extractMax() {
        const ret = this.data[0];
        this.swap(0, this.size - 1);
        this.size--;
        this.shiftDown(0);
        return ret;
    }

    findMax() {
        return this.data[0];
    }

    shiftDown(index: number) {
        while (this.leftChild(index) < this.size) {
            let i = this.leftChild(index);
            if (i + 1 < this.size && this.data[i] < this.data[i + 1]) {
                i++;
            }

            if (this.data[index] < this.data[i]) {
                this.swap(index, i);
                index = i;
            } else {
                break;
            }
        }
    }

    swap(a: number, b: number) {
        const temp = this.data[a];
        this.data[a] = this.data[b];
        this.data[b] = temp;
    }

    replaceMax(num: number) {
        this.data[0] = num;
        this.shiftDown(0);
    }
}

// 除此之外，理论上可以基于堆实现一版
// bingo，也没有问题，理论上还有优化的空间
function kthSmallest2(matrix: number[][], k: number): number {
    const heap = new MaxHeap(k);

    const n = matrix.length;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            const elem = matrix[i][j];
            const index = i * n + j;
            if (index <= k - 1) {
                heap.add(elem);
            } else {
                // 栈已经满了，开始处理
                const max = heap.findMax();
                if (elem < max) {
                    heap.replaceMax(elem);
                } else {
                    // 这一行目前这个元素大于 max，那后面的都大于
                    break;
                }
            }
        }
    }

    return heap.findMax();
}