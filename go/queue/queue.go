package queue

type Queue interface {
	Init(capacity int) error
	Enqueue(elem interface{})
	Dequeue() (interface{}, error)
	GetFront() (interface{}, error)
	GetSize() int
	IsEmpty() bool
}


func arrayQueueAdd() {
	q := &(ArrayQueue{})
	q.Init(10050)
	for i := 0; i < 10000; i++ {
		q.Enqueue(i)
		if (i+1) % 20 == 0 {
			q.Dequeue()
		}
	}
}

func loopQueueAdd() {
	lq := &(LoopQueue{})
	lq.Init(10050)
	for i:= 0; i < 10000; i++ {
		lq.Enqueue(i)
		if (i+1) % 20 == 0 {
			lq.Dequeue()
		}
	}
}