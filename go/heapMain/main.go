package main

import (
	"fmt"
	"../heap"
	"math/rand"
)

func main() {
	rand.Seed(2)
	h, _ := heap.New(50)
	for i := 0; i < 50; i++ {
		h.Add(rand.Intn(5000))
	}
	for i := 0; i < 50; i++ {
		max, _ := h.RemoveMax()
		fmt.Printf("%d  ", max)
	}

	fmt.Println()
	rand.Seed(3)
	var slice []int
	for i := 0; i < 50; i++ {
		slice = append(slice, rand.Intn(100))
	}
	fmt.Println(slice)
	h2, _ := heap.New(slice)
	for i := 0; i < 50; i++ {
		max, _ := h2.RemoveMax()
		fmt.Printf("%d  ", max)
	}
}