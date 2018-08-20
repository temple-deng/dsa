class Node {
  constructor(key, value) {
    this.key = key;
    this.value = key;
    this.next = null;
  }

  toString() {
    return `{${this.key}: ${this.value}}`;
  }
}

class LinkedListMap {
  constructor() {
    this.dummyHead = new Node(null, null);
    this.size = 0;
  }

  getSize() {
    return this.size;
  }

  isEmpty() {
    return this.size === 0;
  }

  getNode(key) {
    let cur = this.dummyHead.next;
    while(cur != null) {
      if (cur.key === key) {
        return cur;
      }
      cur = cur.next;
    }
    return null;
  }

  contains(key) {
    return this.getNode(key) === null;
  }

  get(key) {
    const node = this.getNode(key);
    if (node === null) {
      return null;
    } else {
      return node.value;
    }
  }

  add(key, value) {
    const node = this.getNode(key);
    if (node === null) {
      const newNode = new Node(key, value);
      newNode.next = this.dummyHead.next;
      this.dummyHead.next = newNode;
      // 记住这个，老忘
      this.size++;
    } else {
      node.value = value;
    }
  }

  set(key, value) {
    const node = this.getNode(key, value);
    if (node === null) {
      throw new Error("Key is not in map");
    } else {
      node.value = value;
    }
  }

  remove(key) {
    let prev = this.dummyHead;
    while(prev.next !== null) {
      if (key === prev.next.key) {
        let cur = prev.next;
        prev.next = cur.next;
        const value = cur.value;
        cur = null;
        this.size--;
        return value;
      }
      prev = prev.next;
    }

    return null;
  }

  // @TODO:
  toString() {
    return '11232131'
  }
}

export default LinkedListMap;
