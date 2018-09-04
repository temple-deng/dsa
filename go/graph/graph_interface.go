package graph

type Graph interface {
	V() int
	E() int
	HasEdge(int, int) bool
	AddEdge(int, int) error
	Vertexs(int) ([]int, error)
}