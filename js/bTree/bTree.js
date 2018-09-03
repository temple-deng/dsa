class Node {
  constructor(key, value) {
    this.keys = [key];
    this.values = [value];
    this.children = [null, null];
  }

  insert(key, value) {
    
  }

  getDegree() {
    return this.keys.length - 1;
  }
}

class BTree {
  constructor(degree) {
    this.degree = degree;
    this.root = null;
    this.size = 0;
  }

  getSize() {
    return this.size;
  }

  isEmpty() {
    return this.size === 0;
  }

  insert(key, value) {
    this.root = this.insertInTree(key, value);
  }

  isFull(node) {

  }
}