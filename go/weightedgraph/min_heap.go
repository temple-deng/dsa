package weightedgraph

import (
	"../myArray"
)

type MinHeap struct {
	data *myArray.Array
}

func NewMinHeap(arg ...interface{}) (*MinHeap, error) {
	if len(arg) == 0 {
		data, err := myArray.NewArray(10)
		return &MinHeap{data: data,}, err
	}

	switch v := arg[0].(type) {
	case int:
		capacity := v
		data, err := myArray.NewArray(capacity)
		return &MinHeap{data: data,}, err
	case []Edge:
		// 这里要支持 heapify 就必须底层的数组支持传入数组做参数的形式
		length := len(v)
		data, err := myArray.NewArray(v)
		heap := &MinHeap{data: data,}
		lastBranchIndex := (length - 1 - 1) / 2
		for i := lastBranchIndex; i >= 0; i-- {
			heap.siftDown(i)
		}
		return heap, err
	default:
		return nil, nil
	}
}

func (this *MinHeap) GetSize() int {
	return this.data.GetLength()
}

func (this *MinHeap) IsEmpty() bool {
	return this.data.IsEmpty()
}

func (this *MinHeap) Parent(i int) int {
	return (i-1) / 2
}

func (this *MinHeap) LeftChild(i int) int {
	return i * 2 + 1
}

func (this *MinHeap) RightChild(i int) int {
	return i * 2 + 2
}

func (this *MinHeap) Add(edge Edge) {
	this.data.AddLast(edge)
	this.siftUp()
}

// 返回指向特定索引的 *Edge
func (this *MinHeap) get(i int) *Edge {
	value, _ := this.data.Get(i)
	v := value.(Edge)
	return &v
}

func (this *MinHeap) siftUp() {
	index := this.data.GetLength() - 1
	for ; index > 0 && this.get(index).Weight() < this.get(this.Parent(index)).Weight(); {
		parIndex := this.Parent(index)
		this.swap(index, parIndex)
		index = parIndex
	}
}

func (this *MinHeap) swap(i, j int) {
	iValue, _ := this.data.Get(i)
	jValue, _ := this.data.Get(j)
	this.data.Set(i, jValue)
	this.data.Set(j, iValue)
}

func (this *MinHeap) FindMin() (Edge, error) {
	val, err := this.data.Get(0)
	v := val.(Edge)
	return v, err
}

func (this *MinHeap) RemoveMin() (Edge, error) {
	val, err := this.FindMin()
	this.swap(0, this.data.GetLength() - 1)
	this.data.RemoveLast()
	this.siftDown(0)
	return val, err
}

func (this *MinHeap) siftDown(index int) {
	size := this.data.GetLength()
	for ; this.LeftChild(index) < size; {
		l := this.LeftChild(index)
		j := l
		if l+1 < size && this.get(l+1).Weight() < this.get(l).Weight() {
			j = l+1
		}

		if this.get(j).Weight() < this.get(index).Weight() {
			this.swap(index, j)
			index = j
		} else {
			break
		}
	}
} 