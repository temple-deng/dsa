class OptimizedBaseRank {
  constructor(size) {
    this.data = Array(size);
    this.rank = Array(size);
    for (let i = 0; i < size; i++) {
      this.data[i] = i;
      this.rank[i] = 1;
    }
  }

  find(index) {
    if (index < 0 || index >= this.data.length) {
      return -1;
    }

    for (; index !== this.data[index]; index = this.data[index]) {}

    return index;
  }

  UnionElements(index1, index2) {
    let par1 = this.find(index1);
    let par2 = this.find(index2);
    if (par1 === -1 || par2 === -1) {
      throw new Error("Index illegal");
    }

    if (par1 === par2) {
      return;
    }

    let rank1 = this.rank[par1];
    let rank2 = this.rank[par2];
    if (rank1 < rank2) {
      this.data[par1] = par2;
    } else if (rank1 > rank2) {
      this.data[par2] = par1;
    } else {
      this.data[par1] = par2;
      this.rank[par2]++;
    }
  }

  IsConnected(index1, index2) {
    let par1 = this.find(index1);
    let par2 = this.find(index2);
    if (par1 === -1 || par2 === -1) {
      return false;
    }

    return par1 === par2;
  }
}

module.exports = OptimizedBaseRank;