// 索引最大堆的实现，主要是为了理解概念，因此代码中有很多的 bug
// 主要在于对操作的定义不严谨上
package indexheap

import (
	"errors"
	"../myArray"
)

type IndexHeap struct {
	data *myArray.MyArray
	indexes *myArray.MyArray
	rev *myArray.MyArray
}

func New(capacity int) *IndexHeap {
	heap := &IndexHeap{}
	heap.data, _ = myArray.NewIntArray(capacity)
	heap.indexes, _ = myArray.NewIntArray(capacity)
	heap.rev, _ = myArray.NewIntArray(capacity)
	return heap
}

func (this *IndexHeap) GetSize() int {
	return this.indexes.GetLength()
}

func (this *IndexHeap) IsEmpty() bool {
	return this.data.IsEmpty()
}

func (this *IndexHeap) Parent(i int) int {
	return (i-1) / 2
}

func (this *IndexHeap) LeftChild(i int) int {
	return i * 2 + 1
}

func (this *IndexHeap) RightChild(i int) int {
	return i * 2 + 2
}

func (this *IndexHeap) Get(i int) (int, error) {
	index, err := this.indexes.Get(i)
	if err != nil {
		return 0, err
	}

	return this.data.Get(index)
}

func (this *IndexHeap) Change(index, val int) error {
	err := this.data.Set(index, val)
	if err != nil {
		return err
	}

	i := this.indexes.Find(index)
	if i == -1 {
		return errors.New("Error, Wrong index")
	}

	this.shiftUp(i)
	this.shiftDown(i)
	return nil
}

func (this *IndexHeap) Add(index, val int) {
	// 这里理论上该对 index 进行错误检查
	this.data.Set(index, val)
	// 这种情况下，indexes 中是可能出现重复值的把
	// 那堆中岂不是有指向同一数据的元素
	this.indexes.AddLast(index)
	this.rev.Set(index, this.GetSize() - 1)
	this.shiftUp(this.GetSize() - 1)
}

func (this *IndexHeap) FindMax() (int, error) {
	index, err := this.indexes.Get(0)
	if err != nil {
		return 0, err
	}

	val, err := this.data.Get(index)
	return val, err
}

func (this *IndexHeap) RemoveMaxIndex() (int, error) {
	lastIndex, err := this.indexes.Get(this.indexes.GetLength() - 1)
	if err != nil {
		return 0, err
	}

	this.swap(0, lastIndex)
	this.indexes.RemoveLast()
	this.shiftDown(0)
	return lastIndex, err
}

func (this *IndexHeap) RemoveMax() (int, error) {
	val, err := this.FindMax()
	if err != nil {
		return 0, err
	}
	lastIndex, err := this.indexes.Get(this.indexes.GetLength() - 1)
	if err != nil {
		return 0, err
	}

	this.swap(0, lastIndex)
	this.indexes.RemoveLast()
	this.shiftDown(0)
	return val, err
}

func (this *IndexHeap) shiftUp(index int) {
	for ; index > 0 && this.get(index) > this.get(this.Parent(index)); {
		parIndex := this.Parent(index)
		this.swap(index, parIndex)
		
		index = parIndex
	}
}

func (this *IndexHeap) shiftDown(index int) {
	size := this.GetSize()
	for ; this.LeftChild(index) < size; {
		j := this.LeftChild(index)
		if j+1 < size && this.get(j+1) > this.get(j) {
			j = j+1
		}

		if this.get(index) < this.get(j) {
			this.swap(index, j)
			index = j
		} else {
			break
		}
	}
}

func (this *IndexHeap) get(i int) int {
	index, _ := this.indexes.Get(i)
	val, _ := this.data.Get(index)
	return val
}

func (this *IndexHeap) swap(i, j int) {
	iVal, _ := this.indexes.Get(i)
	jVal, _ := this.indexes.Get(j)
	this.indexes.Set(i, jVal)
	this.indexes.Set(j, iVal)
}