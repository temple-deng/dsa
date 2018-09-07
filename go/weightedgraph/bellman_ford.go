package weightedgraph

// import (
// 	"log"
// )

// type BellmanFord struct {
// 	graph Graph
// 	s int
// 	distTo []float32
// 	from []*Edge
// 	hasNegativeCycle bool
// }

// func NewBellmanFord(graph Graph, s int) *BellmanFord {
// 	bf := &BellmanFord{}
// 	bf.graph = graph
// 	bf.s = s
// 	bf.distTo = make([]float32, graph.V())
// 	bf.from = make([]*Edge, graph.V())

// 	for pass := 1; pass < graph.V(); pass++ {
// 		for i := 0; i < graph.V(); i++ {
// 			vertexs, err := graph.Vertexs(i)
// 			if err != nil {
// 				log.Fatal(err)
// 			}

// 			other, err := vertexs[i].Other(i)
// 			if err != nil {
// 				log.Fatal(err)
// 			}

// 			if bf.from[other] == nil || bf.distTo[i] + vertexs[i].Weight() < bf.distTo[other] {
// 				bf.from[other] = &vertexs[i]
// 				bf.distTo[other] = bf.distTo[i] + vertexs[i].Weight()
// 			}
// 		}
// 	}

// 	bf.hasNegativeCycle = bf.detectNegativeCycle()
// 	return bf
// }