package queue

type Queue interface {
	Enqueue(elem interface{})
	Dequeue() (interface{}, error)
	GetFront() (interface{}, error)
	GetSize() int
	IsEmpty() bool
}