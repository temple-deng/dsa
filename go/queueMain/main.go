package main

import (
	"fmt"
	"../queue"
)

func main() {
	q, _ := queue.New(10)

	for i := 0; i < 10; i++ {
		q.Enqueue(i)
	}

	fmt.Println(q)    // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

	for i := 0; i < 5; i++ {
		q.Dequeue()
	}

	fmt.Println(q)    // [5, 6, 7, 8, 9]


	fmt.Println("-------------------Loop Queue----------------")

	var lq queue.Queue

	lq, _ = queue.NewLoopQueue(10)

	for i := 0; i < 11; i++ {
		lq.Enqueue(i)
	}

	fmt.Println(lq)
	fmt.Println(lq.GetSize())

	for i := 0; i < 5; i++ {
		lq.Dequeue()
	}

	fmt.Println(lq)
}