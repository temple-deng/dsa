package mergeSortedArray

// 给定两个有序整数数组 nums1 和 nums2，将 nums2 合并到 nums1 中
// 使得 num1 成为一个有序数组

func merge(nums1 []int, m int, nums2 []int, n int)  {
	aux := make([]int, m+n)

	i, j, k := 0, 0, 0

	for ; i < m && j < n; {
		if nums1[i] < nums2[j] {
			aux[k] = nums1[i]
			k++
			i++
		} else {
			aux[k] = nums2[j]
			k++
			j++
		}
	}

	for ; i < m; i++ {
		aux[k] = nums1[i]
		k++
	}

	for ; j < n; j++ {
		aux[k] = nums2[j]
		k++
	}

	for i := 0; i < m+n; i++ {
		nums1[i] = aux[i]
	}
}