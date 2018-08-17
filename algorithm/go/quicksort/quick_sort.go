package main

import (
	"fmt"
)

func quickSort(arr []int) []int {
	length := len(arr)

	if length < 2 {
		return arr
	}

	pivot := arr[length-1]
	var left, right []int

	for i := 0; i < length-1; i++ {
		if arr[i] < pivot {
			left = append(left, arr[i])
		} else {
			right = append(right, arr[i])
		}
	}

	return append(append(quickSort(left), pivot), quickSort(right)...)
}

func main() {
	arr1 := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
	arr2 := []int{10, 9, 8, 7, 6, 5, 4, 3, 2, 1}
	arr3 := []int{1, 3, 2, 5, 9, 6, 12, 34, 23, 56, 34, 7, 24}

	fmt.Println(quickSort(arr1))
	fmt.Println(quickSort(arr2))
	fmt.Println(quickSort(arr3))
}