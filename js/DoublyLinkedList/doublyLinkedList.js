class Node {
  constructor(value) {
    this.next = this.prev = null;
    this.value = value;
  }

  toString() {
    return this.value.toString()
  }
}


class DoublyLinkedList {
  constructor() {
    this.dummyHead = new Node(null);
    this.length = 0;
  }

  getLength() {
    return this.length;
  }

  isEmpty() {
    return this.length === 0;
  }

  insert(index, value) {
    if (index < 0 || index > this.length) {
      throw new Error("Index out of range");
    }

    let prev = this.dummyHead;
    for (i = 0; i < index; i++) {
      prev = prev.next;
    }

    let node = new Node(value);
    node.next = prev.next;
    node.prev = prev;
    node.next.prev = node;
    prev.next = node;
    this.length++;
  }

  addFirst(value) {
    this.insert(0, value);
  }

  addLast(value) {
    this.insert(this.length, value);
  }

  remove(index) {
    
  }
}


