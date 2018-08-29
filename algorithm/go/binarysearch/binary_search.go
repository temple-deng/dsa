package binarysearch

func BinarySearch(arr []int, elem int) int {
	low := 0
	high := len(arr) - 1

	for ;low <= high; {
		midIndex := (low + high) / 2
		guess := arr[midIndex]
		if guess == elem {
			return midIndex
		} else if guess < elem {
			low = midIndex + 1
		} else {
			high = midIndex - 1
		}
	}

	return -1
}
