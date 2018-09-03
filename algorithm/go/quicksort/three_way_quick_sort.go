package quicksort

import (
	"math/rand"
	"time"
)

func ThreeWayQuickSort(arr []int) {
	threeWayQuickSort(arr, 0, len(arr) - 1)
}

func threeWayQuickSort(arr []int, l, r int) {
	if l >= r {
		return
	}

	lt, gt := threeWayPartition(arr, l, r)
	threeWayQuickSort(arr, l, lt)
	threeWayQuickSort(arr, gt, r)
}

// 三路快排的划分
// [l, lt-1] 小于 pivot [lt, gt-1] 等于 pivot, [gt, r] 大于 pivot
func threeWayPartition(arr []int, l, r int) (int, int) {
	rand.Seed(time.Now().Unix())
	swap(arr, l, rand.Int() % (r-l+1) + l)

	pivot := arr[l]
	lt := l
	gt := r+1
	
	// 整个遍历过程中，[l+1, lt] 是小于 pivot 的部分
	// [lt+1, i] 是等于 pivot 的部分
	// [i+1, gt-1] 是还没有遍历到的部分
	// [gt, r] 是大于 pivot 的部分
	// 这样其实 lt, gt 的初始值就比较好判断了
	for i := l+1; i < gt; {
		if arr[i] < pivot {
			swap(arr, lt+1, i)
			lt++
			i++
		} else if arr[i] > pivot {
			swap(arr, gt-1, i)
			// 一定要注意这里， i 是不需要 ++ 的，极易出错
			gt--
		} else {
			i++
		}
	}

	// 遍历完后，lt 是最后一个小于 pivot 的元素
	swap(arr, l, lt)
	return lt-1, gt
}