package priorityqueue

import (
	"../heap"
)

// 这里的优先级队列也并没有实现 Queue 接口，因为我们队列中的元素要求是可排序的
// 除了元素类型这一部分，其余的条件都满足
type PriorityQueue struct {
	heap *heap.MaxHeap
}

func New() *PriorityQueue {
	maxHeap, _ := heap.New()
	return &PriorityQueue{maxHeap}
}

func (p *PriorityQueue) IsEmpty() bool {
	return p.heap.IsEmpty()
}

func (p *PriorityQueue) GetSize() int {
	return p.heap.GetSize()
}

func (p *PriorityQueue) Enqueue(value int) {
	p.heap.Add(value)
}

func (p *PriorityQueue) GetFront() (int, error) {
	return p.heap.FindMax()
}

func (p *PriorityQueue) Dequeue() (int, error) {
	return p.heap.RemoveMax()
}