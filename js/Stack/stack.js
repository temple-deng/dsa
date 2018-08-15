const Arr = require('../MyArray/MyArray');

class Stack {
  constructor(capacity = 100) {
    this.data = new Arr(capacity);
  }

  getLength() {
    return this.data.getLength();
  }

  getCapacity() {
    return this.data.getCapacity();
  }

  isEmpty() {
    return this.data.isEmpty();
  }

  push(elem) {
    this.data.addLast(elem);
  }

  pop() {
    return this.data.removeLast();
  }

  peek() {
    return this.data.get(this.getLength() - 1);
  }

  toString() {
    let str = 'Stack:\n';
    str += 'Top: ';
    const length = this.getLength();
    for (let i = length - 1; i > 0 ; i--) {
      str += this.data.get(i) + ', ';
    }

    if (length !== 0) {
      str += this.data.get(0) + ' Bottom';
    }
    return str;
  }
}

module.exports = Stack;