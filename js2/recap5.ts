/**
 * 并查集，quickFind, quickUnion, size 优化，rank 优化，路径压缩
 */

interface UnionFind {
    union(p: number, q: number): void;
    isConnected(p: number, q: number): boolean;
}

// 先想下并查集是种什么样的数据结构
// 一个和数据对应的数组，保存了各个元素之间是否是同一个集合

export class UnionFind1<E> implements UnionFind {
    ids: number[];

    constructor(data: E[]) {
        this.ids = new Array(data.length);

        for (let i = 0; i < data.length; i++) {
            this.ids[i] = i;
        }
    }

    // O(n) 复杂度，那就是 quickFind
    union(p: number, q: number) {
        const pid = this.ids[p];
        const qid = this.ids[q];

        if (pid === qid) {
            return;
        }

        for (let i = 0; i < this.ids.length; i++) {
            if (this.ids[i] === qid) {
                this.ids[i] = pid;
            }
        }
    }

    isConnected(p: number, q: number): boolean {
        return this.ids[p] === this.ids[q];
    }
}

// quickUnion 版本
export class UnionFind2<E> implements UnionFind {
    parents: number[];

    constructor(data: E[]) {
        this.parents = new Array(data.length);

        for (let i = 0; i < data.length; i++) {
            this.parents[i] = i;
        }
    }

    find(p: number) {
        if (p < 0 || p >= this.parents.length) {
            throw new Error();
        }
        while (p !== this.parents[p]) {
            p = this.parents[p];
        }
        return p;
    }

    union(p: number, q: number) {
        const pPar = this.find(p);
        const qPar = this.find(q);

        if (pPar === qPar) {
            return;
        }
        this.parents[pPar] = qPar;
    }

    isConnected(p: number, q: number) {
        return this.find(p) === this.find(q);
    }
}

// 基于 size 的优化
export class UnionFind3<E> implements UnionFind {
    parents: number[];
    sizes: number[];

    constructor(data: E[]) {
        this.parents = new Array(data.length);
        this.sizes = new Array(data.length);

        for (let i = 0; i < data.length; i++) {
            this.parents[i] = i;
            this.sizes[i] = 1;
        }
    }

    find(p: number) {
        if (p < 0 || p >= this.parents.length) {
            throw new Error();
        }
        while (p !== this.parents[p]) {
            p = this.parents[p];
        }
        return p;
    }

    union(p: number, q: number) {
        const pPar = this.find(p);
        const qPar = this.find(q);

        if (pPar === qPar) {
            return;
        }

        if (this.sizes[pPar] <= this.sizes[qPar]) {
            this.parents[pPar] = qPar;
            this.sizes[qPar] += this.sizes[pPar];
        } else {
            this.parents[qPar] = pPar;
            this.sizes[pPar] += this.sizes[qPar];
        }
    }

    isConnected(p: number, q: number) {
        return this.find(p) === this.find(q);
    }
}

// 基于 rank 的优化
export class UnionFind4<E> implements UnionFind {
    parents: number[];
    ranks: number[];

    constructor(data: E[]) {
        this.parents = new Array(data.length);
        this.ranks = new Array(data.length);

        for (let i = 0; i < data.length; i++) {
            this.parents[i] = i;
            this.ranks[i] = 1;
        }
    }

    find(p: number) {
        if (p < 0 || p >= this.parents.length) {
            throw new Error();
        }
        while (p !== this.parents[p]) {
            p = this.parents[p];
        }
        return p;
    }

    union(p: number, q: number) {
        const pPar = this.find(p);
        const qPar = this.find(q);

        if (pPar === qPar) {
            return;
        }

        if (this.ranks[pPar] < this.ranks[qPar]) {
            this.parents[pPar] = qPar;
        } else if (this.ranks[pPar] > this.ranks[qPar]) {
            this.parents[qPar] = pPar;
        } else {
            this.parents[pPar] = qPar;
            this.ranks[qPar]++;
        }
    }

    isConnected(p: number, q: number) {
        return this.find(p) === this.find(q);
    }
}

// 路径压缩
export class UnionFind5<E> implements UnionFind {
    parents: number[];
    ranks: number[];

    constructor(data: E[]) {
        this.parents = new Array(data.length);
        this.ranks = new Array(data.length);

        for (let i = 0; i < data.length; i++) {
            this.parents[i] = i;
            this.ranks[i] = 1;
        }
    }

    find(p: number) {
        while (p !== this.parents[p]) {
            this.parents[p] = this.parents[this.parents[p]];
            p = this.parents[p];
        }
        return p;
    }

    union(p: number, q: number) {
        const pPar = this.find(p);
        const qPar = this.find(q);
        if (pPar === qPar) {
            return;
        }

        if (this.ranks[pPar] < this.ranks[qPar]) {
            this.parents[pPar] = qPar;
        } else if (this.ranks[pPar] > this.ranks[qPar]) {
            this.parents[qPar] = pPar;
        } else {
            this.parents[pPar] = qPar;
            this.ranks[qPar]++;
        }
    }

    isConnected(p: number, q: number) {
        return this.find(p) === this.find(q);
    }
}