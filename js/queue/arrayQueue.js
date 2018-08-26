const Arr = require("../myArray/myArray");

/**
 * 数组队列的实现
 * 队列的几个核心接口
 * enqueue(elem): 入队一个元素
 * dequeue() elem: 出队一个元素
 * getFront() elem: 查看队首元素
 * done
 */
class ArrayQueue {
  constructor(cap) {
    this.data = new Arr(cap);
  }

  getLength() {
    return this.data.getLength();
  }

  isEmpty() {
    return this.data.isEmpty();
  }

  enqueue(elem) {
    this.data.addLast(elem);
  }

  dequeue() {
    return this.data.removeFirst();
  }

  getFront() {
    return this.data.get(0);
  }

  toString() {
    let str = "Queue front: ";
    str += this.data.toString();
    str += " tail";
    return str;
  }
}

module.exports = ArrayQueue;
