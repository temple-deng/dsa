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

	count100 := list.Count(100)
	if count100 != 1 {
		t.Errorf("Wrong count result, expected 1, but got %d", count100)
	}

	count0 := list.Count(0)
	if count0 != 0 {
		t.Errorf("Wrong count result, expected 0, but got %d", count0)
	}

	list.Insert(0, "Hello World!")
	list.Insert(0, "Hello World!")

	countHe := list.Count("Hello World!")
	if countHe != 3 {
		t.Errorf("Wrong hello world count result, expected 3, but got %d", countHe)
	}
}

func TestCopy(t *testing.T) {
	list := New()

	list.AddLast(0)
	list.AddLast(2)
	list.AddLast(4)
	list.AddLast(6)

	cp := list.Copy()

	size := cp.GetSize()
	if size != 4 {
		t.Errorf("Wrong copy size, expected 4, but got %d", size)
	}

	list.AddLast(8)

	size = cp.GetSize()
	if size != 4 {
		t.Errorf("Wrong copy size, expected 4, but got %d", size)
	}

	list.Set(2, 100)

	cpIndex2, err := cp.Get(2)
	if err != nil {
		t.Error(err)
	}
	if cpIndex2 != 4 {
		t.Errorf("Wrong copy result elem, expected 4 at index = 2, but got %v", cpIndex2)
	}

	cp.AddLast("Hello")
	cp.AddLast("World")

	size = list.GetSize()
	if size != 5 {
		t.Errorf("Wrong original size, expected 5, but got %d", size)
	}

	cp.Set(0, "Go")
	index0, err := cp.Get(0)
	if err != nil {
		t.Error(err)
	}

	if index0 != "Go" {
		t.Errorf("expected Go, but got %v", index0)
	}

	index0, err = list.GetFirst()
	if err != nil {
		t.Error(err)
	}

	if index0 != 0 {
		t.Errorf("expected 0, but got %v", index0)
	}
}


func TestOptimizedCopy(t *testing.T) {
	list := New()

	list.AddLast(0)
	list.AddLast(2)
	list.AddLast(4)
	list.AddLast(6)

	cp := list.OptimizedCopy()

	size := cp.GetSize()
	if size != 4 {
		t.Errorf("Wrong copy size, expected 4, but got %d", size)
	}

	list.AddLast(8)

	size = cp.GetSize()
	if size != 4 {
		t.Errorf("Wrong copy size, expected 4, but got %d", size)
	}

	list.Set(2, 100)

	cpIndex2, err := cp.Get(2)
	if err != nil {
		t.Error(err)
	}
	if cpIndex2 != 4 {
		t.Errorf("Wrong copy result elem, expected 4 at index = 2, but got %v", cpIndex2)
	}

	cp.AddLast("Hello")
	cp.AddLast("World")

	size = list.GetSize()
	if size != 5 {
		t.Errorf("Wrong original size, expected 5, but got %d", size)
	}

	cp.Set(0, "Go")
	index0, err := cp.Get(0)
	if err != nil {
		t.Error(err)
	}

	if index0 != "Go" {
		t.Errorf("expected Go, but got %v", index0)
	}

	index0, err = list.GetFirst()
	if err != nil {
		t.Error(err)
	}

	if index0 != 0 {
		t.Errorf("expected 0, but got %v", index0)
	}
}