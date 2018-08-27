package selfmap

import (
	"errors"
	"fmt"
)

type ListNode struct {
	key string
	value int
	next *ListNode
}

func (n *ListNode) String() string {
	return fmt.Sprintf("{%s: %d}", n.key, n.value)
}

type LinkedListMap struct {
	dummyHead *ListNode
	size int
}

func New() *LinkedListMap {
	return &LinkedListMap{&ListNode{}, 0}
}

func (m *LinkedListMap) GetSize() int {
	return m.size
}

func (m *LinkedListMap) IsEmpty() bool {
	return m.size == 0
}

func (m *LinkedListMap) getNode(key string) *ListNode {
	for cur := m.dummyHead.next; cur != nil; cur = cur.next {
		if cur.key == key {
			return cur
		}
	}
	return nil
}

func (m *LinkedListMap) Contains(key string) bool {
	return m.getNode(key) != nil
}

func (m *LinkedListMap) Get(key string) (value int, ok bool) {
	if node := m.getNode(key); node != nil {
		value = node.value
		ok = true
		return
	} else {
		ok = false
		return
	}
}

func (m *LinkedListMap) Add(key string, value int) {
	if node := m.getNode(key); node == nil {
		m.dummyHead.next = &ListNode{key: key, value: value, next: m.dummyHead.next,}
		m.size++
		return
	} else {
		node.value = value
	}
}

func (m *LinkedListMap) Set(key string, value int) error {
	if node := m.getNode(key); node == nil {
		return errors.New("Key doesn't exist")
	} else {
		node.value = value
		return nil
	}
}

func (m *LinkedListMap) Remove(key string) (value int, ok bool){
	prev := m.dummyHead;
	for ; prev.next != nil; prev = prev.next {
		if key == prev.next.key {
			cur := prev.next
			value = cur.value
			ok = true
			prev.next = cur.next
			cur = nil
			m.size--
			return
		}
	}
	return
}