package removeEle

// done
// 给定一个数组 nums 和一个值 val，你需要原地移除所有数值等于 val 的元素，返回移除后数组的新长度
func removeElement(nums []int, val int) int {
	n := len(nums)

	// 这个和移除 0 那个没什么区别啊
	// [0, k-1] 移除后的
	// [k, i-1] == val
	// [i, n-1] 待探索的
	k := 0
	for i := 0; i < n; i++ {
		if nums[i] != val {
			if i != k {
				nums[k], nums[i] = nums[i], 0
			}
			k++
		}
	}
	return k
}