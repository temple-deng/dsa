/**
 * @file 347 前 K 个高频元素
 * @link https://leetcode-cn.com/problems/top-k-frequent-elements/
 */

class Freq {
    num: number;
    freq: number;

    constructor(num: number, freq: number) {
        this.num = num;
        this.freq = freq;
    }
}

class MinHeap {
    data: Freq[] = [];

    getSize() {
        return this.data.length;
    }

    add(e: Freq) {
        this.data.push(e);
        this.shiftUp(this.data.length - 1);
    }

    private shiftUp(index: number) {
        while (index > 0) {
            const parent = this.parent(index);
            if (this.data[parent].freq > this.data[index].freq) {
                this.exchange(parent, index);
                index = parent;
            } else {
                break;
            }
        }
    }

    findMin(): Freq | null {
        if (this.data.length) {
            return this.data[0];
        }
        return null;
    }

    private parent(i: number) {
        return Math.floor((i - 1) / 2);
    }

    private leftChild(i: number) {
        return i * 2 + 1;
    }

    replace(e: Freq) {
        this.data[0] = e;
        this.shiftDown(0);
    }

    private shiftDown(index: number) {
        while (this.leftChild(index) < this.data.length) {
            let i = this.leftChild(index);
            if (i + 1 < this.data.length && this.data[i].freq > this.data[i + 1].freq) {
                i = i + 1;
            }
            if (this.data[i].freq < this.data[index].freq) {
                this.exchange(i, index);
                index = i;
            } else {
                break;
            }
        }
    }

    extractMin(): Freq | null {
        if (this.data.length) {
            const ret = this.data[0];
            this.data[0] = this.data[this.data.length - 1];
            this.data.pop();
            this.shiftDown(0);
            return ret;
        }
        return null;
    }

    exchange(i: number, j: number) {
        const temp = this.data[i];
        this.data[i] = this.data[j];
        this.data[j] = temp;
    }
}

function topKFrequent(nums: number[], k: number): number[] {
    const map = new Map();
    for (let i = 0, len = nums.length; i < len; i++) {
        const num = map.get(nums[i]);
        map.set(nums[i], num ? num + 1 : 1);
    }

    const heap = new MinHeap();

    map.forEach((freq, num) => {
        if (heap.getSize() <= k) {
            heap.add(new Freq(num, freq));
        } else if (freq > (heap.findMin() as Freq).freq) {
            heap.replace(new Freq(num, freq));
        }
    });

    const ret = [];
    if (heap.getSize()) {
        for (let i = 0, len = heap.getSize(); i < len; i++) {
            ret.push((heap.extractMin() as Freq).num);
        }
        return ret;
    } else {
        return [];
    }
};