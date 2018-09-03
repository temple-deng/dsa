package quicksort

import (
	"time"
	"math/rand"
)

func QuickSort(arr []int) {
	quickSort(arr, 0, len(arr) - 1)
}

func quickSort(arr []int, l, r int) {
	if l >= r {
		return
	}

	mid := partition(arr, l, r)
	quickSort(arr, l, mid-1)
	quickSort(arr, mid+1, r)
}

func partition(arr []int, l, r int) int {
	rand.Seed(time.Now().Unix())
	swap(arr, l, rand.Int() % (r-l+1) + l)

	pivot := arr[l]
	lo := l + 1
	hi := r

	for {
		for ; lo <= r && arr[lo] < pivot; lo++ {}
		for ; hi >= l+1 && arr[hi] > pivot; hi-- {}
		if lo > hi {
			break
		}
		swap(arr, lo, hi)
		lo++
		hi--
	}

	swap(arr, l, lo-1)
	return lo-1
}

func swap(arr []int, i, j int) {
	temp := arr[j]
	arr[j] = arr[i]
	arr[i] = temp
}