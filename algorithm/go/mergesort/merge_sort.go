package mergesort

import (
	"math"
	// "fmt"
)

func MergeSort(arr []int) {
	mergeSort(arr, 0, len(arr) - 1)
}

func mergeSort(arr []int, l, r int) {
	if r - l <= 15 {
		insertionSort(arr, l, r)
		return
	}

	mid := l + (r - l) / 2
	mergeSort(arr, l, mid)
	mergeSort(arr, mid+1, r)
	merge(arr, l, mid, r)
}

func merge(arr []int, l, mid, r int) {
	length := r - l + 1
	temp := make([]int, length)

	k := 0
	i := l
	j := mid + 1
	for ; i <= mid && j <= r; {
		if arr[i] < arr[j] {
			temp[k] = arr[i]
			i++
		} else {
			temp[k] = arr[j]
			j++
		}
		k++
	}

	for ; i <= mid; i++ {
		temp[k] = arr[i]
		k++
	}

	for ; j <= r; j++ {
		temp[k] = arr[j]
		k++
	}

	for i := 0; i < k; i++ {
		arr[i+l] = temp[i]
	}
}

func insertionSort(arr []int, l, r int) {
	for i := l + 1; i <= r; i++ {
		value := arr[i]
		j := i
		for ; j > l && arr[j-1] < value; j-- {
			arr[j] = arr[j-1]
		}
		arr[j] = value
	}
}


func MergeSortBU(arr []int) {
	length := len(arr)
	for sz := 1; sz < length; sz += sz {
		for i := 0; i + sz < length; i += sz + sz {
			merge(arr, i, i + sz - 1, int(math.Min(float64(i+sz+sz-1), float64(length-1))))
		}
	}
}