package weightedgraph

import (
	"testing"
)

var testGraph1 = []([2]int){
	[2]int{13, 13},
	[2]int{0 ,5},
	[2]int{4, 3},
	[2]int{0, 1},
	[2]int{9, 12},
	[2]int{6, 4},
	[2]int{5, 4},
	[2]int{0, 2},
	[2]int{11, 12},
	[2]int{9, 10},
	[2]int{0, 6},
	[2]int{7, 8},
	[2]int{9, 11},
	[2]int{5, 3},
}

var testGraph2 = []([2]int) {
	[2]int{6, 8},
	[2]int{0, 1},
	[2]int{0, 2},
	[2]int{0, 5},
	[2]int{1, 2},
	[2]int{1, 3},
	[2]int{1, 4},
	[2]int{3, 4},
	[2]int{3, 5},
}

func TestDenseGraph(t *testing.T) {
	graph := NewDenseGraph(testGraph1[0][0], false)
	for i := 1; i < len(testGraph1); i++ {
		graph.AddEdge(testGraph1[i][0], testGraph1[i][1])
	}

	component := NewComponent(graph)
	count := component.Count()
	if count != 3 {
		t.Errorf("Wrong component count, expected 3, but got %d", count)
	}
}

func TestSparseGraph(t *testing.T) {
	graph := NewSparseGraph(testGraph2[0][0], false)
	for i := 1; i < len(testGraph2); i++ {
		graph.AddEdge(testGraph2[i][0], testGraph2[i][1])
	}

	component := NewComponent(graph)
	count := component.Count()
	if count != 1 {
		t.Errorf("Wrong component count, expected 1, but got %d", count)
	}
}