package weightedgraph

import (
	// "fmt"
)

type LazyPrimMST struct {
	graph Graph
	heap *MinHeap
	marked []bool
	mst []Edge
	mstWeight float32
}


func NewLazyPrim(graph Graph) *LazyPrimMST {
	mst := &LazyPrimMST{graph: graph,}
	heap, _ := NewMinHeap(graph.E())
	mst.heap = heap
	mst.marked = make([]bool, graph.V())
	mst.mst = []Edge{}

	// Lazy Prim
	mst.lazyPrim()
	return mst
}


func (this *LazyPrimMST) lazyPrim() {
	// 任选一个节点开始我们的切分过程
	this.visit(0)

	for ; !this.heap.IsEmpty(); {
		edge, _ := this.heap.RemoveMin()

		// 如果当前这条权值最小的边已经不再是一条横切边了
		if this.marked[edge.V()] == this.marked[edge.W()] {
			continue
		}
		this.mst = append(this.mst, edge)
		if this.marked[edge.V()] {
			this.visit(edge.W())
		} else {
			this.visit(edge.V())
		}
	}

	for i:=0; i < len(this.mst); i++ {
		this.mstWeight += this.mst[i].Weight()
	}
}

func (this *LazyPrimMST) visit(v int) {
	if this.marked[v] {
		return
	}

	this.marked[v] = true
	vertexs, _ := this.graph.Vertexs(v)

	for i := 0; i < len(vertexs); i++ {
		vertex := vertexs[i]
		// this.marked[other] == false 说明这条边是一条横切边，入堆
		if other, _ := vertex.Other(v);!this.marked[other] {
			this.heap.Add(vertex)
		}
	}
	// fmt.Println(this.heap.GetSize())
}

func (this *LazyPrimMST) MSTEdges() []Edge {
	return this.mst
}

func (this *LazyPrimMST) Result() float32 {
	return this.mstWeight
}