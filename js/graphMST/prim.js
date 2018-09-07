const IPQ = require('./indexMinHeap');

/**
 * Prim 算法的思想是，索引堆中只维持一个当前发现的到各个节点的最小横切边
 * 如果在切分的过程中，发现了一条新的更小的横切边，就需要修改堆中的横切边
 */
class Prim {
  constructor(graph) {    
    this.graph = graph;
    this.marked = Array(graph.V());
    this.mst = [];
    this.edgeTo = Array(graph.V());
    this.mstWeight = 0;

    this.heap = new IPQ(this.graph.V())

    for (let i = 0; i < this.marked.length; i++) {
      this.marked[i] = false;
      this.edgeTo[i] = null;
    }

    this.prim();
  }
  
  prim() {
    this.visit(0);
    while(!this.heap.IsEmpty()) {
      const index = this.heap.ExtractMinIndex();
      const edge = this.edgeTo[index]
      this.mst.push(edge);
      this.mstWeight += edge.Weight();
      this.visit(index);  
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
        if (this.edgeTo[w] === null) {
          this.edgeTo[w] = adjs[i];
          this.heap.Insert(w, adjs[i])
        } else if(this.edgeTo[w].Weight() > adjs[i].Weight()) {
          this.edgeTo[w] = adjs[i];
          this.heap.Change(w, adjs[i]);
        }
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

module.exports = Prim;
