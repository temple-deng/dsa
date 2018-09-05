package weightedgraph

import (
	"errors"
)

// 稀疏图 —— 邻接表

type SparseGraph struct {
	n    int
	m    int
	directed bool
	g    []([]*Edge)
}

func NewSparseGraph(n int, directed bool) *SparseGraph {
	graph := &SparseGraph{n: n, m: 0, directed: directed,}
	vectors := make([]([]*Edge), n)

	for i := 0; i < n; i++ {
		vectors[i] = []*Edge{}
	}

	graph.g = vectors
	return graph
}

// 顶点数
func (this *SparseGraph) V() int {
	return this.n
}

// 边数
func (this *SparseGraph) E() int {
	return this.m
}

// 这里的边就是从 v 指向 w 的一条边
func (this *SparseGraph) HasEdge(v, w int) bool {
	if v < 0 || v > this.n || w < 0 || w > this.n {
		return false
	}

	// 有向图的情况下，检查 v 的邻接表里是否有 w
	for i := 0; i < len(this.g[v]); i++ {
		other, _ := this.g[v][i].Other(v)
		if other == w {
			return true
		}
	}

	return false
}

// 添加一条 v -> w 的边
func (this *SparseGraph) AddEdge(v, w int, weight float32) error {
	if v < 0 || v > this.n {
		return errors.New("First vertex invalid")
	}

	if w < 0 || w > this.n {
		return errors.New("Last vertex invalid")
	}

	// 注意这里我们的邻接表是允许重边，也就是平行边的存在的
	// 因此这里就不用判断是不是有边已经存在了
	this.g[v] = append(this.g[v], NewEdge(v, w, weight))
	if v != w && !this.directed {
		this.g[w] = append(this.g[w], NewEdge(w, v, weight))
	}
	this.m++
	return nil
}

// 返回所有与 v 相邻的点
func (this *SparseGraph) Vertexs(v int) ([]Edge, error) {
	if v < 0 || v > this.n {
		return nil, errors.New("V out of range")
	}

	slice := make([]Edge, len(this.g[v]))
	
	for i := 0; i < len(slice); i++ {
		slice[i] = *this.g[v][i]
	}

	return slice, nil
}