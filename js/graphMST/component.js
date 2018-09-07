// 连通分量
class Component {
  constructor(graph) {
    const vCount = graph.V();
    this.graph = graph;
    this.visited = Array(vCount);
    this.ccount = 0;
    this.id = Array(vCount);

    for (let i = 0; i < vCount; i++) {
      this.visited[i] = false;
    }

    for (let i = 0; i < vCount; i++) {
      if (!this.visited[i]) {
        this.dfs(i);
        this.ccount++;
      }
    }
  }

  dfs(v) {
    this.visited[v] = true;
    this.id = this.ccount;
    adjs = this.graph.Adj(v);

    for (let i = 0; i < adjs.length; i++) {
      const w = adjs.Other(v);
      if (!this.visited[w]) {
        this.dfs(w);
      }
    }
  }

  /**
   * 顶点 v 和顶点 w 是否是连通的
   * @param {int} v
   * @param {int} w
   * @returns {bool}
   */
  IsConnected(v, w) {
    if (v < 0 || v >= this.graph.V() || w < 0 || w >= this.graph.V()) {
      return false;
    }

    return this.id[v] === this.id[w];
  }

  // 图的连通分量个数
  Count() {
    return this.count;
  }
}

module.exports = Component;
