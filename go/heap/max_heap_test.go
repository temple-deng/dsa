package heap

import (
	"testing"
)

func TestMaxHeap(t *testing.T) {
	heap, err := New(50)
	if err != nil {
		t.Error(err)
	}

	size := heap.GetSize()
	if size != 0 {
		t.Errorf("Wrong size, expected 0, but got %d", size)
	}

	heap.Add(100)
	heap.Add(50)
	heap.Add(200)
	heap.Add(90)

	max, err := heap.RemoveMax()
	if err != nil {
		t.Error(err)
	}

	if max != 200 {
		t.Errorf("Wrong remove max, expected 200, but got %d", max)
	}

	max, err = heap.FindMax()
	if err != nil {
		t.Error(err)
	}

	if max != 100 {
		t.Errorf("Wrong find max, expected 100, but got %d", max)
	}

	heap.Replace(30)
	max, err = heap.FindMax()
	if err != nil {
		t.Error(err)
	}

	if max != 90 {
		t.Errorf("Wrong find max, expected 90, but got %d", max)
	}
}

func TestHeapify(t *testing.T) {
	arr := []int{5, 2, 20, 54, 4, 23, 50, 60, 1}
	heap, err := New(arr)
	if err != nil {
		t.Error(err)
	}

	size := heap.GetSize()
	if size != len(arr) {
		t.Errorf("Wrong size, expected %d, but got %d", len(arr), size)
	}

	max, err := heap.RemoveMax()
	if err != nil {
		t.Error(err)
	}

	if max != 60 {
		t.Errorf("Wrong remove max, expected 60, but got %d", max)
	}

	max, err = heap.FindMax()
	if err != nil {
		t.Error(err)
	}

	if max != 54 {
		t.Errorf("Wrong remove max, expected 54, but got %d", max)
	}

	heap.Replace(0)
	max, err = heap.FindMax()
	if err != nil {
		t.Error(err)
	}

	if max != 50 {
		t.Errorf("Wrong remove max, expected 50, but got %d", max)
	}
}

