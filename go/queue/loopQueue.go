/**
 * 这里循环队列我们不再使用动态数组作为底层实现，而是重零开始
 */
package queue

import (
	"fmt"
	"errors"
)

type LoopQueue struct {
	data []interface{}
	front int
	tail int
	size int
}

func NewLoopQueue(capacities ...int) (*LoopQueue, error) {
	capacity := capacities[0]
	lq := LoopQueue{}
	err := lq.init(capacity)
	return &lq, err
}

func (q *LoopQueue) init(capacity int) error {
	if capacity <= 0 {
		return errors.New("Capacity cannot less than 0")
	}

	// capacity 是用户期望能放置的元素，但我们的队列还特意空置了一个元素
	// 所以最终容量是 capacity + 1
	q.data = make([]interface{}, 0, capacity + 1)
	return nil
}

func (q *LoopQueue) IsEmpty() bool {
	return q.front == q.tail
}

func (q *LoopQueue) GetSize() int {
	return q.size
}

func (q *LoopQueue) GetCapacity() int {
	return cap(q.data) - 1
}

func (q *LoopQueue) Enqueue(elem interface{}) {
	// 注意切片实际的容量是 capacity + 1，所以这里使用 cap(q.data) 而不是调用 GetCapacity 方法
	if ((q.tail + 1) % cap(q.data)) == q.front {
		// 扩容
		q.resize(q.GetCapacity() * 2)
	}

	if q.size <= len(q.data) {
		q.data = append(q.data, nil)
	}
	q.data[q.tail] = elem
	q.tail = (q.tail + 1) % cap(q.data)
	q.size++
}

func (q *LoopQueue) Dequeue() (elem interface{}, err error) {
	if q.size == 0 {
		err = errors.New("No element in queue")
		return
	}

	elem = q.data[q.front]
	q.data[q.front] = nil
	q.front = (q.front + 1) % cap(q.data)
	q.size--
	
	if q.size == q.GetCapacity() / 4 && q.GetCapacity() / 2 != 0 {
		q.resize(q.GetCapacity() / 2)
	}
	return
}

func (q *LoopQueue) GetFront() (elem interface{}, err error) {
	if q.size == 0 {
		err = errors.New("No element in queue")
		return
	}
	elem = q.data[q.front]
	return
}

func (q *LoopQueue) resize(newCapacity int) {
	newData := make([]interface{}, q.size, newCapacity + 1)

	for i := 0; i < q.size; i++ {
		newData[i] = q.data[(q.front + i) % cap(q.data)]
	}

	q.data = newData
	q.front = 0
	q.tail = q.size
}

func (q *LoopQueue) String() string {
	str := fmt.Sprintf("Queue: Size=%d, Capacity=%d\n", q.size, q.GetCapacity())
	str += "front ["
	for i := q.front; i != q.tail; i=(i+1)%cap(q.data) {
		str += fmt.Sprint(q.data[i])
		if ((i + 1) % cap(q.data)) != q.tail {
			str += ", "
		}
	}
	str += "]"
	return str
}