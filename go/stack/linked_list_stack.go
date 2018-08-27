package stack

import (
	"../linkedlist"
	"fmt"
)

type LinkedListStack struct {
	data *linkedlist.LinkedList
}

// 创建一个链表栈
func New() *LinkedListStack {
	return &LinkedListStack{linkedlist.New()}
}

// 返回栈中元素数量
func (this *LinkedListStack) GetSize() int {
	return this.data.GetSize()
}

// 返回栈是否为空栈
func (this *LinkedListStack) IsEmpty() bool {
	return this.data.IsEmpty()
}

func (this *LinkedListStack) Push(elem interface{}) {
	this.data.AddFirst(elem)
}

func (this *LinkedListStack) Pop() (interface{}, error) {
	return this.data.RemoveFirst()
}

func (this *LinkedListStack) Peek() (interface{}, error) {
	return this.data.Get(0)
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