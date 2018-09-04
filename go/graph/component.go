package graph

// 图的连通分量
type Component struct {
	graph Graph
	visited []bool
	// 连通分量
	ccount int
	// 并查集
	id []int
}

func NewComponent(graph Graph) *Component {
	comp := &Component{}
	visited := make([]bool, graph.V())
	comp.graph = graph
	comp.visited = visited
	comp.ccount = 0
	comp.id = make([]int, graph.V())

	for i := 0; i < len(comp.id); i++ {
		comp.id[i] = -1
	}

	for i := 0; i < graph.V(); i++ {
		if !comp.visited[i] {
			comp.dfs(i);
			comp.ccount++;
		}
	}


	return comp
}

// 深度优先遍历
func (this *Component) dfs(v int) {
	this.visited[v] = true
	this.id[v] = this.ccount
	vertexs, _ := this.graph.Vertexs(v)
	for i := 0; i < len(vertexs); i++ {
		if !this.visited[vertexs[i]] {
			this.dfs(vertexs[i])
		}
	}
}

func (this *Component) Count() int {
	return this.ccount
}

func (this *Component) IsConnected(v, w int) bool {
	if v < 0 || v >= len(this.id) || w < 0 || w >= len(this.id) {
		return false
	}
	return this.id[v] == this.id[w]
}