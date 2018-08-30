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

```go
// 第一个版本的归并排序
func MergeSort(arr []int) {
	mergeSort(arr, 0, len(arr) - 1)
}

func mergeSort(arr []int, l, r int) {
	if l >= r {
		return
	}

	mid := l + (r - l) / 2
	mergeSort(arr, l, mid)
	mergeSort(arr, mid+1, r)
	merge(arr, l, mid, r)
}

func merge(arr []int, l, mid, r int) {
	length := r - l + 1
	temp := make([]int, length)

	k := 0
	i := l
	j := mid + 1
	for ; i <= mid && j <= r; {
		if arr[i] < arr[j] {
			temp[k] = arr[i]
			i++
		} else {
			temp[k] = arr[j]
			j++
		}
		k++
	}

	for ; i <= mid; i++ {
		temp[k] = arr[i]
		k++
	}

	for ; j <= r; j++ {
		temp[k] = arr[j]
		k++
	}

	for i := 0; i < k; i++ {
		arr[i+l] = temp[i]
	}
}
```    

通常情况下，当我们递归到一定程度时，如果改用插入排序处理，性能会比上一个版本更好一点。   

```go
func MergeSort(arr []int) {
	mergeSort(arr, 0, len(arr) - 1)
}

func mergeSort(arr []int, l, r int) {
	if r - l <= 15 {
		insertionSort(arr, l, r)
		return
	}

	mid := l + (r - l) / 2
	mergeSort(arr, l, mid)
	mergeSort(arr, mid+1, r)
	merge(arr, l, mid, r)
}

func merge(arr []int, l, mid, r int) {
	length := r - l + 1
	temp := make([]int, length)

	k := 0
	i := l
	j := mid + 1
	for ; i <= mid && j <= r; {
		if arr[i] < arr[j] {
			temp[k] = arr[i]
			i++
		} else {
			temp[k] = arr[j]
			j++
		}
		k++
	}

	for ; i <= mid; i++ {
		temp[k] = arr[i]
		k++
	}

	for ; j <= r; j++ {
		temp[k] = arr[j]
		k++
	}

	for i := 0; i < k; i++ {
		arr[i+l] = temp[i]
	}
}

func insertionSort(arr []int, l, r int) {
	for i := l + 1; i <= r; i++ {
		value := arr[i]
		j := i
		for ; j > l && arr[j-1] < value; j-- {
			arr[j] = arr[j-1]
		}
		arr[j] = value
	}
}
```   

上面的都是自顶向下的归并排序算法。   

下面是自底向上的归并排序：   

```go
func MergeSortBU(arr []int) {
	length := len(arr)
	for sz := 1; sz < length; sz += sz {
		for i := 0; i + sz < length; i += sz + sz {
			merge(arr, i, i + sz - 1, int(math.Min(float64(i+sz+sz-1), float64(length-1))))
		}
	}
}
```   

## 快排

@TODO partition-1.png    

```js
function quickSort(arr) {
  $quickSort(arr, 0, arr.length - 1);
}

function $quickSort(arr, l, r) {
  if (l >= r) {
    return;
  }

  mid = partition(arr, l, r);
  $quickSort(arr, l, mid-1);
  $quickSort(arr, mid+1, r);
}

/**
 * 分区，arr[l, mid - 1] < arr[mid] <= arr[mid+1, r]
 * @param {array} arr 原数组
 * @param {int} l 分区左边界
 * @param {int} r 分区右边界
 * @return {int} mid
 */
function partition(arr, l, r) {
  // 最基本的情况下，选择最左边的元素做基准值
  const pivot = arr[l];

  let j = l;
  // arr[l+1, j] 是小于 pivot 的元素
  // arr[j+1, r] 是大于 pivot 的元素
  for(let i = l+1; i <= r; i++) {
    if (arr[i] < pivot) {
      swap(arr, j+1, i);
      j++;
    }
  }
  swap(arr, l, j);
  return j;
}

function swap(arr, i, j) {
  const temp = arr[j];
  arr[j] = arr[i];
  arr[i] = temp;
}
```    

最基本的情况下，我们每次取分区的最左侧元素作为基准值。   

**优化方案一：随机取 pivot 值**    

```js
  swap(arr, l, Math.random() * 1000 % (r-l+1) + l);
	const pivot = arr[l];
```    

但是此时快排仍有一个问题，当数据集合中有大量的重复元素时，划分时仍有可能划分的极度不平衡，
此时的算法复杂度就又向 O(n^2) 靠拢了。    