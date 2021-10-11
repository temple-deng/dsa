import type { UnionFind } from './unionFind';

// quick union 版本 基于 rand 优化
export default class UnionFind4 implements UnionFind {
    private parent: Array<number>;
    private rank: Array<number>; 

    constructor(size: number) {
        this.parent = new Array(size);
        this.rank = new Array(size);

        for (let i = 0; i < size; i++) {
            this.parent[i] = i;
            this.rank[i] = 1;
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

    // 路径压缩
    private find2(p: number): number {
        while (this.parent[p] !== p) {
            this.parent[p] = this.parent[this.parent[p]];
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
        if (this.rank[pParent] < this.rank[qParent]) {
            this.parent[pParent] = qParent;
        } else if (this.rank[pParent] > this.rank[qParent]) {
            this.parent[qParent] = pParent;
        } else {
            this.parent[pParent] = qParent;
            this.rank[qParent]++;
        }
    }
}