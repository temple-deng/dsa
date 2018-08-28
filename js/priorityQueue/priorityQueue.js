const MaxHeap = require('../heap/heap');

class PriorityQueue {
  constructor() {
    this.maxHeap = new MaxHeap();
  }

  getSize() {
    return this.maxHeap.getSize();
  }

  isEmpty() {
    return this.maxHeap.isEmpty();
  }

  enqueue(value) {
    this.maxHeap.add(value);
  }

  dequeue() {
    return this.maxHeap.removeMax();
  }

  getFront() {
    return this.maxHeap.findMax();
  }
}

module.exports = PriorityQueue;
