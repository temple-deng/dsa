package main

import (
	"fmt"
)

// 给定两个数组，编写一个函数来计算它们的交集。
// nums1 = [1,2,2,1], nums2 = [2,2]
// [2, 2]
// 与 349 相比就是不要去重
func intersect(nums1 []int, nums2 []int) []int {
	freqMap := make(map[int]int)
	result := []int{}
	n1 := len(nums1)
	n2 := len(nums2)

	for i := 0; i < n1; i++ {
		freqMap[nums1[i]]++
	}

	for i := 0; i < n2; i++ {
		val := nums2[i]
		if freqMap[val] > 0 {
			result = append(result, val)
			freqMap[val]--
		}
	}
	return result
}

func main() {
	nums1 := []int{4, 9, 5}
	nums2 := []int{9, 4, 9, 8, 4}

	fmt.Println(intersect(nums1, nums2))
}