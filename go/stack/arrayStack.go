package stack

import (
	"fmt"
	"../myArray"
)

// 以数组为底层实现的栈
type ArrayStack struct {
	array *myArray.Array
}

func New(capacities ...int) (*ArrayStack, error) {
	capacity := capacities[0]
	array, err := myArray.NewArray(capacity)
	return &ArrayStack{array: array,}, err
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