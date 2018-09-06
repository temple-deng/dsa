package weightedgraph

import (
	"log"
	"../unionfind"
)

type Kruskal struct {
	graph Graph
	uf *unionfind.UnionFind4
	mst []Edge
	sortedEdges []Edge
	mstWeight float32
}

func NewKruskal(graph Graph) *Kruskal {
	mst := &Kruskal{}
	mst.uf = unionfind.NewRankUnionFind(graph.V())
	mst.mst = []Edge{}
	mst.graph = graph
	mst.kruskal()
	return mst
}


func (this *Kruskal) kruskal() {
	pq, err := NewMinHeap(this.graph.E())
	if err != nil {
		log.Fatal(err)
	}

	// 所有边入堆，为后面的堆排序做准备
	for i := 0; i < this.graph.V(); i++ {
		vertexs, err := this.graph.Vertexs(i)
		if err != nil {
			log.Fatal(err)
		}

		for j := 0; j < len(vertexs); j++ {
			if vertexs[j].V() < vertexs[j].W() {
				pq.Add(vertexs[j])
			}
		}
	}

	// 对所有边进行堆排序

	this.sortedEdges = make([]Edge, pq.GetSize())
	for i := 0; i < len(this.sortedEdges); i++ {
		min, err := pq.RemoveMin()
		if err != nil {
			log.Fatal(err)
		}
		this.sortedEdges[i] = min
	}

	for i := 0; i < len(this.sortedEdges); i++ {
		// 已经找够边了，不需要再继续下去了
		if len(this.mst) == this.graph.V() - 1 {
			break
		}

		edge := this.sortedEdges[i]
		if !this.uf.IsConnected(edge.V(), edge.W()) {
			this.mst = append(this.mst, edge)
			this.uf.UnionElements(edge.V(), edge.W())
		}
	}

	for i := 0; i < len(this.mst); i++ {
		this.mstWeight += this.mst[i].Weight()
	}
}

func (this *Kruskal) MSTEdges() []Edge {
	return this.mst
}

func (this *Kruskal) Result() float32 {
	return this.mstWeight
}