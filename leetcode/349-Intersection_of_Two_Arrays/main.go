package main

import (
	"fmt"
)

// 给定两个数组，编写一个函数来计算它们的交集
// map 的方案，理论上使用 set 即可，但 Go 中没提供 set 结构
// 其实还可以更简单点
func intersection(nums1 []int, nums2 []int) []int {
	auxMap := make(map[int]int)

	n1 := len(nums1)
	n2 := len(nums2)

	for i := 0; i < n1; i++ {
		auxMap[nums1[i]] = 0
	}

	result := []int{}
	for i := 0; i < n2; i++ {
		val := nums2[i]
		if freq, ok := auxMap[val]; ok {
			if freq == 0 {
				result = append(result, val)
				auxMap[val]++
			}
		}
	}
	return result
}

func main() {
	nums1 := []int{1, 2, 2, 1}
	nums2 := []int{2, 2}
	fmt.Println(intersection(nums1, nums2))
}