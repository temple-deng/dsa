package linkedlistqueue

import (
	"testing"
	"../queue"
)

func TestLinkedListQueue(t *testing.T) {
	var q queue.Queue
	q = New()

	size := q.GetSize()
	if size != 0 {
		t.Errorf("Wrong size, expected 0, but got %d", size)
	}

	q.Enqueue("H")
	q.Enqueue("e")
	q.Enqueue("l")
	q.Enqueue("l")
	q.Enqueue("o")

	size = q.GetSize()
	if size != 5 {
		t.Errorf("Wrong size, expected 5, but got %d", size)
	}

	head, err := q.GetFront()
	if err != nil {
		t.Error(err)
	}

	if head != "H" {
		t.Errorf("Wrong head, expected H, bug got %v", head)
	}

	for i := 0; i < 5; i++ {
		q.Dequeue()
	}

	empty := q.IsEmpty()
	if !empty {
		t.Errorf("Should be empty, but no")
	}
}