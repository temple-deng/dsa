package sorttest

import (
	"testing"
	"../selectionsort"
	"../insertionsort"
)

func BenchmarkSelectionSort(b *testing.B) {
	arr := generateRandomArr(50, 0, 1000)
	for i := 0; i < b.N; i++ {
		selectionsort.SelectionSort(arr)
	}
}

func BenchmarkInsertionSort(b *testing.B) {
	arr := generateRandomArr(50, 0, 1000)
	for i := 0; i < b.N; i++ {
		insertionsort.InsertionSort(arr)
	}
}