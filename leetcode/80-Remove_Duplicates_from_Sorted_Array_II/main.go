package removeDuplicates2

// done
// 给定一个排序数组，你需要在原地删除重复出现的元素，使得每个元素最多出现两次，返回移除后数组的新长度
func removeDuplicates(nums []int) int {
	n := len(nums)
	
	if n < 2 {
		return n
	}

	k := 2
	for i := 2; i < n; i++ {
		if nums[i] != nums[k-2] {
			if k != i {
				nums[k], nums[i] = nums[i], nums[k]
			}
			k++
		}
	}
	return k
}