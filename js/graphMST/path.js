class Path {
  constructor(graph, s) {
    const vCount = graph.V();
    this.graph = graph;
    this.s = s;
    this.visited = Array(vCount);
    this.from = Array(vCount);

    for (let i = 0; i < vCount; i++) {
      this.visited[i] = false;
      this.from[i] = -1;
    }

    this.dfs(s);
  }

  dfs(v) {
    this.visited[v] = true;
    adjs = this.graph.Adj(v);
    for (let i = 0; i < adjs.length; i++) {
      const w = adjs[i].Other(v);
      if (!this.visited[w]) {
        this.from[w] = v;
        this.dfs(w);
      }
    }
  }

  HasPath(v) {
    if (v < 0 || v >= this.graph.V()) {
      return false;
    }
    return this.visited[v];
  }

  Path(v) {
    if (!this.HasPath(v)) {
      return false;
    }

    const resutl = [];
    let s = v;
    while(s !== -1) {
      result.unshift(s);
      s = this.from[s];
    }
    return result;
  }
}

module.exports = Path;
