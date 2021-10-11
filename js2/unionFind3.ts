import type { UnionFind } from './unionFind';

// quick union 版本 基于 size 优化
export default class UnionFind3 implements UnionFind {
    private parent: Array<number>;
    private sizes: Array<number>; 

    constructor(size: number) {
        this.parent = new Array(size);
        this.sizes = new Array(size);

        for (let i = 0; i < size; i++) {
            this.parent[i] = i;
            this.sizes[i] = 1;
        }
    }

    getSize() {
        return this.parent.length;
    }

    private find(p: number): number {
        while (this.parent[p] !== p) {
            p = this.parent[p];
        }
        return p;
    }

    // O(h)
    isConnected(p: number, q: number): boolean {
        return this.find(p) === this.find(q);
    }

    // O(h)
    unionElements(p: number, q: number) {
        const pParent = this.find(p);
        const qParent = this.find(q);
        if (pParent === qParent) {
            return;
        }
        if (this.sizes[pParent] < this.sizes[qParent]) {
            this.parent[pParent] = qParent;
            this.sizes[qParent] += this.sizes[pParent];
        } else {
            this.parent[qParent] = pParent;
            this.sizes[pParent] += this.sizes[qParent];
        }
    }
}