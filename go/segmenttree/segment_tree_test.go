package segmenttree

import (
	"testing"
	"math"
)

type sumMerger struct {}

func (this *sumMerger) Merge(a int, b int) int {
	return a + b
}

type maxMerger struct {}

func (this *maxMerger) Merge(a int, b int) int {
	return int(math.Max(float64(a), float64(b)))
}

func TestSegmentTree(t *testing.T) {
	arr := []int{7, 8, 3, 10, -3, 9, 4, 2, 0}
	// 理论上是这样一颗线段树
	//  	       [0-8]
	//    	     /   \
	//      	[0-4]  [5-8]
	//      	/   \     /    \	
	//  	[0-2] [3-4] [5-6] [7-8]
	//     / \   / \   /  \   /  \
	// [0-1] [2][3][4][5] [6] [7] [8]
	// / \   3  10 -3 9   4   2    0
	// [0] [1]
	//  7   8
	var merger Merger
	merger = &sumMerger{}
	tree := New(arr, merger)

	size := tree.GetSize()
	if size != 9 {
		t.Errorf("Wrong size, expected 9, but got %d", size)
	}

	sum, err := tree.Query(0, 8)
	if err != nil {
		t.Error(err)
	}
	var sum1 int
	for i := 0; i < 9; i++ {
		sum1 += arr[i]
	}

	if sum != sum1 {
		t.Errorf("Wrong query result, expected %d, but got %d", sum1, sum)
	}

	elem, err := tree.Get(8)
	if err != nil {
		t.Error(err)
	}
	if elem != 0 {
		t.Errorf("Wrong get result, expected 0, but got %d", elem)
	}

	tree.Set(8, 50)
	elem, err = tree.Get(8)
	if err != nil {
		t.Error(err)
	}
	if elem != 50 {
		t.Errorf("Wrong get result, expected 50, but got %d", elem)
	}

	sum, err = tree.Query(0, 8)
	if err != nil {
		t.Error(err)
	}

	if sum != sum1 + 50 {
		t.Errorf("Wrong quert result, expect %d, but got %d", sum1+50, sum)
	}
}

func TestMaxMerger(t *testing.T) {
	arr := []int{5, 3, 90, 54, 12, 3 ,54, 35, 65, 99}
	var merger Merger
	merger = &maxMerger{}
	tree := New(arr, merger)

	max, err := tree.Query(0, 9)
	if err != nil {
		t.Error(err)
	}

	if max != 99 {
		t.Errorf("Wrong query result, expected 99, but got %d", max)
	}

	max, err = tree.Query(0, 4)
	if err != nil {
		t.Error(err)
	}

	if max != 90 {
		t.Errorf("Wrong query result, expected 90, but got %d", max)
	}

	tree.Set(5, 180)
	max, err = tree.Query(0, 9)
	if err != nil {
		t.Error(err)
	}

	if max != 180 {
		t.Errorf("Wrong query result, expected 180, but got %d", max)
	}
}