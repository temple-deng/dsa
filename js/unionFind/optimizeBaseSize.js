class OptimizedBaseSize {
  constructor(size) {
    this.data = Array(size);
    this.size = Array(size);

    for (let i = 0; i < size; i++) {
      this.data[i] = i;
      this.size[i] = 1;
    }
  }

  find(index) {
    if (index < 0 || index >= this.data.length) {
      return -1;
    }

    for (; index !== this.data[index]; index = this.data[index]) {}

    return index;
  }

  unionElements(index1, index2) {
    let par1 = this.find(index1);
    let par2 = this.find(index2);
    if (par1 === -1 || par2 === -2) {
      throw new Error("Index illegal");
    }

    if (par1 === par2) {
      return;
    }

    let size1 = this.size[par1];
    let size2 = this.size[par2];
    if (size1 <= size2) {
      this.data[par1] = par2;
      this.size[par2] = size2 + size1;
    } else {
      this.data[par2] = par1;
      this.size[par1] = size2 + size1;
    }
  }

  isConnected(index1, index2) {
    let par1 = this.find(index1);
    let par2 = this.find(index2);
    if (par1 === -1 || par2 === -1) {
      return false;
    }

    return par1 === par2;
  }
}