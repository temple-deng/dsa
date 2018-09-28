class SegmentTree {
  constructor(data, merger) {
    this.data = Array(data.length);
    this.tree = Array(4 * data.length);

    for (let i = 0; i < data.length; i++) {
      this.data[i] = data[i];
    }

    this.merger = merger;
    this.buildSegmentTree(0, 0, data.length-1);
  }

  buildSegmentTree(index, left, right) {
    if (left === right) {
      this.tree[index] = this.data[left];
      return;
    }

    const mid = Math.floor((right - left) / 2) + left;
    const leftChildIndex = this.leftChild(index);
    const rightChildIndex = this.rightChild(index);
    this.buildSegmentTree(leftChildIndex, left, mid);
    this.buildSegmentTree(rightChildIndex, mid+1, right);
    
    this.tree[index] = this.merger(this.tree[leftChildIndex], this.tree[rightChildIndex]);
  }

  Get(index) {
    if (index < 0 || index >= this.data.length) {
      throw new Error("Invalid index");
    }
    return this.data[index];
  }

  Set(index, value) {
    if (index < 0 || index >= this.data.length) {
      throw new Error("Invalid index");
    }

    this.data[index] = value;
    this.set(0, 0, this.data.length-1, index, value);
  }

  set(rootIndex, left, right, index, value) {
    if (left === right && left === index) {
      this.tree[rootIndex] = value;
      return;
    }

    const mid = Math.floor((right - left) / 2) + left;
    const leftIndex = this.leftChild(index);
    const rightIndex = this.rightChild(index);

    if (index > mid) {
      // 右子树
      this.set(rightIndex, mid+1, right, index, value);
      this.tree[rootIndex] = this.merger(this.tree[leftIndex], this.tree[rightIndex]);
    } else {
      // 左子树
      this.set(leftIndex, left, mid, index, value);
      this.tree[rootIndex] = this.merger(this.tree[leftIndex], this.tree[rightIndex]);
    }
  }

  Query(queryL, queryR) {
    if (queryL > queryR) {
      let temp = queryL;
      queryL = queryR;
      queryR = temp;
    }

   if (queryL < 0) {
     queryL = 0;
   }

   if (queryR >= this.data.length) {
     queryR = this.data.length - 1;
   }

   return this.query(0, 0, this.data.length-1, queryL, queryR);
  }

  query(rootIndex, left, right, qL, qR) {
    if (left === qL && right === qR) {
      return this.tree[rootIndex];
    }

    const mid = Math.floor((right - left) / 2) + left;

    // 整体在左面
    if (qR <= mid) {
      return this.query(this.leftChild(rootIndex), left, mid, qL, qR);
    }

    // 整体在右面
    if (qL > mid) {
      return this.query(this.rightChild(rootIndex), mid+1, right, qL, qR);
    }

    // 分布在两侧

    const leftVal = this.query(this.leftChild(rootIndex), left, mid, qL, mid);
    const rightVal = this.query(this.rightChild(rootIndex), mid+1, right, mid+1, qR);

    return this.merger(leftVal, rightVal);
  }

  leftChild(i) {
    return i * 2 + 1;
  }

  rightChild(i) {
    return i * 2 + 2;
  }

  parent(i) {
    return Math.floor((i - 1) / 2);
  }
}