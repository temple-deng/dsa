package missingNumber

// undone
func missingNumber(nums []int) int {
	n := len(nums)
	sum := 0

	for i := 0; i < n; i++ {
		sum += nums[i]
	}

	// 这里有隐藏的 bug, n(n+1) 是可能溢出的
	// 甚至 sum 都是可能溢出的
	return n*(n+1) / 2 - sum
}