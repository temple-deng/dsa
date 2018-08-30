package linkedlist

import (
	"testing"
	"math/rand"
)

func BenchmarkCopy(b *testing.B) {
	list := New()
	rand.Seed(3)
	for i := 0; i < 10000; i++ {
		list.AddFirst(rand.Intn(1000))
	}

	for i := 0; i < b.N; i++ {
		list.Copy()
	}
}

func BenchmarkOptimizedCopy(b *testing.B) {
	list := New()
	rand.Seed(6)
	for i := 0; i < 10000; i++ {
		list.AddFirst(rand.Intn(1000))
	}

	for i := 0; i < b.N; i++ {
		list.OptimizedCopy()
	}
}