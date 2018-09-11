package main

import (
	"fmt"
	"math"
)

// 滑动窗口，这个题有点难了
func minSubArrayLen(s int, nums []int) int {
	n := len(nums)
	result := n+1
	sum := 0
	l, r := 0, -1

	for ; l < n; {
		if r+1 < n && sum < s {
			r++
			sum += nums[r]
		} else {
			sum -= nums[l]
			l++
		}

		if sum >= s {
			result = int(math.Min(float64(result), float64(r-l+1)))
		}
	}

	if result == n+1 {
		result = 0
	}
	return result
}

func main() {
	nums := []int{2, 3, 1, 2, 4, 3}
	fmt.Println(minSubArrayLen(7, nums))
}