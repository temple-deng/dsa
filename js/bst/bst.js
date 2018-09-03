class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  toString() {
    return this.value.toString();
  }
}

class BST {
  constructor() {
    this.root = null;
    this.size = 0;
  }

  getSize() {
    return this.size;
  }

  isEmpty() {
    return this.size === 0;
  }

  // 像树中添加节点
  add(value) {
    this.root = this.addInSubtree(this.root, value);
  }

  addInSubtree(root, value) {
    if (root === null) {
      const node = new Node(value)
      this.size++;
      return node;
    }

    if (value < root.value) {
      root.left = this.addInSubtree(root.left, value);
    }

    if (value > root.value) {
      root.right = this.addInSubtree(root.right, value);
    }

    return root;
  }

  contains(value) {
    return this.containsInSubtree(this.root, value);
  }

  containsInSubtree(root, value) {
    if (root === null) {
      return false;
    }

    if (value === root.value) {
      return true;
    }

    if (value < root.value) {
      return this.containsInSubtree(root.left, value);
    }

    if (value > root.value) {
      return this.containsInSubtree(root.right, value);
    }
  }

  preOrder() {
    return this.preOrderSubTree(this.root);
  }

  preOrderSubTree(node) {
    if (node === null) {
      return;
    }

    console.log(node.toString());
    this.preOrderSubTree(node.left);
    this.preOrderSubTree(node.right);
  }

  inOrder() {
    return this.inOrderSubTree(this.root);
  }

  inOrderSubTree(node) {
    if (node === null) {
      return;
    }

    this.inOrderSubTree(node.left);
    console.log(node.toString());
    this.inOrderSubTree(node.right);
  }

  postOrder() {
    return this.postOrderSubTree(this.root);
  }

  postOrderSubTree(node) {
    if (node === null) {
      return;
    }

    this.postOrderSubTree(node.left);
    this.postOrderSubTree(node.right);
    console.log(node.toString());
  }

  // 寻找树中最大的值
  maximum() {
    if (this.root === null) {
      throw new Error("BST is empty");
    }

    const maxNode = this.maximumNode(this.root);
    return maxNode.value;
  }

  // 寻找树中拥有最大值的节点
  maximumNode(root) {
    if (root.right !== null) {
      return this.maximumNode(root.right);
    }

    return root;
  }

  // 寻找树中最小的值
  minimum() {
    if (this.root === null) {
      throw new Error("BST is empty");
    }

    const minNode = this.minimumNode(this.root);
    return minNode.value;
  }

  // 寻找树中拥有最小值的节点
  minimumNode(root) {
    if (root.left !== null) {
      return this.minimumNode(root.left);
    }

    return root;
  }

  // 移除最大值
  removeMax() {
    const max = this.maximum();
    this.root = this.removeMaxNode(this.root);
    return max;
  }

  removeMaxNode(root) {
    if (root.right !== null) {
      root.right = this.removeMaxNode(root.right);
      return root;
    }

    const left = root.left;
    this.size--;
    root.left = null;
    return left;
  }

  // 移除最小值
  removeMin() {
    const min = this.minimum();
    this.root = this.removeMinNode(this.root);
    return min;
  }

  removeMinNode(root) {
    if (root.left !== null) {
      root.left = this.removeMinNode(root.left);
      return root;
    }

    const right = root.right;
    this.size--;
    root.right = null;
    return right;
  }

  // 移除一个值
  remove(value) {
    if (!this.contains(value)) {
      throw new Error("Value doesn't in BST");
    }
    this.root = this.removeInSubtree(this.root, value);
  }

  removeInSubtree(root, value) {
    if (root === null) {
      return null;
    }

    if (value < root.value) {
      root.left = this.removeInSubtree(root.left, value);
      return root;
    }

    if (value > root.value) {
      root.right = this.removeInSubtree(root.right, value);
      return root;
    }

    if (root.left === null) {
      const right = root.right;
      root.right = null;
      this.size--;
      return right;
    }

    if (root.right === null) {
      const left = root.left;
      root.left = null;
      this.size--;
      return left;
    }

    const successor = this.minimumNode(root.right);
    successor.right = root.right;
    successor.left = root.left;
    this.removeMinNode(root.right);
    root.left = root.right = null;
    this.size--;
    return successor;
  }
}

module.exports = BST;
