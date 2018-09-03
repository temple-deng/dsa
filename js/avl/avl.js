class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.left = this.right = null;
    this.height = 1;
  }
}


class AVLTree {
  constructor() {
    this.root = null;
    this.size = 0;
  }

  getSize() {
    return this.size;
  }

  isBalanced() {
    return this.isBalancedTree(this.root);
  }

  isBalancedTree(root) {
    if (root === null) {
      return true;
    }

    if (Math.abs(this.getBalanceFactor(root)) > 1) {
      return false;
    }

    return this.isBalancedTree(root.left) && this.isBalancedTree(root.right);
  }

  isEmpty() {
    return this.size === 0;
  }

  getHeight(node) {
    if (node === null) {
      return 0;
    }
    return node.height;
  }

  getBalanceFactor(node) {
    if (node === null) {
      return 0;
    }

    return this.getHeight(node.left) - this.getHeight(node.right);
  }

  insert(key, value) {
    this.root = this.insertInTree(this.root, key, value);
  }

  insertInTree(root, key, value) {
    if (root === null) {
      const node = new Node(key, value);
      this.size++;
      return node;
    }

    if (root.key === key) {
      root.value = value;
    } else if (key < root.key) {
      root.left = this.insertInTree(root.left, key, value);
    } else {
      root.right = this.insertInTree(root.right, key, value);
    }

    root.height = Math.max(this.getHeight(root.left), this.getHeight(root.right)) + 1;

    const factor = this.getBalanceFactor(root);

    if (factor > 1 && this.getBalanceFactor(root.left) >= 0) {
      return this.rightRotate(root);
    }

    if (factor > 1 && this.getBalanceFactor(root.left) < 0) {
      root.left = this.leftRotate(root.left);
      return this.rightRotate(root);
    }

    if (factor < -1 && this.getBalanceFactor(root.right) <= 0) {
      return this.leftRotate(root);
    }

    if (factor < -1 && this.getBalanceFactor(root.right) > 0) {
      root.right = this.rightRotate(root.right);
      return this.leftRotate(root);
    }

    return root;
  }

  leftRotate(node) {
    const x = node.right;
    const left = x.left;
    x.left = node;
    node.right = left;

    node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
    return x;
  }

  rightRotate(node) {
    const x = node.left;
    const right = x.right;
    x.right = node;
    node.left = right;

    node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
    return x;
  }

  getNode(node, key) {
    if (node === null) {
      return null;
    }

    if (key < node.key) {
      return this.getNode(node.left);
    } else if (key > node.key) {
      return this.getNode(node.right);
    } else {
      return node;
    }
  }

  remove(key) {
    const node = this.getNode(this.root, key);
    if (node === null) {
      return null;
    }

    this.root = this.removeInTree(this.root, key);
    return node.value;
  }

  removeInTree(root, key) {
    if (root === null) {
      return null;
    }

    let retNode = root;

    if (key < root.key) {
      root.left = this.removeInTree(root.left, key);
    } else if (key > root.key) {
      root.right = this.removeInTree(root.right, key);
    } else {
      if (root.left === null) {
        const right = root.right;
        root.right = null;
        this.size--;
        retNode = right;
      } else if (root.right === null) {
        const left = root.left;
        root.left = null;
        this.size--;
        retNode = left;
      } else {
        const successor = this.minimumNode(root.right);
        root.right = this.removeMin(root.right);
        successor.left = root.left;
        successor.right = root.right;
        root.left = root.right = null;
        retNode = successor;
      }
    }

    if (retNode === null) {
      return null;
    }

    retNode.height = Math.max(this.getHeight(retNode.left), this.getHeight(retNode.right));

    const factor = this.getBalanceFactor(retNode);

    if (factor > 1 && this.getBalanceFactor(retNode.left) >= 0) {
      return this.rightRotate(retNode);
    }

    if (factor > 1 && this.getBalanceFactor(retNode.left) < 0) {
      retNode.left = this.leftRotate(retNode.left);
      return this.rightRotate(retNode);
    }

    if (factor < -1 && this.getBalanceFactor(retNode.right) <= 0) {
      return this.leftRotate(retNode);
    }

    if (factor < -1 && this.getBalanceFactor(retNode.right) > 0) {
      retNode.right = this.rightRotate(retNode.right);
      return this.leftRotate(retNode);
    }

    return retNode;
  }

  minimumNode(root) {
    if (root.right === null) {
      return root;
    }
    return this.minimumNode(root.right);
  }

  removeMin(root) {
    if (root.left === null) {
      this.size--;
      return null;
    }
    root.left = this.removeMin(root.left);
    return root;
  }
}

module.exports = AVLTree;
