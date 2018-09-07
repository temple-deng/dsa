class MinHeap {
  constructor(cap) {
    this.cap = cap;
    this.data = Array(cap);
    this.count = 0;
  }

  IsEmpty() {
    return this.count === 0;
  }

  GetSize() {
    return this.count;
  }

  Insert(value) {
    if (this.count === this.cap) {
      throw new Error("Full heap");
    }

    this.data[this.count] = value;
    this.shiftUp(this.count);
    this.count++;
  }

  ExtractMin() {
    if (this.count === 0) {
      throw new Error("Empry heap");
    }

    const value = this.data[0];
    this.swap(0, this.count-1);
    this.count--;
    this.shiftDown(0);
    return value;
  }

  parent(index) {
    return Math.floor((index - 1) / 2);
  }

  leftChild(index) {
    return index * 2 + 1;
  }

  rightChild(index) {
    return index * 2 + 1;
  }

  shiftUp(index) {
    while(index > 0 && this.data[index] < this.data[this.parent(index)]) {
      this.swap(index, this.parent(index));
      index = this.parent(index);
    }
  }

  shiftDown(index) {
    while(this.leftChild(index) < this.count) {
      let j = this.leftChild(index);
      if (j+1 < this.count && this.data[j+1] < this.data[j]) {
        j++;
      }

      if (this.data[j] < this.data[index]) {
        this.swap(j, index);
        index = j;
      } else {
        break;
      }
    }
  }

  swap(i, j) {
    const temp = this.data[j];
    this.data[j] = this.data[i];
    this.data[i] = temp;
  }
}

module.exports = MinHeap;
