package main

import (
	"fmt"
	"../linkedlist"
)

func main() {
	ll := linkedlist.LinkedList{}

	for i := 0; i < 10; i++ {
		if i % 2 == 0 {
			ll.AddFirst(i)
		} else {
			ll.AddLast(i)
		}
	}

	fmt.Println(&ll)
}