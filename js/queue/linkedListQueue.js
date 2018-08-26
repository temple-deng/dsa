class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedListQueue {
  constructor() {
    this.dummyHead = new Node(null);
    this.tail = this.dummyHead;
    this.size = 0;
  }

  getSize() {
    return this.size;
  }

  isEmpty() {
    return this.size === 0;
  }

  enqueue(elem) {
    const node = new Node(elem);
    this.tail.next = node;
    this.tail = node;
    this.size++;
  }

  dequeue() {
    if (this.tail === this.dummyHead) {
      throw new Error("Queue is empty!");
    }

    // console.log(this.dummyHead);
    const node = this.dummyHead.next;
    this.dummyHead.next = node.next;
    node.next = null;
    this.size--;
    return node.data;
  }

  getFront() {
    if (this.tail === this.dummyHead) {
      throw new Error("Queue is empty!");
    }

    return this.dummyHead.next.data;
  }

  toString() {
    let str = "LinkedListQueue: Front [ ";
    let current = this.dummyHead.next;
    while(current !== null) {
      str += current.data;
      if (current.next !== null) {
        str += ", "
      }
      current = current.next;
    }
    str += " ] Tail";
    return str;
  }
}

module.exports = LinkedListQueue;
