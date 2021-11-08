/**
 * 线段树, Trie 树
 */

export interface SegmentTree<E> {
    getSize(): number;
    isEmpty(): boolean;
    get(index: number): E;
    query(l: number, r: number): E;
    set(index: number, e: E): void;
}

export class SegmentTree<E> {
    tree: E[];
    data: E[];
    merger: (a: E, b: E) => E;

    constructor(data: E[], merger: (a: E, b: E) => E) {
        this.data = data;
        // 差个将 data 复制的步骤
        this.merger = merger;
        this.tree = new Array(4 * data.length);
        this.buildSegmentTree(0, 0, data.length - 1);
    }

    // 重要的是分清索引及元素的含义
    buildSegmentTree(rootIndex: number, ql: number, qr: number) {
        if (ql === qr) {
            this.tree[rootIndex] = this.data[ql];
            return;
        }

        const leftChild = this.leftChild(rootIndex);
        const rightChild = this.rightChild(rootIndex);
        const mid = Math.floor((qr - ql) / 2) + ql;
        this.buildSegmentTree(leftChild, ql, mid);
        this.buildSegmentTree(rightChild, mid + 1, qr);
        this.tree[rootIndex] = this.merger(this.tree[leftChild], this.tree[rightChild]);
    }

    getSize() {
        return this.data.length;
    }

    isEmpty() {
        return this.getSize() === 0;
    }

    leftChild(i: number) {
        return i * 2 + 1;
    }

    rightChild(i: number) {
        return i * 2 + 2;
    }

    get(index: number): E {
        if (index < 0 || index >= this.data.length) {
            throw new Error();
        }
        return this.data[index];
    }

    query(l: number, r: number): E {
        // 差 l 和 r 的合法性校验
        return this.queryR(0, l, r, 0, this.data.length - 1);
    }

    queryR(root: number, ql: number, qr: number, l: number, r: number): E {
        if (ql === l && qr === r) {
            return this.tree[root];
        }

        const mid = Math.floor((qr - ql) / 2) + ql;
        const leftChild = this.leftChild(root);
        const rightChild = this.rightChild(root);
        if (qr <= mid) {
            return this.queryR(leftChild, ql, qr, l, mid);
        } else if (ql > mid) {
            return this.queryR(rightChild, ql, qr, mid + 1, r);
        } else {
            const left = this.queryR(leftChild, ql, mid, l, mid);
            const right = this.queryR(rightChild, mid + 1, qr, mid + 1, r);
            return this.merger(left, right);
        }
    }

    // set 根本是改了 data 中的一个值，最简单的方法其实重新构建整个 segmentTree 即可
    // 但是这样显然有点浪费
    set(index: number, e: E) {
        if (index < 0 || index >= this.data.length) {
            throw new Error();
        }
        this.data[index] = e;
        this.setR(0, 0, this.data.length - 1, index, e);
    }

    setR(root: number, l: number, r: number, index: number, e: E) {
        if (l === r) {
            this.tree[l] = e;
            return;
        }

        const mid = Math.floor((r - l) / 2) + l;
        const leftChild = this.leftChild(root);
        const rightChild = this.rightChild(root);

        if (index <= mid) {
            this.setR(leftChild, l, mid, index, e);
            this.tree[root] = this.merger(this.tree[leftChild], this.tree[rightChild]);
        } else {
            this.setR(rightChild, mid + 1, r, index, e);
            this.tree[root] = this.merger(this.tree[leftChild], this.tree[rightChild]);
        }
    }
}

class TrieNode {
    isWord: boolean;
    next: Map<string, TrieNode>;
    
    constructor(isWord: boolean) {
        this.isWord = isWord;
        this.next = new Map<string, TrieNode>();
    }
}



export interface Trie {
    root: TrieNode;
    add(word: string): void;
    contains(word: string): boolean;
    isPrefix(word: string): boolean;
}

export class Trie implements Trie {
    root = new TrieNode(false);
    size = 0;

    add(word: string) {
        let cur = this.root;
        
        for (let i = 0; i < word.length; i++) {
            const char = word[i];
            if (!cur.next.has(char)) {
                cur.next.set(char, new TrieNode(false));
            }
            cur = cur.next.get(char)!;
        }
        if (!cur.isWord) {
            this.size++;
        }
        cur.isWord = true;
    }

    contains(word: string): boolean {
        let cur = this.root;

        for (let i = 0; i < word.length; i++) {
            const char = word[i];
            if (!cur.next.has(char)) {
                return false;
            }
            cur = cur.next.get(char)!;
        }
        return cur.isWord;
    }

    isPrefix(word: string): boolean {
        let cur = this.root;

        for (let i = 0; i < word.length; i++) {
            const char = word[i];
            if (!cur.next.has(char)) {
                return false;
            }
            cur = cur.next.get(char)!;
        }
        return true;
    }
}

