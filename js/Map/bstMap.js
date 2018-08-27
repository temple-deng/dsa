class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.left = null;
    this.right = null;
  }

  toString() {
    return this.key.toString() + ': ' + this.value.toString();
  }
}

class BSTMap {
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

  add(key, value) {
    this.root = this.addInSubtree(this.root, key, value);
  }

  addInSubtree(root, key, value) {
    if (root === null) {
      const node = new Node(key, value)
      this.size++;
      return node;
    }

    if (key < root.key) {
      root.left = this.addInSubtree(root.left, key, value);
    }

    if (key > root.key) {
      root.right = this.addInSubtree(root.right, key, value);
    }

    return root;
  }

  contains(key) {
    return this.containsInSubtree(this.root, key);
  }

  containsInSubtree(root, key) {
    if (root === null) {
      return false;
    }

    if (key === root.key) {
      return true;
    }

    if (key < root.key) {
      return this.containsInSubtree(root.left, key);
    }

    if (key > root.key) {
      return this.containsInSubtree(root.right, key);
    }
  }

  getNode(root, key) {
    if (root === null) {
      return null;
    }

    if (root.key === key) {
      return root;
    }

    if (key < root.key) {
      return this.getNode(root.left, key);
    }

    if (key > root.key) {
      return this.getNodeO(root.right, key);
    }
  }

  get(key) {
    const node = this.getNode(key);
    // 注意这里其实有隐藏的 bug 的，当值为 null 的时候，是区分不出来是否存在的
    if (node === null) {
      return null;
    }

    return node.value;
  }

  set(key, value) {
    const node = this.getNode(key);
    if (node === null) {
      throw new Error("Key is not in map");
    }

    node.value = value;
  }


  minimum() {
    if (this.root === null) {
      throw new Error("Map is empty");
    }

    const minNode = this.minimumNode(this.root);
    return minNode.value;
  }

  minimumNode(root) {
    if (root.left !== null) {
      return this.minimumNode(root.left);
    }

    return root;
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

  remove(key) {
    if (!this.contains(key)) {
      throw new Error("Value doesn't in BST");
    }
    this.root = this.removeInSubtree(this.root, key);
  }

  removeInSubtree(root, key) {
    if (root === null) {
      return null;
    }

    if (key < root.key) {
      root.left = this.removeInSubtree(root.left, key);
      return root;
    }

    if (key > root.key) {
      root.right = this.removeInSubtree(root.right, key);
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
