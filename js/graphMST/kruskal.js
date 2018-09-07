const UnionFind = require('../unionFind/optimizeBaseRank');
const MinHeap = require('./minHeap');

class Kruskal {
  constructor(graph) {
    this.graph = graph;
    this.mst = [];
    this.mstWeight = 0;
    this.uf = new UnionFind(graph.V());

    this.kruskal();
  }
  
  kruskal() {
    const heap = new MinHeap(this.graph.E());

    // 构建最小堆，为堆排序做准备
    for (let i = 0; i < this.graph.V(); i++) {
      const adjs = this.graph.Adj(i);
      for (let j = 0; j < adjs.length; j++) {
        if (adjs[j].V() < adjs[j].W()) {
          heap.Insert(adjs[j]);
        }
      }
    }

    while(!heap.IsEmpty()) {
      // 已经构造好一根最小生成树了，可以提前返回
      if (this.mst.length === this.graph.V() - 1) {
        break;
      }

      const minEdge = heap.ExtractMin();
      if (!this.uf.IsConnected(minEdge.V(), minEdge.W())) {
        this.mst.push(minEdge);
        this.mstWeight += minEdge.Weight();
        this.uf.UnionElements(minEdge.V(), minEdge.W());
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

module.exports = Kruskal;
