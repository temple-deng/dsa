package weightedgraph

import (
	"errors"
)

type Edge struct {
	v int
	w int
	weight float32

}

func NewEdge(v, w int, weight float32) *Edge {
	return &Edge{v, w, weight}
}

func (this *Edge) V() int {
	return this.v
}

func (this *Edge) W() int {
	return this.w
}

func (this *Edge) Weight() float32 {
	return this.weight
}

func (this *Edge) Other(x int) (int, error) {
	if x == this.v {
		return this.w, nil
	}

	if x == this.w {
		return this.v, nil
	}

	return -1, errors.New("Invalid Vertex")
}