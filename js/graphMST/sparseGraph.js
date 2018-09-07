const Edge = require('./edge');

class SparseGraph {
  /**
   * 创建一个以邻接表为底层实现的稀疏图
   * @param {int} v 图的顶点个数
   * @param {bool} directed 是否有向
   */
  constructor(v, directed) {
    this.v = v;
    this.e = 0;
    this.directed = directed;
    this.g = Array(v);

    for (let i = 0; i < v; i++) {
      this.g[i] = [];
    }
  }

  // 返回图顶点数
  V() {
    return this.v;
  }

  // 返回图的边数
  E() {
    return this.e;
  }

  HasEdge(v, w) {
    if (v < 0 || w < 0 || v >= this.v || w >= this.v) {
      return false;
    }

    for (let i = 0; i < this.g[v].length; i++) {
      if (this.g[v][i].Other(v) === w) {
        return true;
      }
    }

    return false;
  }

  AddEdge(v, w, weight) {
    if (v < 0 || w < 0 || v >= this.v || w >= this.v) {
      throw new Error("Invalid vertex");
    }

    this.g[v].push(new Edge(v, w, weight));
    
    if (v !== w &&!this.directed) {
      this.g[w].push(new Edge(w, v, weight));
    }
    this.e++;
  }

  Adj(v) {
    if (v < 0 || v >= this.v) {
      return [];
    }

    const result = [];
    for (let i = 0; i < this.g[v].length; i++) {
      const edge = this.g[v][i];
      result.push(new Edge(edge.V(), edge.W(), edge.Weight()));
    }
    return result;
  }

  toString() {
    let str = "Sparse Graph - Adjacency List";
    for (let i = 0; i < this.v; i++) {
      str += `\nVertex: ${i}`;
      for (let j = 0; j < this.g[i].length; j++) {
        str += "  " + this.g[i][j];
      }
    }
    return str;
  }
}

module.exports = SparseGraph;


