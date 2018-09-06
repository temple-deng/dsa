package weightedgraph

import (
	"errors"
)

type IndexMinHeap struct {
	data []*Edge
	indexes []int
	reverse []int
	count int
	capacity int
}

func NewIndexMinHeap(cap int) *IndexMinHeap {
	heap := &IndexMinHeap{}
	heap.data = make([]*Edge, cap)
	heap.indexes = make([]int, cap)
	heap.reverse = make([]int, cap)

	// -1 代表元素还不在堆中
	for i := 0; i < cap; i++ {
		heap.reverse[i] = -1
	}
	heap.capacity = cap
	return heap
}

func (this *IndexMinHeap) GetSize() int {
	return this.count
}

func (this *IndexMinHeap) IsEmpty() bool {
	return this.count == 0
}

func (this *IndexMinHeap) Insert(index int, value *Edge) error {
	// 满容量或者索引超出
	if this.count == this.capacity || index >= this.capacity || index < 0 {
		return errors.New("Error: No availablle space or index out of range")
	}

	// 在插入元素前，需要判断索引 i 不在堆中，否则就堆中就会有两个索引 i 指向了同
	// 一元素，在添加的时候不会出问题，但是在出堆的时候会出问题
	if this.contains(index) {
		return errors.New("Element had been in heap")
	}

	this.data[index] = value
	// 一定要注意这里，indexes 中只有我们添加进的元素
	// 也就是并不是所有的数据都在堆中有代表的索引
	this.indexes[this.count] = index
	this.reverse[index] = this.count
	this.count++
	this.shiftUp(this.count)
	return nil
}

func (this *IndexMinHeap) contains(index int) bool {
	if index < 0 || index >= this.capacity {
		return false
	}
	return this.reverse[index] != -1
}

func (this *IndexMinHeap) ExtractMin() (*Edge, error) {
	if this.count == 0 {
		return nil, errors.New("Empty Heap")
	}
	value := this.data[this.indexes[0]]
	this.swapIndex(0, this.count-1)
	this.reverse[this.indexes[this.count-1]] = -1
	this.count--
	this.shiftDown(0)
	return value, nil
}

func (this *IndexMinHeap) ExtractMinIndex() (int, error) {
	if this.count == 0 {
		return 0, errors.New("Empty Heap")
	}
	maxIndex := this.indexes[0]
	this.swapIndex(0, this.count-1)
	this.reverse[this.indexes[this.count-1]] = -1
	this.count--
	this.shiftDown(0)
	return maxIndex, nil
}

func (this *IndexMinHeap) GetMin() (*Edge, error) {
	if this.count == 0 {
		return nil, errors.New("Empty Heap")
	}
	value := this.data[this.indexes[0]]
	return value, nil
}

func (this *IndexMinHeap) GetMinIndex() (int, error) {
	if this.count == 0 {
		return 0, errors.New("Empty Heap")
	}
	value := this.indexes[0]
	return value, nil
}

func (this *IndexMinHeap) GetItem(index int) (*Edge, error) {
	if !this.contains(index) {
		return nil, errors.New("Invalid index")
	}
	return this.data[this.indexes[index]], nil
}

func (this *IndexMinHeap) Change(index int, value *Edge) error {
	if !this.contains(index) {
		return errors.New("Invalid index")
	}

	this.data[index] = value
	// for i := 0; i < this.count; i++ {
	// 	if this.indexes[i] == index {
	// 		this.shiftUp(i)
	// 		this.shiftDown(i)
	// 		return nil
	// 	}
	// }

	j := this.reverse[index]
	this.shiftUp(j)
	this.shiftDown(j)
	return nil
}

func (this *IndexMinHeap) parent(i int) int {
	return (i-1) / 2
}

func (this *IndexMinHeap) left(i int) int {
	return i * 2 + 1
}

func (this *IndexMinHeap) right(i int) int {
	return i * 2 + 2
}

func (this *IndexMinHeap) shiftUp(index int) {
	for ; index > 0; {
		pIndex := this.parent(index) 
		// 比较是 indexes 中指向的数据的值
		if this.data[this.indexes[index]].Weight() < this.data[this.indexes[pIndex]].Weight() {
			this.swapIndex(index, pIndex)
			index = pIndex
		} else {
			break
		}
	}
}

func (this *IndexMinHeap) shiftDown(index int) {
	for ; this.left(index) < this.count; {
		l := this.left(index)
		j := l
		if l+1 < this.count && this.data[this.indexes[l+1]].Weight() < this.data[this.indexes[l]].Weight() {
			j = l+1
		}

		if this.data[this.indexes[j]].Weight() < this.data[this.indexes[index]].Weight() {
			this.swapIndex(j, index)
			index = j
		} else {
			break
		}
	}
}

func (this *IndexMinHeap) swapIndex(i, j int) {
	temp := this.indexes[i]
	this.indexes[i] = this.indexes[j]
	this.indexes[j] = temp

	this.reverse[this.indexes[i]] = i
	this.reverse[this.indexes[j]] = j
}