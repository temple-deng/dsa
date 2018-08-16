package queue

import (
	"fmt"
	"../myArray"
)

type ArrayQueue struct {
	data *myArray.Array
}

func New(capacities ...int) (*ArrayQueue, error) {
	capacity := capacities[0]
	data, err := myArray.NewArray(capacity)
	return &(ArrayQueue{data: data,}), err
}

func (q *ArrayQueue) GetSize() int {
	return q.data.GetLength()
}

func (q *ArrayQueue) IsEmpty() bool {
	return q.data.IsEmpty()
}

func (q *ArrayQueue) Enqueue(elem interface{}) {
	q.data.AddLast(elem)
}

func (q *ArrayQueue) Dequeue() (interface{}, error) {
	return q.data.RemoveFirst()
}

func (q *ArrayQueue) GetFront() (interface{}, error) {
	return q.data.Get(0)
}

func (q *ArrayQueue) String() string {
	str := "Queue: Front [ "
	size := q.GetSize()
	for i := 0; i < size - 1; i++ {
		elem, _ := q.data.Get(i)
		str += fmt.Sprint(elem) + ", "
	}

	if size != 0 {
		elem, _ := q.data.Get(size - 1)
		str += fmt.Sprint(elem)
	}

	str += " ] Tail"
	return str
}

