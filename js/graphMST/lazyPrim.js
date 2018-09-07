const PQ = require('./minHeap');

class LazyPrim {
  constructor(graph) {    
    this.graph = graph;
    this.marked = Array(graph.V());
    this.mst = [];
    this.mstWeight = 0;
    this.heap = new PQ(this.graph.E())

    for (let i = 0; i < this.marked.length; i++) {
      this.marked[i] = false;
    }

    this.lazyPrim();
  }
  
  lazyPrim() {
    this.visit(0);
    while(!this.heap.IsEmpty()) {
      const edge = this.heap.ExtractMin();
      if (this.marked[edge.V()] === this.marked[edge.W()]) {
        continue;
      }
      this.mst.push(edge);
      this.mstWeight += edge.Weight();
      if (this.marked[edge.V()]) {
        this.visit(edge.W());
      } else {
        this.visit(edge.V());
      }
    }
  }

  visit(v) {
    if (this.marked[v]) {
      return;
    }

    this.marked[v] = true;
    const adjs = this.graph.Adj(v);
    for (let i = 0; i < adjs.length; i++) {
      const w = adjs[i].Other(v);
      if (!this.marked[w]) {
        this.heap.Insert(adjs[i]);
      }
    }
  }

  MSTEdges() {
    return this.mst;
  }

  Result() {
    return this.mstWeight;
  }
}

module.exports = LazyPrim;
