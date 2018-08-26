package queue

import (
	"testing"
)

func TestArrayQueue(t *testing.T) {
	var arrQueue Queue
	arrQueue, err := New(20)
	if err != nil {
		t.Error(err)
	}

	arrQueue.Enqueue(10)
	arrQueue.Enqueue(100)
	arrQueue.Enqueue("Hello World!")

	// size test
	size := arrQueue.GetSize()
	if size != 3 {
		t.Errorf("Wrong length, expected 3 but got %d", size)
	}

	// getFront test
	front, err := arrQueue.GetFront()
	if err != nil {
		t.Error(err)
	}

	if front != 10 {
		t.Errorf("Wrong queue front, expected 10 but got %v", front)
	}

	// dequeue and error test
	arrQueue.Dequeue()
	arrQueue.Dequeue()
	last, err := arrQueue.Dequeue()
	if err != nil {
		t.Error(err)
	}
	if last != "Hello World!" {
		t.Errorf("Wrong element, expected \"Hello World!\", bug got %v", last)
	}

	_, err = arrQueue.Dequeue()
	if err == nil {
		t.Error(err)
	}
}