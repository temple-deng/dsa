package priorityqueue

import (
	"testing"
	"math/rand"
)

func TestPriorityQueue(t *testing.T) {
	queue := New()
	rand.Seed(2)

	for i := 0; i < 50; i++ {
		queue.Enqueue(rand.Intn(1000))
	}

	size := queue.GetSize()
	if size != 50 {
		t.Errorf("Wrong size, expected 50, but got %d", size)
	}

	arr := []int{}
	for i := 0; i < 50; i++ {
		value, err := queue.Dequeue()
		if err != nil {
			t.Fatal(err)
		}

		arr = append(arr, value)
	}

	for i := 0; i < 49; i++ {
		if arr[i] < arr[i+1] {
			t.Error("Wrong position")
		}
	}

	_, err := queue.GetFront()
	if err == nil {
		t.Error("Wrong, should have an error when get front in empty queue, but not")
	}

	queue.Enqueue(50)
	front, err := queue.GetFront()
	if err != nil {
		t.Error(err)
	}
	if front != 50 {
		t.Errorf("Wrong queue front, expected 50, but got %d", front)
	}
}