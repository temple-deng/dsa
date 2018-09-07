const Edge = require('./edge');

class DenseGraph {
  /**
   * 创建一个以邻接矩阵为底层实现的稠密图
   * @param {int} v 节点数
   * @param {bool} directed 是否是有向图
   */
  constructor(v, directed) {
    this.v = v;
    this.directed = directed;
    this.e = 0;
    this.g = Array(v);
    for (let i = 0; i < v; i++) {
      this.g[i] = Array(v);
      for (let j = 0; j < v; j++) {
        this.g[i][j] = null;
      }
    }
  }

  // 返回图的节点数
  V() {
    return this.v;
  }

  // 返回图的边数
  E() {
    return this.e;
  }

  /**
   * 节点 v 到节点 w 是否有一条边
   * @param {int} v
   * @param {int} w
   * @returns {boolean}
   */
  HasEdge(v, w) {
    if (v < 0 || v >= this.v || w < 0 || w >= this.v) {
      return false;
    }

    return this.g[v][w] !== null;
  }

  /**
   * 向图中添加一条节点 v 到节点 w，权重为 weight 的边
   * @param {int} v 起始节点
   * @param {int} w 终止节点
   * @param {float} weight 边的权重
   */
  AddEdge(v, w, weight) {
    if (v < 0 || v >= this.v || w < 0 || w >= this.w) {
      throw new Error("Invalid vertex");
    }

    if (this.HasEdge(v, w)) {
      return;
    }

    this.e++;

    this.g[v][w] = new Edge(v, w, weight);

    if (!this.directed && v !== w) {
      this.g[w][v] = new Edge(w, v, weight);
    }
  }

  /**
   * 返回节点 v 的所有邻接边
   * @param {int} v
   * @returns {Array<Edge>} 节点的所有相邻边
   */
  Adj(v) {
    if (v < 0 || v >= this.v) {
      throw new Error("Invalid vertex");
    }

    const result = [];
    for(let i = 0; i < this.g[v].length; i++) {
      if (this.g[v][i] !== null) {
        const edge = this.g[v][i];
        result.push(new Edge(edge.V(), edge.W(), edge.Weight()));
      }
    }

    return result;
  }

  toString() {
    let str = "Dense Graph - Adjacency Matrix";
    for (let i = 0; i < this.v; i++) {
      str += `\nVertex: ${i}  `;
      for (let j = 0; j < this.v; j++) {
        if (this.g[i][j] !== null) {
          str += `  ${this.g[i][j].Weight()}`
        } else {
          str += "  NULL"
        }
      }
    }
    return str;
  }
}

module.exports = DenseGraph;
