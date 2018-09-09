const Edge = require('./edge');

class BellmanFord {
  constructor(graph, s) {
    this.graph = graph;
    this.s = s;
    const vCount = graph.V();
    this.distTo = Array(vCount);
    this.from = Array(vCount);
    for (let i = 0; i < vCount; i++) {
      this.distTo[i] = 0;
      this.from[i] = null;
    }

    this.from[s] = new Edge(s, s, 0);

    for (let round = 1; round < vCount; round++) {
      for (let i = 0; i < vCount; i++) {
        const adjs = this.graph.Adj(i);
        for (let j = 0; j < adjs.length; j++) {
          const w = adjs[j].Other(i);
          if (this.from[i] !== null && (this.from[w] === null || this.distTo[w] > this.distTo[i] + adjs[j].Weight())) {
            this.from[w] = adjs[j];
            this.distTo[w] = this.distTo[i] + adjs[j].Weight();
          }
        }
      }
    }

    this.hasNegativeCycle = this.detectNegativeCycle();
  }

  detectNegativeCycle() {
    for (let i = 0; i < this.graph.V(); i++) {
      const adjs = this.graph.Adj(i);
      for (let j = 0; j < adjs.length; j++) {
        const w = adjs[j].Other(i);
        if (this.from[i] !== null && this.distTo[w] > this.distTo[i] + adjs[j].Weight()) {
          return true;
        }
      }
    }
    return false;
  }

  NegativeCycle() {
    return this.hasNegativeCycle;  
  }

  HasPathTo(w) {
    if (w < 0 || w >= this.graph.V()) {
      return false;
    }

    return this.from[w] !== null;
  }

  ShortestPathTo(w) {
    if (!this.HasPathTo(w)) {
      throw new Error("Vertex unreachable");
    }

    if (this.hasNegativeCycle) {
      throw new Error("Has Cycle");
    }

    return this.distTo[w];
  }

  ShortestPath(w) {
    if (!this.HasPathTo(w)) {
      throw new Error("Vertex unreachable");
    }

    if (this.hasNegativeCycle) {
      throw new Error("Has Cycle");
    }

    const result = [];
    for (let e = this.from[w]; e.V() !== e.W(); e = this.from[e.V()]) {
      result.unshift(e);
    }
    return result;
  }

  ShowPath(w) {
    const paths = this.ShortestPath(w);
    let str = ""
    for (let i = 0; i < paths.length; i++) {
      str += `  ${paths[i].V()} -> ${paths[i].W()}`;
    }
    console.log(str);
  }
}

module.exports = BellmanFord;