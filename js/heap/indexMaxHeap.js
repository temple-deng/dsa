const Arr = require('../myArray/myArray');

class IndexMaxHeap {
  constructor(arg) {
    this.data = new Arr(arg);
    this.index = new Arr(arg);
    if (Array.isArray(arg)) {
      for (let i = 0; i < arg.length; i++) {
        this.index[i] = i;
      }
    } else {
      for (let i = 0; i < arg; i++) {
        this.index[i] = i;
      }
    }

    this.size = this.data.length;
  }

  getSize() {
    return this.size;
  }

  isEmpty() {
    return this.size === 0;
  }

  add(value) {
    this.data.addLast(value);
    this.index.addLast(this.size);
    this.size++;
    this.siftUp();
  }

  extractMax() {
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

  siftUp() {
    let index = this.size - 1;
    while(index > 0 && this.data[this.index[index]] > this.data[this.index[this.parent(index)]]) {
      const parentIndex = this.parent(index);
      this.swap(this.index, index, parentIndex);
      index = parentIndex;
    }
  }

  siftDown(i) {
    while(this.leftChild(i) < this.size) {
      let j = this.leftChild;
      if (j + 1 < this.size && this.data[this.index[j+1]] > this.data[this.index[j]]) {
        j = j + 1;
      }

      if (this.data[this.index[i]] < this.data[this.index[j]]) {
        swap(this.index, i, j);
        i = j;
      } else {
        break;
      }
    }
  }

  swap(arr, i, j) {
    const temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
}

module.exports = IndexMaxHeap;
