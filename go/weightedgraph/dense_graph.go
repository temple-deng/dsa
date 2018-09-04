package weightedgraph

import (
	"errors"
)

// 稠密图 —— 用邻接矩阵

type DenseGraph struct {
	n        int			// 顶点数
	m   		 int			// 边数
	directed bool     // 是否有向
	g        []([]bool)   // 邻接矩阵
}

func NewDenseGraph(n int, directed bool) *DenseGraph {
	graph := &DenseGraph{n: n, m: 0, directed: directed,}
	vertors := make([]([]bool), n)

	for i := 0; i < n; i++ {
		vertors[i] = make([]bool, n)
	}

	graph.g = vertors
	return graph
}

// 返回图中顶点的数量
func (this *DenseGraph) V() int {
	return this.n
}

func (this *DenseGraph) E() int {
	return this.m
}

func (this *DenseGraph) AddEdge(v, w int) error {
	if v < 0 || v >= this.n {
		return errors.New("first index out of range")
	}

	if w < 0 || w >= this.n {
		return errors.New("last index out of range")
	}

	if !this.HasEdge(v, w) {
		this.g[v][w] = true

		if !this.directed {
			this.g[w][v] = true
		}
		this.m++
	}
	return nil
}

func (this *DenseGraph) HasEdge(v, w int) bool {
	if v < 0 || v >= this.n {
		return false
	}

	if w < 0 || w >= this.n {
		return false
	}

	return this.g[v][w]
}

// 返回所有与 v 相邻的点
func (this *DenseGraph) Vertexs(v int) ([]int, error) {
	if v < 0 || v > this.n {
		return nil, errors.New("V out of range")
	}

	slice := []int{}
	for i := 0; i < this.n; i++ {
		if this.g[v][i] {
			slice = append(slice, i)
		}
	}
	return slice, nil
}