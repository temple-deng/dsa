const IPQ = require('./indexMinHeap');

class Dijkstra {
  constructor(graph, s) {
    this.graph = graph;
    this.s = s;
    this.distTo = Array(graph.V());
    this.marked = Array(graph.V());
    this.from = Array(graph.V());

    for (let i = 0; i < graph.V(); i++) {
      this.distTo[i] = 0;
      this.marked[i] = false;
      this.from[i] = null;
    }

    const ipq = new IPQ(graph.V());
    ipq.Insert(s, this.distTo[s]);

    while(!ipq.IsEmpty()) {
      const minIndex = ipq.ExtractMinIndex();
      this.marked[minIndex] = true;

      const adjs = this.graph.Adj(minIndex)

      for (let i = 0; i < adjs.length; i++) {
        const w = adjs[i].Other(minIndex);
        if (!this.marked[w]) {
          if (this.from[w] === null || this.distTo[w] > this.distTo[minIndex] + adjs[i].Weight()) {
            this.from[w] = adjs[i];
            this.distTo[w] = this.distTo[minIndex] + adjs[i].Weight();

            if (ipq.Contains(w)) {
              ipq.Change(w, this.distTo[w]);
            } else {
              ipq.Insert(w, this.distTo[w]);
            }
          }
        }
      }
    }
  }
}

module.exports = Dijkstra;
