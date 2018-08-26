const Arr = require('../myArray/myArray');

// 数组栈的实现
// done
class Stack {
  constructor(capacity) {
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
    let str = 'Stack Top : [ ';
    const length = this.getLength();
    for (let i = length - 1; i >= 0 ; i--) {
      str += this.data.get(i);
      if (i > 0) {
        str += ', '
      }
    }

    str += ' ] Bottom'
    return str;
  }
}

module.exports = Stack;