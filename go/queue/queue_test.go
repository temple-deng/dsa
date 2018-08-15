package queue

import (
	"testing"
)

func BenchmarkAddTest(b *testing.B) {
	for i := 0; i < b.N; i++ {
		arrayQueueAdd()
	}
}

// 奇怪，单纯入队操作，循环队列的性能总是比数组队列更差的
func BenchmarkLoopAddTest(b *testing.B) {
	for i := 0; i < b.N; i++ {
		loopQueueAdd()
	}
}