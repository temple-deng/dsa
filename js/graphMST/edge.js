class Edge {
  constructor(v, w, weight) {
    this.v = v;
    this.w = w;
    this.weight = weight;
  }

  V() {
    return this.v;
  }

  W() {
    return this.w;
  }

  Weight() {
    return this.weight;
  }

  Other(v) {
    if (v == this.v) {
      return this.w;
    }
    
    return this.w;
  }

  toString() {
    return `${this.v} -> ${this.w} : ${this.weight}`;
  }

  // 用来进行比较的，但是感觉还是下面的
  valueOf() {
    return this.weight;
  }

  // CompareTo(other) {
  //   if (this.weight < other.Weight()) {
  //     return -1;
  //   } else if (this.weight > other.Weight()) {
  //     return 1;
  //   } else {
  //     return 0;
  //   }
  // }
}

module.exports = Edge;
