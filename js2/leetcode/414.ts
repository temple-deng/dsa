/**
 * @file 414 第三大的数
 * @link https://leetcode-cn.com/problems/third-maximum-number/
 */

// 未完待续
class Heap<E> {
    data: E[] = [];
    size = 0;

    getSize() {
        return this.size;
    }

    isEmpty() {
        return !this.size;
    }

    add(e: E) {
        this.data[this.size] = e;
        this.size++;
        this.shiftUp(this.size - 1);
    }

    shiftUp(index: number) {
        const {data} = this;
        while (index > 0) {
            const parent = this.parent(index);
            if (data[parent] > data[index]) {
                this.exchange(parent, index);
                index = parent;
            } else {
                return;
            }
        }
    }

    exchange(i: number, j: number) {
        const temp = this.data[i];
        this.data[i] = this.data[j];
        this.data[j] = temp;
    }


    parent(index: number) {
        if (index === 0) {
            throw new Error();
        }

        return Math.floor((index - 1) / 2);
    }

    leftChild(index: number) {
        return index * 2 + 1;
    }
}