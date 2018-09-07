package weightedgraph

import (
	"errors"
)

type IndexMinHeapF struct {
	data []float32
	indexes []int
	reverse []int
	count int
	capacity int
}

func NewIndexMinHeapF(cap int) *IndexMinHeapF {
	heap := &IndexMinHeapF{}
	heap.data = make([]float32, cap)
	heap.indexes = make([]int, cap)
	heap.reverse = make([]int, cap)

	// -1 代表元素还不在堆中
	for i := 0; i < cap; i++ {
		heap.reverse[i] = -1
	}
	heap.capacity = cap
	return heap
}

func (this *IndexMinHeapF) GetSize() int {
	return this.count
}

func (this *IndexMinHeapF) IsEmpty() bool {
	return this.count == 0
}

func (this *IndexMinHeapF) Insert(index int, value float32) error {
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
	this.shiftUp(this.count)
	this.count++
	return nil
}

func (this *IndexMinHeapF) contains(index int) bool {
	if index < 0 || index >= this.capacity {
		return false
	}
	return this.reverse[index] != -1
}

func (this *IndexMinHeapF) ExtractMin() (float32, error) {
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

func (this *IndexMinHeapF) ExtractMinIndex() (int, error) {
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

func (this *IndexMinHeapF) GetMin() (float32, error) {
	if this.count == 0 {
		return 0, errors.New("Empty Heap")
	}
	value := this.data[this.indexes[0]]
	return value, nil
}

func (this *IndexMinHeapF) GetMinIndex() (int, error) {
	if this.count == 0 {
		return 0, errors.New("Empty Heap")
	}
	value := this.indexes[0]
	return value, nil
}

func (this *IndexMinHeapF) GetItem(index int) (float32, error) {
	if !this.contains(index) {
		return 0, errors.New("Invalid index")
	}
	return this.data[this.indexes[index]], nil
}

func (this *IndexMinHeapF) Change(index int, value float32) error {
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

func (this *IndexMinHeapF) parent(i int) int {
	return (i-1) / 2
}

func (this *IndexMinHeapF) left(i int) int {
	return i * 2 + 1
}

func (this *IndexMinHeapF) right(i int) int {
	return i * 2 + 2
}

func (this *IndexMinHeapF) shiftUp(index int) {
	for ; index > 0; {
		pIndex := this.parent(index) 
		// 比较是 indexes 中指向的数据的值
		if this.data[this.indexes[index]] < this.data[this.indexes[pIndex]] {
			this.swapIndex(index, pIndex)
			index = pIndex
		} else {
			break
		}
	}
}

func (this *IndexMinHeapF) shiftDown(index int) {
	for ; this.left(index) < this.count; {
		l := this.left(index)
		j := l
		if l+1 < this.count && this.data[this.indexes[l+1]] < this.data[this.indexes[l]] {
			j = l+1
		}

		if this.data[this.indexes[j]] < this.data[this.indexes[index]] {
			this.swapIndex(j, index)
			index = j
		} else {
			break
		}
	}
}

func (this *IndexMinHeapF) swapIndex(i, j int) {
	temp := this.indexes[i]
	this.indexes[i] = this.indexes[j]
	this.indexes[j] = temp

	this.reverse[this.indexes[i]] = i
	this.reverse[this.indexes[j]] = j
}