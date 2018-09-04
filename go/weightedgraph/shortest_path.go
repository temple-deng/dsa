package weightedgraph

import (
	"fmt"
	"../queue"
)

// 基于广度优先遍历的一个关于图中一个点到相邻节点路径的一个结构
// 广度优先遍历可以得出 **无权图** 的最短路径
type ShortestPath struct {
	graph Graph
	s int
	visited []bool
	from []int
	ord  []int
}

func NewShortestPath(graph Graph, s int) *ShortestPath {
	path := &ShortestPath{}
	path.graph = graph
	path.visited = make([]bool, graph.V())
	path.from = make([]int, graph.V())
	path.ord = make([]int, graph.V())
	path.s = s

	for i := 0; i < len(path.from); i++ {
		path.from[i] = -1
		path.ord[i] = -1
	}

	// 寻路算法
	q := queue.New()
	q.Enqueue(s)
	path.visited[s] = true
	path.ord[s] = 0

	// 广度优先遍历
	for ; q.IsEmpty() != false; {
		cur, _ := q.Dequeue()
		val := cur.(int)
		vertexs, _ := path.graph.Vertexs(val)
		for i := 0; i < len(vertexs); i++ {
			w := vertexs[i]
			if !path.visited[w] {
				q.Enqueue(w)
				path.visited[w] = true
				path.from[w] = val
				path.ord[w] = path.ord[val] + 1
			}
		}
	}
	return path
}

// 从源 s 到 w 是否有一条路径
func (this *ShortestPath) HasPath(w int) bool {
	if w < 0 || w >= this.graph.V() {
		return false
	}

	return this.visited[w]
}

func (this *ShortestPath) Path(w int) []int {
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

func (this *ShortestPath) Length(w int) int {
	if this.HasPath(w) {
		return this.ord[w]
	}
	return -1
}

func (this *ShortestPath) ShowPath(w int) {
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