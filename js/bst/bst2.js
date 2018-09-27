class Node {
  constructor(key, val) {
    this.key = key;
    this.val = val;
    this.left = this.right = null;
  }
}

/**
 * 一个更加完整的 BST 的实现
 */
class BST {
  constructor() {
    this.root = null;
    this.size = 0;
  }

  IsEmpty() {
    return this.size === 0;
  }

  GetSize() {
    return this.size;
  }

  /**
   * 向 BST 中添加一个键值对，如果键已经存在，则更新对应键的值
   * @param {any} key 键
   * @param {any} val 值
   */
  Add(key, val) {
    this.root = this.add(this.root, key, val);
  }

  /**
   * 内部方法
   * 向以 node 为根的 BST 中插入键值对，并返回插入后新的 BST 的根
   * @param {Node} node BST 的根
   * @param {any} key 
   * @param {any} val 
   * @returns {Node} root 插入键值对后新的 BST 的根
   */
  add(node, key, val) {
    if (node == null) {
      this.size++;
      return new Node(key, val);
    }

    if (key > node.key) {
      node.right = this.add(node.right, key, val);
    } else if (key < node.key) {
      node.left = this.add(node.left, key, val);
    } else {
      node.val = val;
    }
    return node;
  }

  /**
   * 检查 BST 中是否包含给定键值对
   * @param {any} key 键名
   * @returns {boolean} contains 是否包含给定键值对
   */
  Contains(key) {
    return this.contains(this.root, key);
  }

  /**
   * 内部方法
   * 检查以 node 为根的 BST 中是否包含给定键值对
   * @param {Node} node 数根
   * @param {any} key 键名
   * @returns {boolean} contains 是否包含给定键值对
   */
  contains(node, key) {
    if (node === null) {
      return false;
    }

    if (node.key === key) {
      return true;
    } else if (key < node.key) {
      return this.contains(node.left, key);
    } else {
      return this.contains(node.right, key);
    }
  }

  /**
   * 先序遍历二叉树
   */
  PreOrder() {
    this.preOrder(this.root);
  }

  /**
   * 内部方法
   * 先序遍历以 node 为根的 BST
   * @param {Node} node
   */
  preOrder(node) {
    if (node === null) {
      return;
    }

    console.log(node);
    this.preOrder(node.left);
    this.preOrder(node.right);
  }

  /**
   * 中序遍历
   */
  InOrder() {
    this.inOrder(this.root);
  }

  /**
   * 内部方法
   * 中序遍历以 node 为根的 BST
   * @param {Node} node
   */
  inOrder(node) {
    if (node === null) {
      return
    }

    this.inOrder(node.left);
    console.log(node);
    this.inOrder(node.right);
  }

  /**
   * 后序遍历 BST
   */
  PostOrder() {
    this.postOrder(this.root);
  }

  /**
   * 后序遍历以 node 为根的 BST
   * @param {Node} node
   */
  postOrder(node) {
    if (node === null) {
      return
    }

    this.postOrder(node.left);
    this.postOrder(node.right);
    console.log(node);
  }

  /**
   * 返回 BST 中的键最大的键值对的值
   * @returns {any} value 最大键对应的键值，如果为 null，则表明 BST 为空树
   */
  Maximum() {
    if (this.root === null) {
      return null;
    }

    return this.maximum(this.root);
  }

  /**
   * 内部方法
   * 返回以 node 为根的 BST 中的最大键对应的键值
   * @param {Node} node
   * @returns {any} value 最大键对应的键值
   */
  maximum(node) {
    if (node.right === null) {
      return node.val;
    }
    return this.maximum(node.right);
  }

  /**
   * 返回最大键的节点
   * @returns {Node} maxNode 最大键的节点，空树时返回 null
   */
  MaximumNode() {
    if (this.root === null) {
      return null;
    }

    return this.maximumNode(this.root);
  }

  /**
   * 内部方法
   * @param {Node} node 
   * @returns {Node} maxNode 最大键的节点
   */
  maximumNode(node) {
    if (node.right === null) {
      return node;
    }
    return this.maximumNode(node.right);
  }

  // 类似 max
  Minimum() {
    if (this.root === null) {
      return null;
    }

    return this.minimum(this.root);
  }

  minimum(node) {
    if (node.left === null) {
      return node.val;
    }
    return this.minimum(node.left);
  }

  MinimumNode() {
    if (this.root === null) {
      return null;
    }

    return this.minimumNode(this.root);
  }

  minimumNode(node) {
    if (node.left === null) {
      return node;
    }
    return this.minimumNode(node.left);
  }

  /**
   * 删除树中最大的节点，并返回其键值
   * @returns {any} value 最大键的键值，空树时为 null
   */
  RemoveMax() {
    if (this.root === null) {
      return null;
    }

    const max = this.maximum(this.root);
    this.root = this.removeMax(this.root);
    return max;
  }

  /**
   * 内部方法
   * 在以 node 为根的的数中删除最大的节点，并返回删除后新的 BST 的根
   * @param {Node} node 
   * @returns {Node} 树的新的根
   */
  removeMax(node) {
    if (node.right === null) {
      const left = node.left;
      node.left = null;
      this.size--;
      return left;
    }
    node.right = this.removeMax(node.right);
    return node;
  }

  /**
   * 删除树中最小的节点，并返回其键值
   * @returns {any} value 最小的键值，空树时为 null
   */
  RemoveMin() {
    if (this.root === null) {
      return null;
    }

    const min = this.minimum(this.root);
    this.root = this.removeMin(this.root);
    return min;
  }

  /**
   * 内部方法
   * 删除以 node 为根的 BST 中最小的节点，并返回新的根
   * @param {Node} node
   * @returns {Node} 树的新根
   */
  removeMin(node) {
    if (node.left === null) {
      const right = node.right;
      node.right = null;
      this.size--;
      return right;
    }

    node.left = this.removeMin(node.left);
    return node;
  }

  /**
   * 在 BST 中删除指定键的节点
   * @param {any} key
   * @returns {null} 空树时返回 null，这个有点不合理哈，可以改成抛出异常
   */
  Remove(key) {
    if (this.root === null) {
      return null;
    }

    this.root = this.remove(this.root, key);
  }

  /**
   * 在以 node 为根的 BST 中删除给定键的节点
   * 并返回新的 BST 的根
   * @param {Node} node
   * @param {any} key 
   * @returns {Node} root 新的根
   */
  remove(node, key) {
    if (node === null) {
      return null;
    }

    if (key < node.key) {
      node.left = this.remove(node.left, key);
      return node;
    } else if (key > node.key) {
      node.right = this.remove(node.right, key);
      return node;
    } else {
      
      if (node.right === null) {
        const left = node.left;
        node.left = null;
        this.size--;
        return left;
      }

      if (node.left === null) {
        const right = node.right;
        node.right = null;
        this.size--;
        return right;
      }

      const successor = this.minimumNode(node.right);
      successor.left = node.left;
      successor.right = this.removeMin(node.right);
      node.left = node.right = null;
      return successor;
    }
  }
}

module.exports = BST;
