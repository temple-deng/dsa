class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.dummyHead = new Node(null);
    this.size = 0;
  }

  getSize() {
    return this.size;
  }

  isEmpty() {
    return this.size === 0;
  }

  insert(index, data) {
    if (index < 0 || index > this.size) {
      throw new Error("Index out of the range");
    }

    let prev = this.dummyHead;
    for(let i = 0; i < index; i++) {
      prev = prev.next;
    }

    const node = new Node(data);
    node.next = prev.next;
    prev.next = node;
    this.size++;
  }

  addFirst(data) {
    this.insert(0, data);
  }

  addLast(data) {
    this.insert(this.size, data);
  }

  remove(index) {
    if (index < 0 || index > this.size - 1) {
      throw new Error("Index out of the range");
    }

    let prev = this.dummyHead;
    for (let i = 0; i < index; i++) {
      prev = prev.next;
    }

    let node = prev.next;
    prev.next = node.next;
    const data = node.data;
    node = null;
    this.size--;
    return data;
  }

  removeFirst() {
    return this.remove(0);
  }

  removeLast() {
    return this.remove(this.size-1);
  }

  get(index) {
    if (index < 0 || index >= this.size) {
      throw new Error("Index out of the range");
    }

    let current = this.dummyHead.next;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }

    return current.data;
  }

  getFirst() {
    return this.get(0);
  }

  getLast() {
    return this.get(this.size-1)
  }

  set(index, data) {
    if (index < 0 || index >= this.size) {
      throw new Error("Index out of the range");
    }

    let current = this.dummyHead;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }

    current.data = data;
  }

  toString() {
    let str = `LinkedList: Size = ${this.size}\n`;
    let current = this.dummyHead.next;
    while(current.next != null) {
      str += `${current.data} -> `;
      current = current.next;
    }
    str += `${current.data} -> Null`;
    return str;
  }
}

module.exports = LinkedList;
