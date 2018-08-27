package main

import (
	"fmt"
	"../../go/stack"
)

func main() {
	var stk stack.Stack
	stk, _ = stack.New(10)
	stk.Push(1)
	stk.Push(2)
	stk.Push(3)

	fmt.Printf("After push 1, 2, 3: %s\n", stk)   // [3, 2, ,1]

	elem, _ := stk.Peek()   // 3
	fmt.Printf("Current top element: %v\n", elem)
	elem, _ = stk.Pop()    
	fmt.Printf("After 1 pop, stack: %s\n", stk)

	fmt.Println("Using arr [10, 20, 30, 40, 50] init a stack")

	stk, _ = stack.New([]int{10, 20, 30, 40, 50})
	fmt.Printf("Current stack: %s\n", stk)   // [50, 40, 30, 20, 10]

	// valid parentheses
	ok := validateParentheses("{[([])]}")
	fmt.Println(ok)
	ok = validateParentheses("{[]}]")
	fmt.Println(ok)
	ok = validateParentheses("(){}[]")
	fmt.Println(ok)
}

/**
 * 括号匹配校验函数
 */
func validateParentheses(str string) bool {
	runes := ([]rune)(str)
	length := len(runes)
	var s stack.Stack
	s, _ = stack.New(length)

	i := 0
	Loop:
	for ; i < length; i++ {
		switch runes[i] {
		case '{':
				fallthrough
		case '[':
				fallthrough
		case '(':
			s.Push(runes[i])
		case ')':
			pare, err := s.Peek()
			if err != nil {
				break Loop
			} else {
				if pare == '(' {
					s.Pop()
				} else {
					break Loop
				}
			}
		case ']':
			pare, err := s.Peek()
			if err != nil {
				break Loop
			} else {
				if pare == '[' {
					s.Pop()
				} else {
					break Loop
				}
			}
		case '}':
			pare, err := s.Peek()
			if err != nil {
				break Loop
			} else {
				if pare == '{' {
					s.Pop()
				} else {
					break Loop
				}
			}
		}
	}

	if i == length {
		if s.IsEmpty() {
			return true
		} else {
			return false
		}
	}

	return false
}