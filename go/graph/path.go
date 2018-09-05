package graph

import (
	"fmt"
)

// 基于深度优先遍历的一个关于图中一个点到相邻节点路径的一个结构
type Path struct {
	graph Graph
	s int
	visited []bool
	from []int
}

func NewPath(graph Graph, s int) *Path {
	// 这里其实应该判断一下 s 的合法性的
	path := &Path{}
	path.graph = graph
	path.visited = make([]bool, graph.V())
	path.from = make([]int, graph.V())
	path.s = s

	for i := 0; i < len(path.from); i++ {
		path.from[i] = -1
	}

	// 寻路算法
	path.dfs(s)
	return path
}

// 深度优先遍历
func (this *Path) dfs(v int) {
	this.visited[v] = true
	vertexs, _ := this.graph.Vertexs(v)
	for i := 0; i < len(vertexs); i++ {
		if !this.visited[vertexs[i]] {
			this.from[vertexs[i]] = v
			this.dfs(vertexs[i])
		}
	}
}

// 从源 s 到 w 是否有一条路径
func (this *Path) HasPath(w int) bool {
	if w < 0 || w >= this.graph.V() {
		return false
	}

	return this.visited[w]
	// source := this.from[w]
	// for {
	// 	if source == this.s {
	// 		return true
	// 	}
	// 	if source == -1 {
	// 		return false
	// 	}
	// 	source = this.from[source]
	// }
}

func (this *Path) Path(w int) []int {
	if !this.HasPath(w) {
		return nil
	}

	path := []int{}
	for source := w; source != -1; source = this.from[source] {
		path = append(path, source)
	}
	reverse := make([]int, len(path))
	for i := 0; i < len(reverse); i++ {
		reverse[i] = path[len(path) - i -1]
	}
	return reverse
}

func (this *Path) ShowPath(w int) {
	path := this.Path(w)
	if path == nil {
		fmt.Println("Error")
	}

	for i := 0; i < len(path); i++ {
		fmt.Printf("%d", path[i])
		if i != len(path) - 1 {
			fmt.Print(" ---> ")
		}
	}
} 