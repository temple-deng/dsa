package removeDuplicates

// done
// 给定一个排序数组，你需要在原地删除重复出现的元素，使得每个元素只出现一次，返回移除后数组的新长度
func removeDuplicates(nums []int) int {
	n := len(nums)
	if n == 0 {
		return 0
	}

	// [0, k-1] 是一个已经处理好的部分
	// [k, i-1] 是重复的元素部分
	// [i, n-1] 是未处理部分

	k := 1
	for i := 1; i < n; i++ {
		if nums[i] != nums[k-1] {
			nums[k], nums[i] = nums[i], nums[k]
			k++
		}
	}
	return k
}