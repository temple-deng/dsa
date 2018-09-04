package bubblesort

func BubbleSort(arr []int) {
	length := len(arr)

	for i := 0; i < length-1; i++ {
		for j := 0; j < length-1-i; j++ {
			if arr[j] > arr[j+1] {
				swap(arr, j, j+1)
			}
		}
	}
}

func swap(arr []int, i, j int) {
	temp := arr[j]
	arr[j] = arr[i]
	arr[i] = temp
}