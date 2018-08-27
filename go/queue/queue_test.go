package queue

import (
	"testing"
)

func TestArrayQueue(t *testing.T) {
	var arrQueue Queue
	arrQueue, err := NewArrayQueue(20)
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

func TestLinkedListQueue(t *testing.T) {
	var q Queue
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

func TestLoopQueue(t *testing.T) {
	var loopQueue Queue
	loopQueue, err := NewLoopQueue(20)
	if err != nil {
		t.Error(err)
	}

	loopQueue.Enqueue(10)
	loopQueue.Enqueue(100)
	loopQueue.Enqueue("Hello World!")

	// size test
	size := loopQueue.GetSize()
	if size != 3 {
		t.Errorf("Wrong length, expected 3 but got %d", size)
	}

	// getFront test
	front, err := loopQueue.GetFront()
	if err != nil {
		t.Error(err)
	}

	if front != 10 {
		t.Errorf("Wrong queue front, expected 10 but got %v", front)
	}

	// dequeue and error test
	loopQueue.Dequeue()
	loopQueue.Dequeue()
	last, err := loopQueue.Dequeue()
	if err != nil {
		t.Error(err)
	}
	if last != "Hello World!" {
		t.Errorf("Wrong element, expected \"Hello World!\", bug got %v", last)
	}

	_, err = loopQueue.Dequeue()
	if err == nil {
		t.Error(err)
	}

	loopQueue, err = NewLoopQueue()
	if err != nil {
		t.Error(err)
	}

	for i := 0; i < 1000; i++ {
		loopQueue.Enqueue(i)
	}

	size = loopQueue.GetSize()
	if size != 1000 {
		t.Errorf("Wrong size, expected 1000, but got %d", size)
	}
}