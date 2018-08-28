class QuickUnion {
  constructor(data) {
    this.data = Array(data.length);
    for (let i = 0; i < data.length; i++) {
      this.data[i] = i;
    }
  }

  unionElements(index1, index2) {
    let par1 = this.find(index1);
    let par2 = this.find(index2);
    if (par1 === -1 || par2 === -1) {
      throw new Error("Index illegal");
    }

    if (par1 === par2) {
      return;
    }

    this.data[par1] = par2;
  }

  find(index) {
    if (index < 0 || index >= this.data.length) {
      return -1;
    }
    
    for (; this.data[index] !== index; index = this.data[index]) {}
    return index;
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

module.exports = QuickUnion;
