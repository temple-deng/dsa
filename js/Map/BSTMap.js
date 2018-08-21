class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.left = this.right = null;
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
      const node = new Node(key, value);
      this.size++;
      return node;
    } else {
      if (key < root.key) {
        root.left = this.addInSubtree(root.left, key, value);
      } else if (key > root.key) {
        root.right = this.addInSubtree(root.right, key, value);
      } else {
        root.value = value;
      }
      return root;
    }
  }

  getNode(key) {
    return this.getNodeInSubtree(this.root, key);
  }

  getNodeInSubtree(root, key) {
    if (root === null) {
      return null;
    } else {
      if (key < root.key) {
        return this.getNodeInSubtree(root.left, key);
      } else if(key > root.key) {
        return this.getNodeInSubtree(root.right, key);
      } else {
        return root;
      }
    }
  }

  contains(key) {
    return this.getNode(key) !== null;
  }

  get(key) {
    const node = this.getNode(key);
    if (node === null) {
      return null;
    } else {
      return node.value;
    }
  }

  set(key, value) {
    const node = this.getNode(key);
    if (node === null) {
      throw new Error("Key is not in map");
    } else {
      node.value = value;
    }
  }

  remove(key) {
    const node = this.getNode(key);
    if (node === null) {
      return null;
    } else {
      const value = node.value;
      this.root = this.removeInSubtree(this.root, key);
      return value;
    }
  }

  removeInSubtree(root, key) {
    if (root === null) {
      return null;
    }

    if (key < root.key) {
      root.left = this.removeInSubtree(root.left, key);
    } else if (key > root.key) {
      root.right = this.removeInSubtree(root.right, key);
    } else {
      if (root.left === null) {
        const right = root.right;
        root = null;
        this.size--;
        return right;
      }

      if (root.right === null) {
        const left = root.left;
        root = null;
        this.size--;
        return left;
      }

      // 后继
      const min = this.minimum(root.right);
      root.right = this.removeMin(root.right);
      min.left = root.left;
      min.right = root.right;
      root = null;
      return min;
    }
  }

  minimum(root) {
    if (root.left === null) {
      return root;
    }
    return this.minimum(root.left);
  }

  removeMin(root) {
    if (root.left === null) {
      const right = root.right;
      root.right = null;
      this.size--;
      return right;
    }

    root.left = this.removeMin(root.left)
    return root;
  }
}