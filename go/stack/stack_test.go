package stack

import (
	"testing"
)

func TestArrayStack(t *testing.T) {
	var arrayStack Stack
	arrayStack, err := NewArrayStack()
	if err != nil {
		t.Error(err)
	}

	// size test
	size := arrayStack.GetSize()
	if size != 0 {
		t.Errorf("Wrong size, expected 0, but got %d", size)
	}

	// push and peek test
	arrayStack.Push(1)
	arrayStack.Push(2)
	arrayStack.Push(3)

	top, err := arrayStack.Peek()
	if err != nil {
		t.Error(err)
	}

	if top != 3 {
		t.Errorf("Wrong stack top, expected 3, but got %v", top)
	}

	size = arrayStack.GetSize()
	if size != 3 {
		t.Errorf("Wrong size, expected 3, but got %d", size)
	}

	// pop test
	for i := 3; i > 0; i-- {
		top, err := arrayStack.Pop()
		if err != nil {
			t.Error(err)
		}

		if top != i {
			t.Errorf("Wrong top, expected %d, but got %v", i, top)
		}
	}

	// empty test
	empty := arrayStack.IsEmpty()
	if empty != true {
		t.Error("Expected empty, but no")
	}
}

func TestLinkedListStack(t *testing.T) {
	var linkedListStack Stack
	linkedListStack = New()

	// size test
	size := linkedListStack.GetSize()
	if size != 0 {
		t.Errorf("Wrong size, expected 0, but got %d", size)
	}

	// push and peek test
	linkedListStack.Push(1)
	linkedListStack.Push(2)
	linkedListStack.Push(3)

	top, err := linkedListStack.Peek()
	if err != nil {
		t.Error(err)
	}

	if top != 3 {
		t.Errorf("Wrong stack top, expected 3, but got %v", top)
	}

	size = linkedListStack.GetSize()
	if size != 3 {
		t.Errorf("Wrong size, expected 3, but got %d", size)
	}

	// pop test
	for i := 3; i > 0; i-- {
		top, err := linkedListStack.Pop()
		if err != nil {
			t.Error(err)
		}

		if top != i {
			t.Errorf("Wrong top, expected %d, but got %v", i, top)
		}
	}

	// empty test
	empty := linkedListStack.IsEmpty()
	if empty != true {
		t.Error("Expected empty, but no")
	}
}