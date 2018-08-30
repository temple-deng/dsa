package linkedlist

import (
	"fmt"
	"errors"
)

type LinkedList struct {
	dummyHead Node
	size int
}

func New() *LinkedList {
	// 注意只有上面的 dummyHead 声明成结构体的时候才可以这样初始化
	// 如果是指向 Node 的指针的话，就必须显示添加一个 Node 了
	return &LinkedList{}
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

	prev := &l.dummyHead
	for i := 0; i < index; i++ {
		prev = prev.next
	}
	node := Node{data: elem,}
	node.next = prev.next
	prev.next = &node
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

func (l *LinkedList) RemoveFirst() (interface{}, error) {
	return l.Remove(0)
}

func (l *LinkedList) RemoveLast() (interface{}, error) {
	return l.Remove(l.size - 1)
}

func (l *LinkedList) Get(index int) (elem interface{}, err error) {
	if index < 0 || index > l.size {
		err = errors.New("Index out of range")
		return
	}

	current := l.dummyHead.next
	for i := 0; i < index; i++ {
		current = current.next
	}
	elem = current.data
	return
}

func (l *LinkedList) GetFirst() (interface{}, error) {
	return l.Get(0)
}

func (l *LinkedList) GetLast() (interface{}, error) {
	return l.Get(l.size - 1)
}

func (l *LinkedList) Set(index int, elem interface{}) error {
	if index < 0 || index > l.size {
		return errors.New("Index out of range")
	}

	current := l.dummyHead.next
	for i := 0; i < index; i++ {
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

// 补充内容
// 统计列表中指定元素出现的次数
func (l *LinkedList) Count(elem interface{}) int {
	count := 0
	for cur := l.dummyHead.next; cur != nil; cur = cur.next {
		if cur.data == elem {
			count++
		}
	}
	return count
}

// 拷贝一份链表
func (l *LinkedList) Copy() *LinkedList {
	newList := New()

	for cur := l.dummyHead.next; cur != nil; cur = cur.next {
		newList.AddLast(cur.data)
	}

	return newList
}

// 优化后的拷贝操作
// 理论上来说复杂度为 O(n) 级别
func (l *LinkedList) OptimizedCopy() *LinkedList {
	nodes := []*Node{}
	newList := New()

	for cur := l.dummyHead.next; cur != nil; cur = cur.next {
		node := &Node{data: cur.data,}
		nodes = append(nodes, node)
	}

	for i := 0; i < len(nodes) - 1; i++ {
		nodes[i].next = nodes[i+1]
	}


	newList.size = l.GetSize()
	if len(nodes) == 0 {
		return newList
	}
	head := Node{data: nil, next: nodes[0],}
	newList.dummyHead = head
	return newList
}