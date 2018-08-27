package stack

import (
	"testing"
)

// 根据这个测试来看，数组栈的性能要优于链表栈
func BenchmarkArrayStack(b *testing.B) {
	for i := 0; i < b.N; i++ {
		var stack Stack
		stack, _ = NewArrayStack()
		
		for i := 0; i < 2000; i++ {
			stack.Push(0)
		}

		for i := 0; i < 2000; i++ {
			stack.Pop()
		}
	}
}

func BenchmarkLinkedListStack(b *testing.B) {
	for i := 0; i < b.N; i++ {
		var stack Stack
		stack = New()
		
		for i := 0; i < 2000; i++ {
			stack.Push(0)
		}

		for i := 0; i < 2000; i++ {
			stack.Pop()
		}
	}
}