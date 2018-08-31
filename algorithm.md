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

这里详细说一下这里的循环，首先我们的 size 其实是每轮外循环时，内循环中 merge 操作要 merge
的元素个数，从 1 开始，代表第 1 轮外循环中的内循环的每次循环合并 1+1=2 个元素，然后每轮内循环
以 2size 的大小递增，2个2个 merge，第 2 轮的时候，size 增加一倍，依次类推。    

其次是临界值的取值，首先要确定的一点是，内循环的最后一轮是可能出现越界的情况的，一种情况是可能
合并的右边不足 size 个元素，另一种情况其实是一种优化的方案，就是如果合并的右边压根已经没了，
只剩待合并的左边或者左边的部分，那么我们也没有必要再 merge 了，因为它已经是一个有序的数组了。   

假设合并的右边刚好不存在，则 i + size - 1 = n - 1，这时候刚好只剩左边，这时开始就已经不用
再进行合并过程了，因此 i + size 最大可取值就是 n - 1，因此临界条件就是 i + sz &lt; n,
如果 i + sz 再大，说明只剩左边了，不用进行 merge 操作。    

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

因此我们改变一下分组循环的方式：   

**优化方案二：改变分组方式**   

```js
function partition(arr, l, r) {
  swap(arr, l, parseInt(Math.random() * 10000 % (r - l + 1)) + l);
  const pivot = arr[l];

  let lo = l + 1,
    hi = r;
  
  while(lo <= hi) {
    if (arr[lo] < pivot) {
      lo++;
    } else if (arr[hi] > pivot) {
      hi--;
    } else {
      swap(arr, lo, hi);
      lo++;
      hi--;
    }
  }

  swap(arr, l, lo - 1);
  return lo - 1;
}
```    

与归并排序一样，当我们递归到一个足够小的程度时，采用插入排序取代递归可能会获得更好的性能。   

## 总结

算法名称 | 类型 | 复杂度 | 额外存储空间 | 稳定排序 | 场合
---------|----------|---------|---------|---------|---------
 插入排序 | 比较排序 | O(n^2)，但是在有序数组中可以下降为 O(n) | O(1) | 稳定 | 数据集合小，且有序
 选择排序 | 比较排序 |O(n^2) | O(1) | 不稳定 | 待定
 快排 | 比较排序 | 平均 O(nlogn)，最差 O(n^2) | O(logn) 这里为什么是 logN | 不稳定 | 绝大多数场合
 归并排序 | 比较排序 | O(nlogn) | 这里地方好像不同的地方给的结果不一样，有的说是 2 倍，有的好像只有 1 倍 | 稳定的 | 超大数据集，且可能无法一次性在内存中放入所有数据的场合
 堆排序 | 比较排序 | O(nlogn) | O(1) | 不稳定 | 待定

使用排序算法来解决其他问题的思想是算法设计领域的基本技巧—— _归约_ 的一个例子。归约指的是为解决
某个问题而发明的算法正好可以解决另一个问题。    

+ 找出重复元素
+ 优先队列
+ 中位数（中间值，它不大于一半的元素又不小于另一半元素）