package sorttest

import (
	"testing"
	"../bubblesort"
	"../selectionsort"
	"../insertionsort"
	"../mergesort"
	"../quicksort"
	"math/rand"
	"time"
)

func generateRandomArr(size int, min int, max int) []int {
	rand.Seed(time.Now().Unix())
	arr := make([]int, size)
	for i := 0; i < size; i++ {
		arr[i] = rand.Int() % (max - min + 1) + min
	}
	return arr
}

func TestBubbleSort(t *testing.T) {
	arr := generateRandomArr(50, 0, 1000)
	bubblesort.BubbleSort(arr)

	for i := 0; i < len(arr) - 1; i++ {
		if arr[i] > arr[i+1] {
			t.Error("Error")
		}
	}
}

func TestSelectionSort(t *testing.T) {
	arr := generateRandomArr(50, 0, 1000)
	sortedArr := selectionsort.SelectionSort(arr)

	for i := 0; i < len(arr) - 1; i++ {
		if sortedArr[i] > sortedArr[i+1] {
			t.Error("Error")
		}
	}
}

func TestInsertionSort(t *testing.T) {
	arr := generateRandomArr(50, 0, 1000)
	sortedArr := insertionsort.InsertionSort(arr)
	for i := 0; i < len(arr) - 1; i++ {
		if sortedArr[i] > sortedArr[i+1] {
			t.Error("Error")
		}
	}
}

func TestMergeSort(t *testing.T) {
	arr := generateRandomArr(50, 0, 1000)
	mergesort.MergeSort(arr)
	for i := 0; i < len(arr) - 1; i++ {
		if arr[i] > arr[i+1] {
			t.Error("Error")
		}
	}
}

func TestQuickSort(t *testing.T) {
	arr := generateRandomArr(50, 0, 1000)
	quicksort.QuickSort(arr)
	for i := 0; i < len(arr) - 1; i++ {
		if arr[i] > arr[i+1] {
			t.Error("Error")
		}
	}
}

func TestThreeWayQuickSort(t *testing.T) {
	arr := generateRandomArr(50, 0, 1000)
	quicksort.ThreeWayQuickSort(arr)
	for i := 0; i < len(arr) - 1; i++ {
		if arr[i] > arr[i+1] {
			t.Error("Error")
		}
	}
}