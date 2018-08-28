package sorttest

import (
	"testing"
	"../selectionsort"
	"math/rand"
)

func generateRandomArr(size int, min int, max int, seed int64) []int {
	rand.Seed(seed)
	arr := make([]int, size)
	for i := 0; i < size; i++ {
		arr[i] = rand.Int() % (max - min + 1) + min
	}
	return arr
}

func TestSelectionSort(t *testing.T) {
	arr := generateRandomArr(50, 0, 1000, 10)
	sortedArr := selectionsort.SelectionSort(arr)

	for i := 0; i < len(arr) - 1; i++ {
		if sortedArr[i] > sortedArr[i+1] {
			t.Error("Error")
		}
	}
}