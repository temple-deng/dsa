package linkedlistqueue

import (
	"fmt"
	"errors"
)

type LinkedListQueue struct {
	head *Node
	tail *Node
	size int
}

func New() *LinkedListQueue {
	return &LinkedListQueue{}
}

func (q *LinkedListQueue) GetSize() int {
	return q.size
}

func (q *LinkedListQueue) IsEmpty() bool {
	return q.size == 0
}

func (q *LinkedListQueue) Enqueue(elem interface{}) {
	node := &Node{data: elem,}

	if q.size == 0 {
		q.head = node
		q.tail = node
	} else {
		q.tail.next = node
		q.tail = node
	}
	q.size++
}

func (q *LinkedListQueue) Dequeue() (elem interface{}, err error) {
	if q.size == 0 {
		err = errors.New("Queue is Empty")
		return
	}

	node := q.head
	elem = node.data
	q.head = q.head.next
	node = nil
	q.size--
	return
}

func (q *LinkedListQueue) GetFront() (elem interface{}, err error) {
	if q.size == 0 {
		err = errors.New("Queue is Empty")
		return
	}

	elem = q.head.data
	return
}

func (q *LinkedListQueue) String() string {
	str := fmt.Sprintf("Linked List Queue: Size = %d\n", q.size)
	str += "Head [ "
	
	for current := q.head; current.next != nil; current = current.next {
		str += fmt.Sprint(current.data) + ", "
	}

	str += fmt.Sprint(q.tail.data) + " ] Tail "
	return str
}