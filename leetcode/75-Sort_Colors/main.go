package sortColors

// done
// 给定一个包含红色、白色和蓝色，一共 n 个元素的数组，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列
// 利用三路快排的思路
func sortColors(nums []int) {
	n := len(nums)

	l := 0
	r := n

	for i := 0; i < r; {
		switch nums[i] {
		case 0:
			nums[l], nums[i] = nums[i], nums[l]
			i++
			l++
		case 1:
			i++
		case 2:
			r--
			nums[r], nums[i] = nums[i], nums[r]
		}
	}
}

// 利用计数排序的思路
func sortColors1(nums []int) {
	count := make([]int, 3)
	n := len(nums)

	for i := 0; i < n; i++ {
		count[nums[i]]++
	}
	
	index := 0
	for i := 0; i < count[0]; i++ {
		nums[index] = 0
		index++
	}

	for i := 0; i < count[1]; i++ {
		nums[index] = 1
		index++
	}

	for i := 0; i < count[2]; i++ {
		nums[index] = 2
		index++
	}
}