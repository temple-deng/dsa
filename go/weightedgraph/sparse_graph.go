package weightedgraph

import (
	"errors"
)

// 稀疏图 —— 邻接表

type SparseGraph struct {
	n    int
	m    int
	directed bool
	g    []([]int)
}

func NewSparseGraph(n int, directed bool) *SparseGraph {
	graph := &SparseGraph{n: n, m: 0, directed: directed,}
	vectors := make([]([]int), n)

	for i := 0; i < n; i++ {
		vectors[i] = []int{}
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

//
func (this *SparseGraph) HasEdge(v, w int) bool {
	if v < 0 || v > this.n || w < 0 || w > this.n {
		return false
	}

	for i := 0; i < len(this.g[v]); i++ {
		if this.g[v][i] == w {
			return true
		}
	}

	return false
}

// 添加一条 v -> w 的边
func (this *SparseGraph) AddEdge(v, w int) error {
	if v < 0 || v > this.n {
		return errors.New("V out of range")
	}

	if w < 0 || w > this.n {
		return errors.New("W out of range")
	}

	if this.HasEdge(v, w) {
		return nil
	}

	this.g[v] = append(this.g[v], w)

	if v != w && !this.directed {
		this.g[w] = append(this.g[w], v)
	}

	this.m++
	return nil
}

// 返回所有与 v 相邻的点
func (this *SparseGraph) Vertexs(v int) ([]int, error) {
	if v < 0 || v > this.n {
		return nil, errors.New("V out of range")
	}

	slice := make([]int, len(this.g[v]))
	copy(slice, this.g[v])
	return slice, nil
}