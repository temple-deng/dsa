package main

import (
	"../queue"
	"../linkedlistqueue"
	"fmt"
)

func main() {
	var lq queue.Queue

	lq = linkedlistqueue.New()

	for i := 0; i < 10; i++ {
		lq.Enqueue(i)
	}

	fmt.Println(lq)

	for i := 0; i < 5; i++ {
		lq.Dequeue()
	}

	fmt.Println(lq)

	front, _ := lq.GetFront()
	fmt.Printf("Current queue front is: %v\n", front)
}