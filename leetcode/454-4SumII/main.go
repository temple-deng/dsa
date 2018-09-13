package main

import (
	"fmt"
)

// 给定四个包含整数的数组列表 A , B , C , D ,计算有多少个元组 (i, j, k, l) 
// 使得 A[i] + B[j] + C[k] + D[l] = 0

func fourSumCount(A []int, B []int, C []int, D []int) int {
	n := len(A)

	cdMap := make(map[int]int)
	count := 0

	for i := 0; i < n; i++ {
		for j := 0; j < n; j++ {
			sum := C[i] + D[j]
			cdMap[sum]++
		}
	}

	for i := 0; i < n; i++ {
		for j := 0; j < n; j++ {
			complement := -A[i]-B[j]
			if c, ok := cdMap[complement]; ok {
				count += c
			}
		}
	}

	return count
}

func main() {
	A := []int{1, 2}
	B := []int{-2, -1}
	C := []int{-1, 2}
	D := []int{0, 2}
	fmt.Println(fourSumCount(A, B, C, D))   // 2
}