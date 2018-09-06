package weightedgraph

type Dijkstra struct {
	graph Graph
	s int
	distTo []float32
	marked []bool
	from []*Edge
}

func NewDijkstra(graph Graph, s int) *Dijkstra {
	dj := &Dijkstra{}
	dj.s = s
	dj.graph = graph
	dj.marked = make([]bool, graph.V())
	dj.distTo = make([]float32, graph.V())

	ipq := NewIndexMinHeap(graph.V())
}