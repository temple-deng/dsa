package main

import (
	"fmt"
	"../stack"
)

func main() {
	// var stk stack.Stack
	// stk = &(stack.ArrayStack{})
	// stk.Init(5)
	// stk.Push(1)
	// fmt.Println(stk)   // [1]

	// stk.Push(2)
	// stk.Push(3)
	// elem, _ := stk.Peek()   // 3
	// fmt.Println(elem)
	// fmt.Println(stk)    // [1, 2, 3]
	
	// elem, _ = stk.Pop()    
	// fmt.Println(elem)   // 3
	// fmt.Println(stk)   // [1, 2]

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
	s = &(stack.ArrayStack{})
	s.Init(length)

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