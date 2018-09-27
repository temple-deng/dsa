package weightedgraph

import (
	"errors"
)

type IndexMaxHeap struct {
	data []int
	indexes []int
	reverse []int
	count int
	capacity int
}

func NewIndexMaxHeap(cap int) *IndexMaxHeap {
	heap := &IndexMaxHeap{}
	heap.data = make([]int, cap)
	heap.indexes = make([]int, cap)
	heap.reverse = make([]int, cap)

	// -1 代表元素还不在堆中
	for i := 0; i < cap; i++ {
		heap.reverse[i] = -1
	}
	heap.capacity = cap
	return heap
}

func (this *IndexMaxHeap) GetSize() int {
	return this.count
}

func (this *IndexMaxHeap) IsEmpty() bool {
	return this.count == 0
}

func (this *IndexMaxHeap) Insert(index, value int) error {
	// 满容量
	if this.count == this.capacity {
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
	this.shiftUp(this.count)
	this.count++
	return nil
}

func (this *IndexMaxHeap) contains(index int) bool {
	if index < 0 || index >= this.capacity {
		return false
	}
	return this.reverse[index] != -1
}

func (this *IndexMaxHeap) ExtractMax() (int, error) {
	if this.count == 0 {
		return 0, errors.New("Empty Heap")
	}
	value := this.data[this.indexes[0]]
	this.swapIndex(0, this.count-1)
	this.reverse[this.indexes[this.count-1]] = -1
	this.count--
	this.shiftDown(0)
	return value, nil
}

func (this *IndexMaxHeap) ExtractMaxIndex() (int, error) {
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

func (this *IndexMaxHeap) GetMax() (int, error) {
	if this.count == 0 {
		return 0, errors.New("Empty Heap")
	}
	value := this.data[this.indexes[0]]
	return value, nil
}

func (this *IndexMaxHeap) GetMaxIndex() (int, error) {
	if this.count == 0 {
		return 0, errors.New("Empty Heap")
	}
	value := this.indexes[0]
	return value, nil
}

func (this *IndexMaxHeap) GetItem(index int) (int, error) {
	if !this.contains(index) {
		return 0, errors.New("Invalid index")
	}
	return this.data[index], nil
}

func (this *IndexMaxHeap) Change(index int, value int) error {
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

func (this *IndexMaxHeap) parent(i int) int {
	return (i-1) / 2
}

func (this *IndexMaxHeap) left(i int) int {
	return i * 2 + 1
}

func (this *IndexMaxHeap) right(i int) int {
	return i * 2 + 2
}

func (this *IndexMaxHeap) shiftUp(index int) {
	for ; index > 0; {
		pIndex := this.parent(index) 
		// 比较是 indexes 中指向的数据的值
		if this.data[this.indexes[index]] > this.data[this.indexes[pIndex]] {
			this.swapIndex(index, pIndex)
			index = pIndex
		} else {
			break
		}
	}
}

func (this *IndexMaxHeap) shiftDown(index int) {
	for ; this.left(index) < this.count; {
		l := this.left(index)
		j := l
		if l+1 < this.count && this.data[this.indexes[l+1]] > this.data[this.indexes[l]] {
			j = l+1
		}

		if this.data[this.indexes[j]] > this.data[this.indexes[index]] {
			this.swapIndex(j, index)
			index = j
		} else {
			break
		}
	}
}

func (this *IndexMaxHeap) swapIndex(i, j int) {
	temp := this.indexes[i]
	this.indexes[i] = this.indexes[j]
	this.indexes[j] = temp

	this.reverse[this.indexes[i]] = i
	this.reverse[this.indexes[j]] = j
}