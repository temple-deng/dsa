package main

import (
	"fmt"
)

func selectSort(arr []int) []int {
	length := len(arr)
	for i := 0; i < length; i++ {
		minIndex := i
		for j := i + 1; j < length; j++ {
			if arr[j] < arr[minIndex] {
				minIndex = j
			}
		}

		if i != minIndex {
			temp := arr[i]
			arr[i] = arr[minIndex]
			arr[minIndex] = temp
		}
	}

	return arr
}

func main() {
	arr1 := []int{1, 2, 3, 4, 5, 6, 7, 8}
	arr2 := []int{9, 8, 7, 6, 5, 4, 3, 2, 1}
	arr3 := []int{100, 50, 70, 12, 49, 89, 23, 50, 25}

	fmt.Println(selectSort(arr1))
	fmt.Println(selectSort(arr2))
	fmt.Println(selectSort(arr3))
}