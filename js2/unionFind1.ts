import type {UnionFind} from './unionFind';

// quick find 版本
export default class UnionFind1 implements UnionFind {
    private id = new Array<number>();

    constructor(size: number) {
        this.id = new Array(size);

        for (let i = 0; i < size; i++) {
            this.id[i] = i;
        }
    }

    getSize() {
        return this.id.length;
    }

    private find(p: number): number {
        return this.id[p];
    }

    // O(1)
    isConnected(p: number, q: number): boolean {
        return this.find(p) === this.find(q);
    }

    // O(n)
    unionElements(p: number, q: number) {
        const pID = this.find(p);
        const qID = this.find(q);

        if (pID === qID) {
            return;
        }

        this.id.forEach((id, index) => {
            if (id === pID) {
                this.id[index] = qID;
            }
        });
    }
}