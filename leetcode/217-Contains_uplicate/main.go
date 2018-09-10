package containsDuplicates

// 给定一个整数数组，判断是否存在重复元素。
// 如果任何值在数组中出现至少两次，函数返回 true。如果数组中每个元素都不相同，则返回 false
// map 的方案肯定是最简单的
func containsDuplicate(nums []int) bool {
	auxMap := make(map[int]int)
	
	n := len(nums)
	for i := 0; i < n; i++ {
			if auxMap[nums[i]] == 1 {
					return true
			}
			auxMap[nums[i]]++
	}
	return false
}