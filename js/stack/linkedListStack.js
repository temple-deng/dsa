const LinkedList = require('../linkedList/linkedList');

class LinkedListStack {
  constructor() {
    this.list = new LinkedList();
  }

  getSize() {
    return this.list.getSize();
  }

  isEmpty() {
    return this.list.isEmpty();
  }

  push(elem) {
    this.list.addFirst(elem);
  }

  pop() {
    return this.list.removeFirst();
  }

  peek() {
    return this.list.getFirst();
  }

  toString() {
    const size = this.getSize();
    let str = "LinkedListStack: Top [ "
    for (let i = 0; i < size; i ++) {
      str += this.list.get(i);
      if (i !== size - 1) {
        str += ', '
      }
    }
    str += " ] Bottom";
    return str;
  }
}

module.exports = LinkedListStack;
