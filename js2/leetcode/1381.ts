/**
 * @file 1381 设计一个支持增量操作的栈
 * @link https://leetcode-cn.com/problems/design-a-stack-with-increment-operation/
 * 与普通的栈相比就是多了个 inc 操作，这里可以用过辅助栈来处理
 */

class CustomStack {
    private data: number[];
    private helperStack: number[];
    private size = 0;

    constructor(maxSize: number) {
        this.data = new Array(maxSize);
        this.helperStack = new Array(maxSize);
    }

    push(x: number): void {
        if (this.size === this.data.length) {
            return;
        }
        this.data[this.size] = x;
        this.size++;
    }

    pop(): number {
        if (this.size) {
            const ret = this.data[this.size - 1];
            this.size--;
            return ret;
        }
        return -1;
    }

    // 借助辅助栈，先出栈再入栈
    increment(k: number, val: number): void {
        const {size, data, helperStack} = this;
        for (let i = size - 1; i >= 0; i--) {
            if (i < k) {
                helperStack[size - 1 - i] = data[i] + val;
            } else {
                helperStack[size - 1 - i] = data[i];
            }
        }

        for (let i = size - 1; i >= 0; i--) {
            data[size - 1 - i] = helperStack[i];
        }
    }
}


