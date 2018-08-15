package linkedlist

import (
	"fmt"
	"errors"
)

type LinkedList struct {
	dummyHead Node
	size int
}


func (l *LinkedList) GetSize() int {
	return l.size
}

func (l *LinkedList) IsEmpty() bool {
	return l.size == 0
}

func (l *LinkedList) Insert(index int, elem interface{}) error {
	if index < 0 || index > l.size {
		return errors.New("Index out of range")
	}

	current := &l.dummyHead
	for i := 0; i < index; i++ {
		current = current.next
	}
	node := Node{data: elem,}
	node.next = current.next
	current.next = &node
	l.size++
	return nil
}

func (l *LinkedList) AddFirst(elem interface{}) {
	l.Insert(0, elem)
}

func (l *LinkedList) AddLast(elem interface{}) {
	l.Insert(l.size, elem)
}

func (l *LinkedList) Remove(index int) (elem interface{}, err error) {
	if index < 0 || index > l.size - 1 {
		err = errors.New("Index out of range")
		return
	}

	prev := &l.dummyHead
	for i := 0; i < index; i++ {
		prev = prev.next
	}
	node := prev.next
	prev.next = node.next
	node.next = nil
	elem = node.data
	l.size--
	return
}

func (l *LinkedList) RemoveFirst() interface{} {
	elem, _ := l.Remove(0)
	return elem
}

func (l *LinkedList) RemoveLast() interface{} {
	elem, _ := l.Remove(l.size-1)
	return elem
}

func (l *LinkedList) Get(index int) (elem interface{}, err error) {
	if index < 0 || index > l.size {
		err = errors.New("Index out of range")
		return
	}

	current := &l.dummyHead
	for i := 0; i <= index; i++ {
		current = current.next
	}
	elem = current.data
	return
}

func (l *LinkedList) GetFirst() interface{} {
	elem, _ := l.Get(0)
	return elem
}

func (l *LinkedList) GetLast() interface{} {
	elem, _ := l.Get(l.size - 1)
	return elem
}

func (l *LinkedList) Set(index int, elem interface{}) error {
	if index < 0 || index > l.size {
		return errors.New("Index out of range")
	}

	current := &l.dummyHead
	for i := 0; i <= index; i++ {
		current = current.next
	}
	current.data = elem
	return nil
}

func (l *LinkedList) Contains(elem interface{}) bool {
	current := l.dummyHead.next
	for i := 0; i < l.size; i++ {
		if current.data == elem {
			return true
		} else {
			current = current.next
		}
	}
	return false
}

func (l *LinkedList) String() string {
	str := "LinkedList: "
	current := l.dummyHead.next
	for i := 0; i < l.size; i++ {
		str += fmt.Sprint(current.data) + " -> "
		current = current.next
	}

	str += "Null"
	return str
}