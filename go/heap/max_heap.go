package heap

import (
	"../myArray"
	"errors"
)

// 介于堆也要求元素具有可排序性，因此这里使用整型动态数组，而不是泛型数组
type MaxHeap struct {
	data *myArray.MyArray
}

func New(arg ...interface{}) (*MaxHeap, error) {
	if len(arg) == 0 {
		data, err := myArray.NewIntArray(10)
		return &MaxHeap{data: data,}, err
	}

	switch v := arg[0].(type) {
	case int:
		capacity := v
		data, err := myArray.NewIntArray(capacity)
		return &MaxHeap{data: data,}, err
	case []int:
		// 这里要支持 heapify 就必须底层的数组支持传入数组做参数的形式
		length := len(v)
		data, err := myArray.NewIntArray(v)
		heap := &MaxHeap{data: data,}
		lastBranchIndex := (length - 1 - 1) / 2
		for i := lastBranchIndex; i >= 0; i-- {
			heap.SiftDown(i)
		}
		return heap, err
	default:
		return nil, nil
	}
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

func (m *MaxHeap) Add(value int) {
	m.data.AddLast(value)
	m.siftUp()
}

func (m *MaxHeap) siftUp() {
	curIndex := m.data.GetLength() - 1
	value, _ := m.data.Get(curIndex)
	parentIndex := m.Parent(curIndex)
	parent, _ := m.data.Get(parentIndex)
	for ; curIndex > 0 && parent < value; {
		m.data.Set(parentIndex, value)
		m.data.Set(curIndex, parent)
		curIndex = parentIndex
		parentIndex = m.Parent(curIndex)
		parent, _ = m.data.Get(parentIndex)
	}
}

func (m *MaxHeap) FindMax() (int, error) {
	return m.data.Get(0)
}

func (m *MaxHeap) RemoveMax() (value int, err error) {
	if m.data.GetLength() == 0 {
		err = errors.New("The Head is Empty")
		return
	}

	value, _ = m.data.Get(0)
	lastIndex := m.data.GetLength() - 1
	lastValue, _ := m.data.Get(lastIndex)
	m.data.Set(0, lastValue)
	m.data.RemoveLast()
	m.SiftDown(0)
	return
}

func (m *MaxHeap) SiftDown(index int) {
	size := m.data.GetLength()
	for ; m.LeftChild(index) < size; {
		li := m.LeftChild(index)
		ri := li + 1
		j := li
		left, _ := m.data.Get(li)
		right, _ := m.data.Get(ri)
		if ri < size && right > left {
			j = ri
		}
		
		max, _ := m.data.Get(j)
		value, _ := m.data.Get(index)
		if value < max {
			m.swap(index, j)
			index = j
		} else {
			break
		}
	}
}

func (m *MaxHeap) swap(x int, y int) {
	v1, _ := m.data.Get(x)
	v2, _ := m.data.Get(y)
	m.data.Set(x, v2)
	m.data.Set(y, v1)
}

func (m *MaxHeap) Replace(value int) error {
	err := m.data.Set(0, value)
	if err != nil {
		return err
	}

	m.SiftDown(0)
	return nil
}

