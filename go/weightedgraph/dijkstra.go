package weightedgraph

import (
	"log"
	"errors"
)

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

	ipq := NewIndexMinHeapF(graph.V())

	dj.marked[s] = true
	ipq.Insert(s, dj.distTo[s])

	for ; !ipq.IsEmpty(); {
		v, err := ipq.ExtractMinIndex()
		if err != nil {
			log.Fatal(err)
		}

		dj.marked[v] = true
		vertexs, err := graph.Vertexs(v)
		if err != nil {
			log.Fatal(err)
		}

		for i := 0; i < len(vertexs); i++ {
			other, err := vertexs[i].Other(v)
			if err != nil {
				log.Fatal(err)
			}

			if !dj.marked[other] {
				if dj.from[other] == nil || dj.distTo[v] + vertexs[i].Weight() < dj.distTo[other] {
					dj.distTo[other] = dj.distTo[v] + vertexs[i].Weight()
					dj.from[other] = &vertexs[i]
					if ipq.contains(other) {
						ipq.Change(other, dj.distTo[other])
					} else {
						ipq.Insert(other, dj.distTo[other])
					}
				}
			} 
		}
	}

	return dj
}


func (this *Dijkstra) ShortestPathTo(w int) (float32, error) {
	if !this.HasPathTo(w) {
		return 0, errors.New("Unreachable vertex")
	}

	return this.distTo[w], nil
}

func (this *Dijkstra) HasPathTo(w int) bool {
	if w < 0 || w >= this.graph.V() {
		return false
	}

	return this.marked[w]
}
