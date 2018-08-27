const Arr = require('../myArray/myArray');

class MaxHeap {
  constructor(arg) {
    this.data = new Arr(arg);
    if (Array.isArray(arg)) {
      this.heapify();
    }
  }

  heapify() {
    let length = this.data.getLength();
    let lastBranchIndex = this.parent(length - 1);
    for (let i = lastBranchIndex; i >= 0; i--) {
      this.siftDown(i);
    }
  }

  getSize() {
    return this.data.getLength();
  }

  isEmpty() {
    return this.data.isEmpty();
  }

  parent(i) {
    return Math.floor((i - 1) / 2);
  }

  leftChild(i) {
    return i * 2 + 1;
  }

  rightChild(i) {
    return i * 2 + 2;
  }

  add(value) {
    this.data.addLast(value);
    this.siftUp(this.data.getLength() - 1);
  }

  siftUp(index) {
    while(index > 0 && this.data.get(this.parent(index)) < this.data.get(index)) {
      this.swap(index, this.parent(index));
      index = this.parent(index);
    }
  }

  swap(i1, i2) {
    let temp = this.data.get(i2);
    this.data.set(i2, this.data.get(i1));
    this.data.set(i1, temp);
  }

  findMax() {
    return this.data.getFirst();
  }

  removeMax() {
    let max = this.findMax();
    let last = this.data.getLast();
    this.data.set(0, last);
    this.data.removeLast();
    this.siftDown(0);
    return max;
  }

  siftDown(index) {
    while(this.leftChild(index) < this.data.getLength()) {
      let leftIndex = this.leftChild(index);
      let rightIndex = leftIndex + 1;
      let max = leftIndex;

      if (rightIndex < this.data.getLength() && this.data.get(leftIndex) < this.data.get(rightIndex)) {
        max = rightIndex;
      }

      let value = this.data.get(index);
      if (value < this.data.get(max)) {
        this.swap(index, max);
        index = max;
      } else {
        break;
      }
    }
  }

  replace(value) {
    this.data.set(0, value);
    this.siftDown(0);
  }
}

module.exports = MaxHeap;
