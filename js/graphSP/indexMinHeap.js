class IndexMinHeap {
  constructor(cap) {
    this.cap = cap;
    this.data = Array(cap);
    this.indexes = Array(cap);
    this.reverse = Array(cap);
    this.count = 0;

    for (let i = 0; i < cap; i++) {
      this.reverse[i] = -1;
    }
  }

  IsEmpty() {
    return this.count === 0;
  }

  GetSize() {
    return this.count;
  }

  Contains(index) {
    if (index < 0 || index >= this.cap) {
      return false;
    }
    return this.reverse[index] !== -1; 
  }

  Insert(index, value) {
    if (index < 0 || index >= this.cap) {
      throw new Error("Invalid index");
    }

    if (this.Contains(index)) {
      throw new Error("Index exists");
    }

    this.data[index] = value;
    this.indexes[this.count] = index;
    this.reverse[index] = this.count;
    this.shiftUp(this.count);
    this.count++;
  }

  GetMin() {
    if (this.count === 0) {
      throw new Error("Empry heap");
    }
    return this.data[this.indexes[0]];
  }

  GetMinIndex() {
    if (this.count === 0) {
      throw new Error("Empry heap");
    }
    return this.indexes[0];
  }

  GetItem(index) {
    if (!this.Contains(index)) {
      return null;
    }
    return this.data[index];
  }

  ExtractMin() {
    if (this.count === 0) {
      throw new Error("Empry heap");
    }

    const value = this.data[this.indexes[0]];
    this.reverse[this.indexes[0]] = -1;
    this.swapIndex(0, this.count-1);
    this.count--;
    this.shiftDown(0);
    return value;
  }

  ExtractMinIndex() {
    if (this.count === 0) {
      throw new Error("Empry heap");
    }

    const index = this.indexes[0];
    this.reverse[index] = -1;
    this.swapIndex(0, this.count-1);
    this.count--;
    this.shiftDown(0);
    return index;
  }

  Change(index, value) {
    if (!this.Contains(index)) {
      throw new Error("Invalid index");
    }

    this.data[index] = value;
    const j = this.reverse[index];
    this.shiftUp(j);
    this.shiftDown(j);
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
    while(index > 0 && this.data[this.indexes[index]] < this.data[this.indexes[this.parent(index)]]) {
      this.swapIndex(index, this.parent(index));
      index = this.parent(index);
    }
  }

  shiftDown(index) {
    while(this.leftChild(index) < this.count) {
      let j = this.leftChild(index);
      if (j+1 < this.count && this.data[this.indexes[j+1]] < this.data[this.indexes[j]]) {
        j++;
      }

      if (this.data[this.indexes[j]] < this.data[this.indexes[index]]) {
        this.swapIndex(j, index);
        index = j;
      } else {
        break;
      }
    }
  }

  swapIndex(i, j) {
    const temp = this.indexes[j];
    this.indexes[j] = this.indexes[i];
    this.indexes[i] = temp;
    this.reverse[this.indexes[i]] = i;
    this.reverse[this.indexes[j]] = j;
  }
}

module.exports = IndexMinHeap;
