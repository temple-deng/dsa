class SegmentTree {
  constructor(data, merger) {
    this.data = Array(data.length)
    for (let i = 0; i < data.length; i++) {
      this.data[i] = data[i];
    }
    this.tree = Array(data.length * 4);
    this.merger = merger;
    this.buildSegmentTree(0, 0, data.length-1);
  }

  /**
   * 构建一个线段树
   * 首先构建左子树和右子树
   * 然后计算左右孩子的 merger 值
   * 设置根的值
   * @param {number} index 根在 tree 数组中的索引值
   * @param {number} left 当前树所包含区间左端点
   * @param {number} right 当前树所包含区间右端点
   */
  buildSegmentTree(index, left, right) {
    if (left === right) {
      this.tree[index] = this.data[left];
      return;
    }

    const mid = left + Math.floor((right - left) / 2);
    const leftIndex = this.leftChild(index);
    const rightIndex = this.rightChild(index);
    this.buildSegmentTree(leftIndex, left, mid);
    this.buildSegmentTree(rightIndex, mid+1, right);
    
    const result = this.merger(this.tree[leftIndex], this.tree[rightIndex]);
    this.tree[index] = result;
  }

  getSize() {
    return this.data.length;
  }

  isEmpty() {
    return this.data.length === 0;
  }

  leftChild(index) {
    return index * 2 + 1;
  }

  rightChild(index) {
    return index * 2 + 2;
  }

  /**
   * 获取线段树中某个元素值
   * @param {number} index 元素索引
   */
  get(index) {
    if (index < 0 || index >= this.data.length) {
      throw new Error("Index out of range");
    }

    return this.data[index];
  }

  set(index, value) {
    if (index < 0 || index >= this.data.length) {
      throw new Error("Index out of range");
    }

    this.data[index] = value;
    this.setInTree(0, 0, this.data.length-1, index, value);
  }

  setInTree(rootIndex, left, right, index, value) {
    if (left === right && left === index) {
      this.tree[rootIndex] = value;
      return;
    }

    const mid = left + Math.floor((right - left) / 2);
    const leftIndex = this.leftChild(rootIndex);
    const rightIndex = this.rightChild(rootIndex);

    if (index <= mid) {
      this.setInTree(leftIndex, left, mid, index, value);
    } else {
      this.setInTree(rightIndex, mid+1, right, index, value);
    }

    const result = this.merger(
      this.tree[leftIndex],
      this.tree[rightIndex]
    );
    this.tree[rootIndex] = result;
    return;
  }

  /**
   * 在线段树中查询一个区间的信息
   * 注意查询采用的是全闭合的查询，也就是包含右端点的查询
   * @param {number} queryL 查询区间左端点 
   * @param {number} queryR 查询区间右端点
   * @return {any} 区间查询值
   */
  query(queryL, queryR) {
    if (queryL > queryR) {
      const temp = queryR;
      queryR = queryL;
      queryL = temp;
    }

    if (queryR < 0 || queryL > this.data.length - 1) {
      throw new Error("Range illegal");
    }

    if (queryL < 0) {
      queryL = 0;
    }

    if (queryR > this.data.length - 1) {
      queryR = this.data.length - 1;
    }

    return this.queryInTree(0, queryL, queryR, 0, this.data.length-1);
  }

  /**
   * 在以 index 为根的树中查询指定区间值
   * @param {number} index 跟在 tree 中的索引
   * @param {number} queryL 查询左端点
   * @param {number} queryR 查询右端点
   * @param {number} l 当前树包含的区间左端点
   * @param {number} r 当前树包含的区间右端点
   * @return {any} 查询到的区间值
   */
  queryInTree(index, queryL, queryR, l, r) {
    if (queryL === l && queryR === r) {
      return this.tree[index];
    }

    const mid = l + Math.floor((r - l) / 2);
    const leftIndex = this.leftChild(index);
    const rightIndex = this.rightChild(index);

    if (queryR <= mid) {
      return this.queryInTree(leftIndex, queryL, queryR, l, mid);
    }

    if (queryL >= mid + 1) {
      return this.queryInTree(rightIndex, queryL, queryR, mid+1, r);
    }

    const result = this.merger(
      this.queryInTree(leftIndex, queryL, mid, l, mid),
      this.queryInTree(rightIndex, mid + 1, queryR, mid + 1, r)
    );
    return result;
  }
}