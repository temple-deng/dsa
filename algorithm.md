# 排序

## 选择排序 Selection Sort

每次遍历找出一个最小值（或最大值），放到其该处于的位置。    

```go
func selectionSort(arr []int) []int {
	length := len(arr)
	for i := 0; i < length; i++ {
		minIndex := i
		for j := i + 1; j < length; j++ {
			if arr[j] < arr[minIndex] {
				minIndex = j
			}
		}

		if i != minIndex {
			temp := arr[i]
			arr[i] = arr[minIndex]
			arr[minIndex] = temp
		}
	}

	return arr
}
```    

+ 复杂度：O(n^2)    

## 插入排序 Insertion Sort

插扑克牌的方式。   

```go
func InsertionSort(arr []int) []int {
	length := len(arr)

	for i := 1; i < length; i++ {
		elem := arr[i]
		for j := i - 1; j >= 0 && elem < arr[j]; j-- {
			arr[j+1] = arr[j]
		}
		arr[i] = elem
	}

	return arr
}
```   

+ 复杂度：O(n^2)    


算法名称 | 类型 | 复杂度 | 额外存储空间 | 稳定排序 | 场合
---------|----------|---------|---------|---------|---------
 插入排序 | 比较排序 | O(n^2)，但是在有序数组中可以下降为 O(n) | 常量空间 | 稳定 | 数据集合小，且有序
 选择排序 | 比较排序 |O(n^2) | 常量空间 | 稳定 | 待定
 快排 | 比较排序 | 平均 O(nlogn)，最差 O(n^2) | 常量空间 | 不稳定 | 绝大多数场合
 归并排序 | 比较排序 | O(nlogn) | 这里地方好像不同的地方给的结果不一样，有的说是 2 倍，有的好像只有 1 倍 | 不稳定 | 超大数据集，且可能无法一次性在内存中放入所有数据的场合

## 希尔排序 Shell Sort

希尔排序是把数组按下标的一定增量分组，对每组使用直接插入排序算法排序；随着增量逐渐减少，每组
包含的元素个数越来越多，当增量减至1时，整个数组恰被分成一组，算法便终止。    




## 归并排序

对于一个具有 n 个元素的集合，通过 logn 次的二分，就可以将数据集合分成一个元素一个元素的
小集合，这样只要我们能将之后的归并过程复杂度控制在 O(n) 级别，则整个归并排序的复杂度
就可以控制在 O(nlogn) 级别。    


