package queue

import (
	"fmt"
	"../myArray"
)

type ArrayQueue struct {
	data *myArray.Array
}

func NewArrayQueue(arg ...interface{}) (*ArrayQueue, error) {
	if len(arg) == 0 {
		arg = append(arg, 10)
	}
	data, err := myArray.NewArray(arg[0])
	return &(ArrayQueue{data}), err
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

// 注意这里有一点偷懒的地方就是 error 并没有做任何的修改，只是简单的把数组的错误再次返回了
func (q *ArrayQueue) Dequeue() (interface{}, error) {
	return q.data.RemoveFirst()
}

func (q *ArrayQueue) GetFront() (interface{}, error) {
	return q.data.Get(0)
}

func (q *ArrayQueue) String() string {
	str := "Queue: Front [ "
	size := q.GetSize()
	for i := 0; i < size; i++ {
		elem, _ := q.data.Get(i)
		str += fmt.Sprint(elem)
		if i != size - 1 {
			str += ", "
		}
	}
	str += " ] Tail"
	return str
}

