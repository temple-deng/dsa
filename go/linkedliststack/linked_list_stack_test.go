package linkedliststack

import (
	"testing"
)

func TestLinkedListStack (t *testing.T) {
	stack := New()

	size := stack.GetSize()
	if size != 0 {
		t.Errorf("Wrong size, expected 0, but got %d", size)
	}

	stack.Push(1)
	stack.Push(2)
	stack.Push(3)
	stack.Push(4)
	stack.Push(5)

	top, err := stack.Peek()
	if err != nil {
		t.Error(err)
	}

	if top != 5 {
		t.Errorf("Wrong top, expected 5, but got %v", top)
	}

	stack.Push("Hello World!")
	top, err = stack.Pop()
	if err != nil {
		t.Error(err)
	}

	if top != "Hello World!" {
		t.Errorf("Wrong top, expected Hello World!, but got %v", top)
	}


	for i := 0; i < 5; i++ {
		stack.Pop()
	}

	empty := stack.IsEmpty()
	if empty != true {
		t.Errorf("expected empty stack, but got %v", empty)
	}
}