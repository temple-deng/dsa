package queue

type Queue interface {
	Enqueue(elem interface{})
	Dequeue() (interface{}, error)
	GetFront() (interface{}, error)
	GetSize() int
	IsEmpty() bool
}


func arrayQueueAdd() {
	q, _ := New(10050)
	for i := 0; i < 10000; i++ {
		q.Enqueue(i)
		if (i+1) % 20 == 0 {
			q.Dequeue()
		}
	}
}

func loopQueueAdd() {
	lq, _ := NewLoopQueue(10050)
	for i:= 0; i < 10000; i++ {
		lq.Enqueue(i)
		if (i+1) % 20 == 0 {
			lq.Dequeue()
		}
	}
}