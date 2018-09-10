package containsDuplicate2

// done
// 给定一个整数数组和一个整数 k，判断数组中是否存在两个不同的索引 i 和 j，
// 使得 nums [i] = nums [j]，并且 i 和 j 的差的绝对值最大为 k。
// 还是 map 的方案比较简单
func containsNearbyDuplicate(nums []int, k int) bool {
	auxMap := make(map[int]int)
	n := len(nums)
	for i := 0; i < n; i++ {
			if index, ok := auxMap[nums[i]]; ok {
					if i - index <= k {
							return true
					}
					auxMap[nums[i]] = i
			} else {
					auxMap[nums[i]] = i
			}
	}
	return false
}