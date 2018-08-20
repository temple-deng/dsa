package heap

import (
	"../myArray"
	"errors"
)

// 介于堆也要求元素具有可排序性，因此这里使用整型动态数组，而不是泛型数组
type MaxHeap struct {
	data *myArray.MyArray
}

func New(capacities ...int) (*MaxHeap, error) {
	var capacity int
	if len(capacities) == 0 {
		capacity = 10
	} else {
		capacity = capacities[0]
	}
	data, err := myArray.NewIntArray(capacity)
	return &MaxHeap{data: data,}, err
}

func (m *MaxHeap) GetSize() int {
	return m.data.GetLength()
}

func (m *MaxHeap) IsEmpty() bool {
	return m.data.IsEmpty()
}

func (m *MaxHeap) Parent(index int) int {
	// 这里应该不用对 0 进行另外的判断把，应该 -1 / 2 = -0.5，应该是向 0 舍吧，所以还是0
	return (index - 1) / 2
}

func (m *MaxHeap) LeftChild(index int) int {
	return index * 2 + 1
}

func (m *MaxHeap) RightChild(index int) int {
	return index * 2 + 2
}