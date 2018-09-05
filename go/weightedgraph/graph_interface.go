package weightedgraph

type Graph interface {
	V() int
	E() int
	HasEdge(int, int) bool
	AddEdge(int, int, float32) error
	Vertexs(int) ([]Edge, error)
}