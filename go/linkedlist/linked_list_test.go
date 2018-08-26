package linkedlist

import (
	"testing"
)

func TestLinkedList(t *testing.T) {
	list := New()
	empty := list.IsEmpty()

	if empty != true {
		t.Error("List should be empty, bug got false")
	}

	list.Insert(0, 10)
	list.Insert(1, 100)
	list.Insert(2, "Hello World!")
	list.Insert(3, true)

	size := list.GetSize()
	if size != 4 {
		t.Errorf("Wrong list size, expected 4, but got %d", size)
	}

	elem, err := list.Get(2)
	if err != nil {
		 t.Error(err)
	}

	if elem != "Hello World!" {
		t.Errorf("Wrong value, expected Hello World!, but got %v", elem)
	}

	list.RemoveFirst()
	list.RemoveLast()
	head, err := list.GetFirst()
	if err != nil {
		t.Error(err)
	}

	if head != 100 {
		t.Errorf("Wrong value, expected 100, but got %v", head)
	}

	tail, err := list.GetLast()
	if err != nil {
		t.Error(err)
	}

	if tail != "Hello World!" {
		t.Errorf("Wrong value, expected Hello World!, but got %v", tail)
	}
}