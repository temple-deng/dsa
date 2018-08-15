package stack

import (
	"fmt"
	"../myArray"
)

// 这个结构体使用的时候需要注意的是
// 如果我们希望以实现 Stack 接口的形式使用这个结构体
// 那么应该使用指向结构体的指针，因为指针接收者实现了 Stack 接口的所有方法
// 如果不是通过接口的方式使用，那么其实通过指针还是普通的结构体区别不大
type ArrayStack struct {
	array myArray.Array
}

func (s *ArrayStack) Init(capacity int) error {
	return s.array.Init(capacity)
}

func (s *ArrayStack) GetCapacity() int {
	return s.array.GetCapacity()
}

func (s *ArrayStack) GetSize() int {
	return s.array.GetLength()
}

func (s *ArrayStack) IsEmpty() bool {
	return s.array.IsEmpty()
}

// 这里要求动态数组必须实现了 AddLast 方法
func (s *ArrayStack) Push(elem interface{}) {
	s.array.AddLast(elem)
}

// 同理，这里要求动态数组必须实现了 RemoveLast 方法
func (s *ArrayStack) Pop() (interface{}, error) {
	return s.array.RemoveLast()
}

func (s *ArrayStack) Peek() (interface{}, error) {
	return s.array.Get(s.GetSize() - 1)
}

// 这里 String 方法尚未完成
func (s *ArrayStack) String() string {
	str := "Stack:\n"
	str += "Top: "
  size := s.GetSize()
	for i := size - 1; i > 0; i-- {
		elem, _ := s.array.Get(i)
		str += fmt.Sprint(elem) + ", "
	}

	if size != 0 {
		elem, _ := s.array.Get(0)
		str += fmt.Sprint(elem)
	}
	return str
}