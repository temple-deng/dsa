package mergesort

import (
	// "fmt"
)

func MergeSort(arr []int) {
	mergeSort(arr, 0, len(arr) - 1)
}

func mergeSort(arr []int, l, r int) {
	if l >= r {
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

		// fmt.Println(temp)
	if i <= mid {
		for ; i <= mid; i++ {
			temp[k] = arr[i]
			k++
		}
	}

	if j <= r {
		for ; j <= r; j++ {
			temp[k] = arr[j]
			k++
		}
	}



	for i := 0; i < k; i++ {
		arr[i+l] = temp[i]
	}

	// fmt.Println(arr)
}