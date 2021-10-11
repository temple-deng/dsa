import type { UnionFind } from './unionFind';

// quick union 版本
export default class UnionFind2 implements UnionFind {
    private parent = new Array<number>();

    constructor(size: number) {
        this.parent = new Array(size);

        for (let i = 0; i < size; i++) {
            this.parent[i] = i;
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
        this.parent[qParent] = pParent;
    }
}