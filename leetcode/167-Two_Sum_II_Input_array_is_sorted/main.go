package twoSum

// 给定一个已按照升序排列 的有序数组，找到两个数使得它们相加之和等于目标数。
// 函数应该返回这两个下标值 index1 和 index2，其中 index1 必须小于 index2
// 返回的下标值（index1 和 index2）不是从零开始的
// 首先给一种 map 的方案
func twoSum(numbers []int, target int) []int {
	// 键为元素值，值为元素索引
	auxMap := make(map[int]int)

	n := len(numbers)

	for i := 0; i < n; i++ {
		diff := target - numbers[i]
		if index, ok := auxMap[diff]; ok {
			return []int{index+1, i+1}
		} else {
			auxMap[numbers[i]] = i
		}
	}
	return nil
}


// 双路指针的方案
func twoSum1(numbers []int, target int) []int {
	n := len(numbers)
	l := 0
	r := n-1

	for ; l < r; {
		sum := numbers[l] + numbers[r]
		if sum < target {
			l++
		} else if sum > target {
			r--
		} else {
			return []int{l+1, r+1}
		}
	}
	return nil
}
