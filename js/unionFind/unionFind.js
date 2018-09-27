/**
 * Quick Find 版本的并查集
 * Find 操作的复杂度为 O(1)
 * Union 操作的复杂度为 O(n)
 */
class UnionFind1 {
  constructor(size) {
    this.id = Array(size);

    for (let i = 0; i < size; i++) {
      this.id[i] = i;
    }
  }

  /**
   * 内部方法
   * 查找索引为 p 的元素所属的集合的 id
   * @param {int} p 元素的索引
   * @returns {int} p 所属的集合的 id
   */
  find(p) {
    if (p < 0 || p >= this.id.length) {
      throw new Error("Invalid data index");
    }
    return this.id[p];
  }

  /**
   * 查询两个元素是否属于同一集合，O(1) 的复杂度
   * @param {int} p
   * @param {int} q 
   * @returns {boolean}
   */
  IsConnected(p, q) {
    const pId = this.find(p);
    const qId = this.find(q);

    return pId === qId;
  }

  /**
   * 合并两个元素所属的集合
   * @param {int} p
   * @param {int} q
   */
  UnionElements(p, q) {
    const pId = this.find(p);
    const qId = this.find(q);

    if (pId === qId) {
      return
    }

    for (let i = 0; i < this.id.length; i++) {
      if (this.id[i] === pId) {
        this.id[i] = qId;
      }
    }
  }
}

/**
 * Quick Union 版本的并查集
 * Find 操作复杂度 O(h), h 为树高
 * Union 操作复杂度 O(h)
 */
class UnionFind2 {
  constructor(size) {
    this.parent = Array(size);

    for (let i = 0; i < size; i++) {
      this.parent[i] = i;
    }
  }

  GetSize() {
    return this.parent.length;
  }

  find(p) {
    if (p < 0 || p >= this.parent.length) {
      throw new Error("Invalid data index");
    }

    // 查找 p 元素所属的集合
    while(p != this.parent[p]) {
      p = this.parent[p];
    }
    return p;
  }

  IsConnected(p, q) {
    return this.find(p) === this.find(q);
  }

  UnionElements(p, q) {
    const pRoot = this.find(p);
    const qRoot = this.find(q);

    if (pRoot === qRoot) {
      return;
    }

    // 将两个集合的根合并为一个即可
    this.parent[pRoot] = qRoot;
  }
}

/**
 * 将 Quick Union 基于 Size 优化后的并查集
 * Find 和 Union 操作的复杂度还是 O(h)
 * 但是可以有效地降低树高
 */
class UnionFind3 {
  constructor(size) {
    this.parent = Array(size);
    this.sizes = Array(size);

    for (let i = 0; i < size; i++) {
      this.parent[i] = i;
      this.sizes = 1;
    }
  }

  GetSize() {
    return this.parent.length;
  }

  find(p) {
    if (p < 0 || p >= this.parent.length) {
      throw new Error("Invalid data index");
    }

    // 查找 p 元素所属的集合
    while(p != this.parent[p]) {
      p = this.parent[p];
    }
    return p;
  }

  IsConnected(p, q) {
    return this.find(p) === this.find(q);
  }

  UnionElements(p, q) {
    const pRoot = this.find(p);
    const qRoot = this.find(q);

    if (pRoot === qRoot) {
      return;
    }

    const pSize = this.sizes[pRoot];
    const qSize = this.sizes[qRoot];

    // 将树中节点少的树合并到大树上
    if (pSize < qSize) {
      this.parent[pRoot] = qRoot;
      this.sizes[qRoot] += pSize
    } else {
      this.parent[qRoot] = pRoot;
      this.sizes[pRoot] += qSize;
    }
  }
}

/**
 * 将 Quick Union 基于 Rank 优化的并查集
 */
class UnionFind4 {
  constructor(size) {
    this.parent = Array(size);
    this.rank = Array(size);

    for (let i = 0; i < size; i++) {
      this.parent[i] = i;
      this.rank = 1;
    }
  }

  GetSize() {
    return this.parent.length;
  }

  find(p) {
    if (p < 0 || p >= this.parent.length) {
      throw new Error("Invalid data index");
    }

    // 查找 p 元素所属的集合
    while(p != this.parent[p]) {
      p = this.parent[p];
    }
    return p;
  }

  IsConnected(p, q) {
    return this.find(p) === this.find(q);
  }

  UnionElements(p, q) {
    const pRoot = this.find(p);
    const qRoot = this.find(q);

    if (pRoot === qRoot) {
      return;
    }

    const pRank = this.rank[pRoot];
    const qRank = this.rank[qRoot];

    if (pRank < qRank) {
      this.parent[pRoot] = qRoot;
    } else if (pRank > qRank) {
      this.parent[qRoot] = pRoot;
    } else {
      this.parent[pRoot] = qRoot;
      this.rank[qRoot]++;
    }
  }
}

/**
 * 使用了路径压缩功能的后的基于 Rank 优化后的并查集
 */
class UnionFind5 {
  constructor(size) {
    this.parent = Array(size);
    this.rank = Array(size);

    for (let i = 0; i < size; i++) {
      this.parent[i] = i;
      this.rank = 1;
    }
  }

  GetSize() {
    return this.parent.length;
  }

  find(p) {
    if (p < 0 || p >= this.parent.length) {
      throw new Error("Invalid data index");
    }

    while(p != this.parent[p]) {
      // 路径压缩
      this.parent[p] = this.parent[this.parent[p]];
      p = this.parent[p];
    }
    return p;
  }

  IsConnected(p, q) {
    return this.find(p) === this.find(q);
  }

  UnionElements(p, q) {
    const pRoot = this.find(p);
    const qRoot = this.find(q);

    if (pRoot === qRoot) {
      return;
    }

    const pRank = this.rank[pRoot];
    const qRank = this.rank[qRoot];

    if (pRank < qRank) {
      this.parent[pRoot] = qRoot;
    } else if (pRank > qRank) {
      this.parent[qRoot] = pRoot;
    } else {
      this.parent[pRoot] = qRoot;
      this.rank[qRoot]++;
    }
  }
}

export default {
  uf1: UnionFind1,
  uf2: UnionFind2,
  uf3: UnionFind3,
  uf4: UnionFind4,
  uf5: UnionFind5
}
