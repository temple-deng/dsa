/**
 * BST, MaxHeap, heapSort
 */

export interface BST<E> {
    getSize(): number;
    isEmpty(): boolean;
    add(e: E): void;
    contains(e: E): boolean;
    preOrder(): void;
    inOrder(): void;
    postOrder(): void;
    levelOrder(): void;
    minimum(): E | null;
    maximum(): E | null;
    removeMin(): E | null;
    removeMax(): E | null;
    remove(e: E): void;
}

interface BSTNode<E> {
    e: E;
    left: BSTNode<E> | null;
    right: BSTNode<E> | null;
}

class BSTNode<E> {
    e: E;
    left: BSTNode<E> | null = null;
    right: BSTNode<E> | null = null;
    
    constructor(e: E) {
        this.e = e;
    }
}

export class BST<E> {
    private size = 0;
    private root: BSTNode<E> | null = null;

    getSize() {
        return this.size;
    }

    isEmpty() {
        return this.size === 0;
    }

    add(e: E) {
        this.root = this.addR(e, this.root);
    }

    addR(e: E, node: BSTNode<E> | null): BSTNode<E> {
        if (node === null) {
            this.size++;
            return new BSTNode(e);
        }

        if (e < node.e) {
            node.left = this.addR(e, node.left);
        } else {
            node.right = this.addR(e, node.right);
        }
        return node;
    }

    contains(e: E): boolean {
        return this.containsR(e, this.root);
    }

    containsR(e: E, node: BSTNode<E> | null): boolean {
        if (node === null) {
            return false;
        }

        if (e === node.e) {
            return true;
        } else if (e < node.e) {
            return this.containsR(e, node.left);
        } else {
            return this.containsR(e, node.right);
        }
    }

    preOrder() {
        this.preOrderR(this.root);
    }

    preOrderR(node: BSTNode<E> | null) {
        if (node === null) {
            return;
        }

        console.log(node.e);
        this.preOrderR(node.left);
        this.preOrderR(node.right);
    }

    inOrder() {
        this.inOrderR(this.root);
    }

    inOrderR(node: BSTNode<E> | null) {
        if (node === null) {
            return;
        }

        this.preOrderR(node.left);
        console.log(node.e);
        this.preOrderR(node.right);
    }

    postOrder() {
        this.postOrderR(this.root);
    }

    postOrderR(node: BSTNode<E> | null) {
        if (node === null) {
            return;
        }

        this.preOrderR(node.left);
        this.preOrderR(node.right);
        console.log(node.e);
    }

    levelOrder() {
        const queue = [this.root];
        while (queue.length) {
            const top = queue.pop()!;
            if (top !== null) {
                if (top.left !== null) {
                    queue.push(top.left);
                }
                if (top.right !== null) {
                    queue.push(top.right);
                }
                console.log(top);
            }
        }
    }

    minimum(): E | null {
        if (this.root === null) {
            return null;
        }
        return this.minimumR(this.root)!.e;
    }

    minimumR(node: BSTNode<E> | null): BSTNode<E> | null {
        if (node === null) {
            return null;
        }
        if (node.left === null) {
            return node;
        }
        return this.minimumR(node.left);
    }

    maximum(): E | null {
        if (this.root === null) {
            return null;
        }
        return this.maximumR(this.root)!.e;
    }

    maximumR(node: BSTNode<E> | null): BSTNode<E> | null {
        if (node === null) {
            return null;
        }
        if (node.right === null) {
            return node;
        }
        return this.maximumR(node.right);
    }

    removeMin(): E | null {
        const ret = this.minimum();
        this.root = this.removeMinR(this.root);
        return ret;
    }

    removeMinR(node: BSTNode<E> | null): BSTNode<E> | null {
        if (node === null) {
            return null;
        }
        if (node.left === null) {
            const right = node.right;
            node.right = null;
            this.size--;
            return right;
        }
        node.left = this.removeMinR(node.left);
        return node;
    }

    removeMax(): E | null {
        const ret = this.maximum();
        this.root = this.removeMaxR(this.root);
        return ret;
    }

    removeMaxR(node: BSTNode<E> | null): BSTNode<E> | null {
        if (node === null) {
            return null;
        }
        if (node.right === null) {
            const left = node.left;
            node.left = null;
            this.size--;
            return left;
        }
        node.right = this.removeMaxR(node.right);
        return node;
    }

    remove(e: E) {
        this.root = this.removeR(this.root, e);
    }

    removeR(node: BSTNode<E> | null, e: E): BSTNode<E> | null {
        if (node === null) {
            return null;
        }

        if (node.e === e) {
            // 找到了节点
            if (node.right === null) {
                this.size--;
                return node.left;
            } else if (node.left === null) {
                this.size--;
                return node.right;
            } else {
                // 左右子树都有
                // 要做的事是什么，从右子树找出最小点，替换到当前
                const successor = this.minimumR(node.right)!;
                successor.right = this.removeMinR(node.right)
                successor.left = node!.left;
                node!.left = node!.right = null;
                return successor;
            }
        } else if (e < node.e) {
            node.left = this.removeR(node.left, e);
            return node;
        } else {
            node.right = this.removeR(node.right, e);
            return node;
        }
    }
}

// 堆是一种什么数据，二叉树，完全二叉树？
// 以上层节点大于或小于子节点的区分，可分为最大堆，最小堆
// 以最大堆为例，父节点大于其子节点的值

export interface MaxHeap<E> {
    getSize(): number;
    isEmpty(): boolean;
    add(e: E): void;
    findMax(): E;
    extractMax(): E;
}

export class MaxHeap<E> implements MaxHeap<E> {
    private data: E[] = [];
    private size = 0;

    constructor(capacityOrData: number | E[]) {
        if (Array.isArray(capacityOrData)) {
            // heapify
            this.data = capacityOrData;
            this.size = capacityOrData.length;
            for (let i = this.parent(this.size - 1); i >= 0; i--) {
                this.shiftDown(i);
            }
        } else {
            this.data = new Array(capacityOrData);
        }
    }

    getSize() {
        return this.size;
    }

    isEmpty() {
        return this.size === 0;
    }

    parent(i: number) {
        if (i === 0) {
            throw new Error();
        }
        return Math.floor((i - 1) / 2);
    }

    leftChild(i: number) {
        return i * 2 + 1;
    }

    rightChild(i: number) {
        return i * 2 + 2;
    }

    // 添加如何添加，添加到最后一位，shiftUp
    add(e: E) {
        if (this.size === this.data.length) {
            // @TODO:
        }

        this.data[this.size] = e;
        this.shiftUp(this.size);
        this.size++;
    }

    shiftUp(index: number) {
        while (index > 0) {
            const par = this.parent(index);
            if (this.data[par] < this.data[index]) {
                swap(this.data, index, par);
                index = par;
            } else {
                return;
            }
        }
    }

    findMax(): E {
        if (!this.size) {
            throw new Error();
        }
        return this.data[0];
    }

    extractMax(): E {
        if (!this.size) {
            throw new Error();
        }

        const max = this.data[0];
        swap(this.data, 0, this.size - 1);
        this.size--;
        this.shiftDown(0);
        return max;
    }

    shiftDown(index: number) {
        while (this.leftChild(index) < this.size) {
            const left = this.leftChild(index);
            const right = this.rightChild(index);

            let j = left;
            if (right < this.size && this.data[right] > this.data[left]) {
                j = right;
            }
            if (this.data[j] > this.data[index]) {
                swap(this.data, j, index);
                index = j;
            } else {
                return;
            }
        }
    }

    replace() {

    }
}


export function heapSort(arr: number[]): number[] {
    if (arr.length < 2) {
        return arr;
    }
    // for (let i = parent(arr.length - 1); i >= 0; i--) {
    //     shiftDown(i);
    // }
    // 即下面这些
    for (let i = Math.floor((arr.length - 2) / 2); i >= 0; i--) {
        shiftDown(arr, i, arr.length);
    }
    // 现在就有个最大堆了，然后就那样，那样。。。嗯嗯
    for (let i = arr.length - 1; i > 0; i++) {
        swap(arr, i, 0);
        shiftDown(arr, 0, i);
    }
    return arr;
}

function shiftDown(arr: number[], i: number, size: number) {
    while (i * 2 + 1 < size) {
        let j = i * 2 + 1;
        if (j + 1 < size && arr[j + 1] > arr[j]) {
            j++;
        }
        if (arr[j] > arr[i]) {
            swap(arr, i, j);
            i = j;
        } else {
            return;
        }
    }
}

function swap<E>(arr: E[], i: number, j: number) {
    const temp = arr[i];
    arr[j] = arr[i];
    arr[i] = temp;
}