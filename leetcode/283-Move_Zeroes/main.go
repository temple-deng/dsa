package moveZeroes

// done
func moveZeroes(nums []int)  {
	n := len(nums)
	k := 0
	for i := 0; i < n; i++ {
		if nums[i] != 0 {
			if k != i {
				nums[k] = nums[i]
				nums[i] = 0
			}
			k++
		}
	}
}