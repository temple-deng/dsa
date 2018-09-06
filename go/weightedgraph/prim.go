package weightedgraph

import (
	// "fmt"
	"log"
)

type Prim struct {
	graph Graph
	indexHeap *IndexMinHeap
	edgeTo []*Edge
	marked []bool
	mst []*Edge
	mstWeight float32
}

func NewPrim(graph Graph) *Prim {
	prim := &Prim{}
	prim.graph = graph
	// 节点个数
	vCount := graph.V()
	prim.indexHeap = NewIndexMinHeap(vCount)
	prim.edgeTo = make([]*Edge, vCount)
	prim.marked = make([]bool, vCount)
	prim.mst = []*Edge{}
	
	prim.visit(0)
	prim.prim()
	return prim
}

func (this *Prim) prim() {
	for ; !this.indexHeap.IsEmpty(); {
		minEdgeIndex, err := this.indexHeap.ExtractMinIndex()
		if err != nil {
			log.Fatal(err)
		}

		this.mst = append(this.mst, this.edgeTo[minEdgeIndex])
		this.visit(minEdgeIndex)
	}

	for i := 0; i < len(this.mst); i++ {
		this.mstWeight += this.mst[i].Weight()
	}
}

func (this *Prim) visit(v int) {
	if this.marked[v] {
		return
	}

	this.marked[v] = true
	vertexs, err := this.graph.Vertexs(v)
	if err != nil {
		log.Fatal(err)
	}

	for i := 0; i < len(vertexs); i++ {
		other, err := vertexs[i].Other(v)
		if err != nil {
			log.Fatal(err)
		}
		if !this.marked[other] {
			// 到该顶点的横切边还没有发现，添加到堆中
			if this.edgeTo[other] == nil {
				this.edgeTo[other] = &vertexs[i]
				this.indexHeap.Insert(v, &vertexs[i])

			} else if this.edgeTo[other].Weight() < vertexs[i].Weight() {
				// 当前堆中有一条到该顶点的横切边，但是堆中横切边的权值就已经比现在发现的
				// 这条边的权值低，因此改边不予入堆
				continue
			} else {
				// 当前堆中有一条到该顶点的横切边，但是堆中横切边的权值比现在发现的
				// 这条边的权值高，因此对堆中的横切边进行修改
				this.edgeTo[other] = &vertexs[i]
				this.indexHeap.Change(other, &vertexs[i])
			}
		}
	}
	// fmt.Println(this.indexHeap.GetSize())
}

func (this *Prim) MSTEdges() []*Edge {
	return this.mst
}

func (this *Prim) Result() float32 {
	return this.mstWeight
}