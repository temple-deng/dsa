package weightedgraph

import (
	"fmt"
	"errors"
)

// 稠密图 —— 用邻接矩阵

type DenseGraph struct {
	n        int			// 顶点数
	m   		 int			// 边数
	directed bool     // 是否有向
	g        []([]*Edge)   // 邻接矩阵
}

func NewDenseGraph(n int, directed bool) *DenseGraph {
	graph := &DenseGraph{n: n, m: 0, directed: directed,}
	vertors := make([]([]*Edge), n)

	for i := 0; i < n; i++ {
		vertors[i] = make([]*Edge, n)
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

func (this *DenseGraph) AddEdge(v, w int, weight float32) error {
	if v < 0 || v >= this.n {
		return errors.New("source vertex invalid")
	}

	if w < 0 || w >= this.n {
		return errors.New("dest vertex invalid")
	}

	// 这里其实不用管重复边的问题了，如果有重复的边就直接替换掉，不过要处理一下 m 的问题
	if !this.HasEdge(v, w) {
		this.m++
	}

	this.g[v][w] = NewEdge(v, w, weight)
	if !this.directed {
		this.g[w][v] = NewEdge(v, w, weight)
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

	return this.g[v][w] != nil
}

// 返回所有与 v 相邻的点
func (this *DenseGraph) Vertexs(v int) ([]Edge, error) {
	if v < 0 || v > this.n {
		return nil, errors.New("Invalid vertex")
	}

	slice := []Edge{}
	for i := 0; i < this.n; i++ {
		if this.g[v][i] != nil {
			slice = append(slice, *this.g[v][i])
		}
	}
	return slice, nil
}

func (this *DenseGraph) String() string {
	str := "Adjance Martix"

	for i := 0; i < this.n; i++ {
		str += fmt.Sprintf("\n%d Vertexs:", i)
		for j := 0; j < this.n; j++ {
			if this.g[i][j] == nil {
				str += "  NULL"
			} else {
				str += fmt.Sprintf("  %.2f", this.g[i][j].weight)
			}
		}
	}
	return str
}