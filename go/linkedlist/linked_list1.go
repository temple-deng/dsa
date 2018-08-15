package linkedlist

import (
	"errors"
)

// 仅设头指针的链表
type LinkedList1 struct {
	head *Node
	size int
}

func (l *LinkedList1) GetSize() int {
	return l.size
}

func (l *LinkedList1) IsEmpty() bool {
	return l.size == 0
}

func (l *LinkedList1) addFirst(elem interface{}) {
	node := Node{data: elem,}
	node.next = l.head
	l.head = &node
	l.size++
}

// 链表的插入操作，在索引为 index(0-based) 处插入元素
func (l *LinkedList1) insert(index int, elem interface{}) error {
	if index > l.size || index < 0 {
		return errors.New("Index out of the range")
	}

	if index == 0 {
		l.addFirst(elem)
	} else {
		node := Node{data: elem,}
		current := l.head
		for i := 0; i < index - 1; i++ {
			current = current.next
		}
		node.next = current.next
		current.next = &node
	}
	l.size++
	return nil
}