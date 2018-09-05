package weightedgraph

import (
	"fmt"
	"testing"
)

var testGraph1 = []([3]float32){
	[3]float32{8, 16, 0},
	[3]float32{4, 5, 0.35},
	[3]float32{4, 7, 0.37},
	[3]float32{5, 7, 0.28},
	[3]float32{0, 7, 0.16},
	[3]float32{1, 5, 0.32},
	[3]float32{0, 4, 0.38},
	[3]float32{2, 3, 0.17},
	[3]float32{1, 7, 0.19},
	[3]float32{0, 2, 0.26},
	[3]float32{1, 2, 0.36},
	[3]float32{1, 3, 0.29},
	[3]float32{2, 7, 0.34},
	[3]float32{6, 2, 0.40},
	[3]float32{3, 6, 0.52},
	[3]float32{6, 0, 0.58},
	[3]float32{6, 4, 0.93},
}

func TestDenseGraph(t *testing.T) {
	graph := NewDenseGraph(int(testGraph1[0][0]), false)
	for i := 1; i < len(testGraph1); i++ {
		graph.AddEdge(int(testGraph1[i][0]), int(testGraph1[i][1]), testGraph1[i][2])
	}

	fmt.Println(graph)
	// component := NewComponent(graph)
	// count := component.Count()
	// if count != 3 {
	// 	t.Errorf("Wrong component count, expected 3, but got %d", count)
	// }
}

// func TestSparseGraph(t *testing.T) {
// 	graph := NewSparseGraph(testGraph2[0][0], false)
// 	for i := 1; i < len(testGraph2); i++ {
// 		graph.AddEdge(testGraph2[i][0], testGraph2[i][1])
// 	}

// 	component := NewComponent(graph)
// 	count := component.Count()
// 	if count != 1 {
// 		t.Errorf("Wrong component count, expected 1, but got %d", count)
// 	}
// }

func TestLazyPrim(t *testing.T) {
	graph := NewSparseGraph(int(testGraph1[0][0]), false)
	for i := 1; i < len(testGraph1); i++ {
		graph.AddEdge(int(testGraph1[i][0]), int(testGraph1[i][1]), testGraph1[i][2])
	}

	lazyPrim := NewLazyPrim(graph)
	fmt.Println(lazyPrim.Result())
	edges := lazyPrim.MSTEdges()
	for i := 0; i < len(edges); i++ {
		fmt.Println(edges[i])
	}
}