package linkedliststack

import (
	"fmt"
	"../linkedlist"
)

// 以链表为底层的栈结构
type LinkedListStack struct {
	data *linkedlist.LinkedList
}

func New() *LinkedListStack {
	return &LinkedListStack{linkedlist.New()}
}

func (s *LinkedListStack) GetSize() int {
	return s.data.GetSize()
}

func (s *LinkedListStack) IsEmpty() bool {
	return s.data.IsEmpty()
}

// 特别注意这里的栈顶是指链表头，因为链表头的操作都是 O(1) 级别的
func (s *LinkedListStack) Push(elem interface{}) {
	s.data.AddFirst(elem)
}

func (s *LinkedListStack) Pop() (interface{}, error) {
	return s.data.RemoveFirst()
}

func (s *LinkedListStack) Peek() (interface{}, error) {
	return s.data.GetFirst()
}

func (s *LinkedListStack) String() string {
	size := s.GetSize()
	str := fmt.Sprintf("LinkedList Stack: Size = %d\n", size)
	str += "Top [ "
	for i := 0; i < size; i++ {
		data, _ := s.data.Get(i)
		str += fmt.Sprint(data)
		if i != size - 1 {
			str += ", "
		}
	}
	str += " ]"
	return str
}