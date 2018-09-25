package main

import (
	"fmt"
)

func main() {
	arr := [][]int{
		[]int{1, 2, 8, 9},
		[]int{2, 4, 9, 12},
		[]int{4, 7, 10, 13},
		[]int{6, 8, 11, 15},
	}

	fmt.Println(find(arr, 7))
	fmt.Println(find(arr, 5))
}

func find(matrix [][]int, key int) bool {
	rows := len(matrix)
	if rows == 0 {
		return false
	}

	columns := len(matrix[0])
	if columns == 0 {
		return false
	}

	row := 0
	column := columns - 1
	for ; row < rows && column >= 0; {
		if matrix[row][column] == key {
			return true
		} else if matrix[row][column] > key {
			column--
		} else {
			row++
		}
	}

	return false
}