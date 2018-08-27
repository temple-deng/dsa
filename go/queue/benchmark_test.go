package queue

import (
	"testing"
)

func BenchmarkArrayQueue(b *testing.B) {
	for i := 0; i < b.N; i++ {
		arrQueue, _ := NewArrayQueue()
		for i := 0; i < 1000; i++ {
			arrQueue.Enqueue(i)
		}
		for i := 0; i < 1000; i++ {
			arrQueue.Dequeue()
		}
	}
}


func BenchmarkLoopQueue(b *testing.B) {
	for i := 0; i < b.N; i++ {
		loopQueue, _ := NewLoopQueue()
		for i := 0; i < 1000; i++ {
			loopQueue.Enqueue(i)
		}
		for i := 0; i < 1000; i++ {
			loopQueue.Dequeue()
		}
	}
}

func BenchmarkLinkedListQueue(b *testing.B) {
	for i := 0; i < b.N; i++ {
		linkedListQueue := New()
		for i := 0; i < 1000; i++ {
			linkedListQueue.Enqueue(i)
		}
		for i := 0; i < 1000; i++ {
			linkedListQueue.Dequeue()
		}
	}
}