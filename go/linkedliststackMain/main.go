package main

import (
	"fmt"
	"../linkedliststack"
	"../stack"
)

func main() {
	var stk stack.Stack
	stk = linkedliststack.New()

	for i := 0; i < 10; i++ {
		stk.Push(i)
	}

	fmt.Println(stk)

	for i := 10; i < 20; i++ {
		stk.Push(i)

		if i % 3 == 0 {
			stk.Pop()
		}
	}

	fmt.Println(stk)

	top, _ := stk.Peek()
	fmt.Printf("Current Top is %v\n", top)
	
	stk.Pop()
	stk.Pop()
	stk.Pop()

	top, _ = stk.Peek()
	fmt.Printf("Current top is (after 3 pop operation): %v\n", top)
}