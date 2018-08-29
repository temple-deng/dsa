package quicksort

func QuickSort(arr []int) []int {
	length := len(arr)

	if length < 2 {
		return arr
	}

	pivot := arr[length-1]
	var left, right []int

	for i := 0; i < length-1; i++ {
		if arr[i] < pivot {
			left = append(left, arr[i])
		} else {
			right = append(right, arr[i])
		}
	}

	return append(append(QuickSort(left), pivot), QuickSort(right)...)
}
