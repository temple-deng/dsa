class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.red = true;
    this.left = null;
    this.right = null;
  }
}

class RBTree {
  constructor() {
    this.root = new Node(null, null);
    this.root.red = false;
    this.size = 0;
  }
  

  getSize() {
    return this.size;
  }

  isEmpty() {
    return this.size === 0;
  }

  insert(key, value) {
    this.root = this.insertInTree(this.root, key, value);
    this.root.red = false;
  }

  insertInTree(node, key, value) {
    if (node === null) {
      const newNode = new Node(key, value);
      this.size++;
      return newNode;
    }

    if (key < node.key) {
      node.left = this.insertInTree(node.left, key, value);
    }

    if (key > node.key) {
      node.right = this.insertInTree(node.right, key, value);
    }

    if (key === node.key) {
      node.value = value;
    }

    // 回想我们的整个流程
    // 完整的应该是 左旋 -> 右旋 -> 反转

    // 如果右红左不红，2- 节点右插入和 3- 节点右插入
    if (this.isRed(node.right) && !this.isRed(node.left)) {
      node = this.rotateLeft(node);
    }

    // 左左双红
    if (this.isRed(node.left) && this.isRed(node.left.left)) {
      node = this.rotateRight(node);
    }

    if (this.isRed(node.left) && this.isRed(node.right)) {
      this.flipColor(node);
    }
  }

  isRed(node) {
    if (node === null) {
      return false;
    }
    return node.red;
  }

  rotateLeft(node) {
    const x = node.right;
    node.right = x.left;
    x.left = node;
    x.red = node.red;
    node.red = true;
    return x;
  }

  rotateRight(node) {
    const x = node.left;
    node.left = x.right;
    x.right = node;
    x.color = node.color;
    node.red = true;
  }

  flipColor(node) {
    // 这里不需要添加 node.left 和 node.right 的判断
    // 为什么呢，因为我们仔细想想什么时候会需要颜色反转呢
    // 3- 节点的右插入，那必然左右节点都不为空
    node.left.red = false;
    node.right.red = false;
    node.red = true;
  }


}