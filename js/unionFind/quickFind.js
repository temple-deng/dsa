class QuickFind {
  constructor(size) {
    this.data = Array(size);

    for (let i = 0; i < size; i++) {
      this.data[i] = i;
    }
  }

  unionElements(index1, index2) {
    if (index1 < 0 || index2 < 0 || index1 >= this.data.length || index2 >= this.data.length) {
      throw new Error("Index out of range");
    }

    if (this.isConnected(index1, index2)) {
      return;
    }

    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i] === this.data[index2]) {
        this.data[i] = this.data[index1];
      }
    }
  }

  isConnected(index1, index2) {
    if (index1 < 0 || index2 < 0 || index1 >= this.data.length || index2 >= this.data.length) {
      return false;
    }
    return this.data[index1] === this.data[index2];
  }
}

module.exports = QuickFind;
