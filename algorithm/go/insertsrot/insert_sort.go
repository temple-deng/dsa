package main

import (
	"fmt"
)

func insertSort(arr []int) []int {
	length := len(arr)

	for i := 1; i < length; i++ {
		elem := arr[i]
		j := i - 1
		for ; j >= 0 && elem < arr[j]; j-- {
			arr[j+1] = arr[j]
		}
		arr[j+1] = elem
	}

	return arr
}

func main() {
	arr1 := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
	arr2 := []int{10, 9, 8, 7, 6, 5, 4, 3, 2, 1}
	arr3 := []int{1, 3, 2, 5, 9, 6, 12, 34, 23, 56, 34, 7, 24}

	fmt.Println(insertSort(arr1))
	fmt.Println(insertSort(arr2))
	fmt.Println(insertSort(arr3))
}