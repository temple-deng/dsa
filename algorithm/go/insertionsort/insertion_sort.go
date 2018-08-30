package insertionsort

func InsertionSort(arr []int) []int {
	length := len(arr)
	for i := 1; i < length; i++ {
		elem := arr[i]
		j := i - 1
		for ; j >= 0 && elem < arr[j]; j-- {
			arr[j+1] = arr[j]
		}
		arr[j+1] = elem
	}

	return arr
}
