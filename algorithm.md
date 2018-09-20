# 算法课程笔记

<!-- TOC -->

- [算法课程笔记](#算法课程笔记)
- [排序](#排序)
  - [选择排序 Selection Sort](#选择排序-selection-sort)
  - [插入排序 Insertion Sort](#插入排序-insertion-sort)
  - [希尔排序 Shell Sort](#希尔排序-shell-sort)
  - [归并排序](#归并排序)
  - [快排](#快排)
  - [总结](#总结)
- [搜索](#搜索)
  - [序列搜索](#序列搜索)
    - [分而治之的搜索](#分而治之的搜索)
    - [信息复用](#信息复用)
      - [Boyer-Moore 众数问题(majority number)](#boyer-moore-众数问题majority-number)
      - [最大子序列和](#最大子序列和)
      - [KMP](#kmp)
- [课程内容](#课程内容)
  - [算法面试](#算法面试)
  - [数组的问题](#数组的问题)
    - [例题](#例题)
      - [283.移动零](#283移动零)
      - [75.颜色分类](#75颜色分类)
      - [67.两数之和II - 有序数组](#67两数之和ii---有序数组)
      - [209.长度最小的子数组](#209长度最小的子数组)
  - [查找问题](#查找问题)
    - [例题](#例题-1)
      - [454-四数相加](#454-四数相加)
      - [447.回旋镖的数量](#447回旋镖的数量)
  - [递归和回溯法](#递归和回溯法)
    - [例题](#例题-2)
      - [17-字母排列](#17-字母排列)
      - [46-全排列](#46-全排列)
      - [77-组合](#77-组合)

<!-- /TOC -->

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

**优化方案二：改变分组方式，也叫双路快排**   

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
 快排 | 比较排序 | 平均 O(nlogn)，最差 O(n^2) | O(logn) 这里的 logn 是递归的栈空间 | 不稳定 | 绝大多数场合
 归并排序 | 比较排序 | O(nlogn) | 这里地方好像不同的地方给的结果不一样，有的说是 2 倍，有的好像只有 1 倍 | 稳定的 | 超大数据集，且可能无法一次性在内存中放入所有数据的场合
 堆排序 | 比较排序 | O(nlogn) | O(1) | 不稳定 | 待定

使用排序算法来解决其他问题的思想是算法设计领域的基本技巧—— _归约_ 的一个例子。归约指的是为解决
某个问题而发明的算法正好可以解决另一个问题。    

+ 找出重复元素
+ 优先队列
+ 中位数（中间值，它不大于一半的元素又不小于另一半元素）

# 搜索

## 序列搜索

### 分而治之的搜索

**k 选择问题**    

在 n 个元素中寻找第 k 小的元素。我们可以使用分而治之的方法来解决这一问题。如果将全部元素
划分为两个子序列 A 和 B ,使得 A 中的全部元素都小于等于 B 中的任何元素,我们就可按照
下面的方法减小问题的规模:   

1. 比较子序列 A 的长度和 k 的大小
2. 若 k &lt; |A|，则第 k 小的元素必然在 A 中，我们可以丢弃子序列 A，然后在 A 中进一步查找
3. 如果 |A| &lt; k，则第 k 小的元素必然在 B 中，我们可以丢弃子序列 A，然后在 B 中进一步
查找第 (k - |A|) 小的元素     

这样的复杂度最后是 O(n)，这样想，最好的情况下，我们第一次划分就找到了，那就是 O(n) 复杂度
的扫描时间，最差情况下，每次的划分都比较失衡。则可能出现 O(kn) 或 O((n-k)n) 的复杂度。   

但是正常情况下，我们几乎都可以对半划分，那就需要 O(lgn) 次划分，之后划分的时间和不断减半
的序列长度成正比，整个时间求和也是 O(n)。   

### 信息复用

#### Boyer-Moore 众数问题(majority number)   

假设某个小岛上的国家要通过投票选出新的总统。这个国家的宪法规定,只有赢得半数以上选票的人才
可以成为总统。从一个投票结果的序列,例如A, B, A, C, B, B, D, ...我们能否找到一种高效的
方法,得知谁当选了总统,或者没有任何人赢得半数以上的选票。    

使用 map 的方案，时间复杂度是 O(n) + O(m) = O(n)，空间复杂度是一个 O(m)。    

Boyer和Moore在1980年发现了一种巧妙的方法,如果存在超过半数的元素,可以只扫描一遍就找到它。
并且这一方法只需要 O(1) 的空间。    

首先我们记录第一张选票投给的候选人为目前的获胜者,所赢得票数为1。在接下来的扫描中,若下一张
选票还投给目前的获胜者,就将获胜者的票数加1;否则,下一张选票没有投给目前的获胜者,我们将获胜者
的赢得的票数减1。若获胜者的净赢得的票数变为0,说明他不再是获胜者了,我们选择下一张
选票上的候选人作为新的获胜者,并继续重复这一扫描过程。    

这里关键的一点是:若存在一个超过50%的众数,则它不可能被其它元素超越落选。但是,如果没有任何
候选者赢得半数以上的选票,则最后所记录的“获胜者”并无意义。此时需要再进行一轮扫描进行验证。    

```js
function majority(arr) {
  if (arr.length === 0) {
    throw new Error("Empty error");
  }

  let winner = arr[0];
  let count = 1;
  for (let i = 1; i < arr.length; i++) {
    if (count === 0) {
      winner = arr[i];
      count++;
    } else {
      if (arr[i] === winner) {
        count++;
      } else {
        count--;
      }
    }
  }

  count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === winner) {
      count++;
    }
  }

  if (arr.length / 2 < count) {
    return winner;
  }
  return -1;
}
```    

#### 最大子序列和    

穷举法没有复用任何此前已经计算出的结果。借鉴Boyer-Moore众数算法的思路,我们可以一边扫描,
一边记录下以当前位置结尾的子序列的最大和。同时我们还需要记录下目前为止所找到的最大和。    

在任何时候,当我们扫描到第 i 个位置时,目前找到的最大和记为 A 。同时,
我们记录下以 i 结尾的子序列的最大和为 B 。 A 和 B 并不一定相等,实际上,我
们总保持 B ≤ A 的关系。当 B 和下一个元素相加,从而超过 A 时,我们就用这个
更大的结果替换 A 。当 B 加上下一个元素后,变为负数时,我们将 B 重新设置为
0。    

```js
function maxSum(arr) {
  let a = 0,
    b = 0;
  for (let i = 0; i < arr.length; i++) {
    b = Math.max(b + arr[i], 0);
    a = Math.max(a, b);
  }

  return a;
}
```    

就这么简单？？？？？    

#### KMP

简洁起见,我们记文本 T 中的前 k 个字符组成的串为 T<sub>k</sub> 即 T<sub>k</sub> 为文本 T
的 k 个字符前缀。    

为了把 P（这里 P 是要匹配的字符串）高效向右移动 s 个位置,我们需要定义一个关于 q 的函数,
其中 q 是成功匹配的字符个数。例如在图14.12 (a)中, q 的值为4,即第5个字符不匹配。   

什么情况下向右移动的距离 s 可以大于 1 呢?如图14.13所示,若可以将 P 向右移动,则一定存在某个 k,
使得 P 中的前 k 个字符和前缀 P<sub>p</sub> 的最后 k 个字符相同。也就是说,前缀 P<sub>k</sub>
同时是 P<sub>q</sub> 的后缀。     

当然有可能不存在同时也是后缀的前缀。如果我们认为空串同时是任何其他
字符串的前缀和后缀,则总存在一个解 k = 0 。如果存在多个 k 满足,为了避免
漏掉任何可能的候选位置,我们需要找到同时既是前缀又是后缀的最大的 k 。我
们定义一个前缀函数 π(q) ,它告诉我们当第 q + 1 个字符不匹配时应该回退的位置。   

@TODO


# 课程内容

## 算法面试

针对一个排序问题，我们应该考虑以下的基本问题，来决定采用哪一种排序算法：   

+ 数据中是否含有大量的重复元素，如果有，可能三路快排是比较好的方案
+ 数据是否已经近乎有序，如果是，插入排序也许是比较好的方案
+ 数据的取值范围是否是有限已知的，如果是，计数排序也许更好
+ 对排序是否有额外的要求，比如稳定排序，如果是，归并排序也许是更好的选择    

**数据规模的概念**    

如果想要在 1s 之内解决问题：   

+ O(n^2) 的算法可以处理大约 10^4 级别的数据
+ O(n) 级别的算法可以处理大约 10^8 级别的数据
+ O(nlong) 级别的算法可以处理大约 10^7 级别的数据   

## 数组的问题

数组的问题可能经常要用到，双指针，对撞指针，以及在可能的情况下使用 map 保存额外数据。同时如果
数组是有序的，要尽可能利用这个有序的条件，例如是否可以使用二分搜索等等。    

综合来看，快排中的双路快排、三路快排中 partition 使用的多指针方法是非常重要的，一定要掌握。    

### 例题

#### 283.移动零

给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。   

输入：[0, 1, 0, 3, 12]    
输出：[1, 3, 12, 0, 0]     

要求：不能使用额外的数组     

```go
func moveZeroes(nums []int)  {
	n := len(nums)
	k := 0
	for i := 0; i < n; i++ {
		if nums[i] != 0 {
			if k != i {
				nums[k] = nums[i]
				nums[i] = 0
			}
			k++
		}
	}
}
```   

利用了单路快排中的 partition 原理，前面的两部分一部分放处理好的部分，一部分放置可以交换的元素，
末尾的一部分是待处理的部分。    

#### 75.颜色分类

给定一个包含红色、白色和蓝色，一共 n 个元素的数组，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。    

此题中，我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。    

输入：[2, 0, 2, 1, 1, 0]    
输出：[0, 0, 1, ,1, 2, 2]    

```go
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
```    

利用三路快排中的 partition 的思路，将整个数组分成了四部分。    


#### 67.两数之和II - 有序数组

给定一个已按照升序排列 的有序数组，找到两个数使得它们相加之和等于目标数。   

函数应该返回这两个下标值 index1 和 index2，其中 index1 必须小于 index2。   

返回的下标值（index1 和 index2）不是从零开始的。   

输入：numbers = [2, 7, 11, 15], target = 9    
输出：[1, 2]     

```go
func twoSum1(numbers []int, target int) []int {
	n := len(numbers)
	l := 0
	r := n-1

	for ; l < r; {
		sum := numbers[l] + numbers[r]
		if sum < target {
			l++
		} else if sum > target {
			r--
		} else {
			return []int{l+1, r+1}
		}
	}
	return nil
}
```    

双路对撞指针的方案。当然其实也可以使用 map 的方案，相反是更简单的。    

#### 209.长度最小的子数组

给定一个含有 n 个正整数的数组和一个正整数 s ，找出该数组中满足其和 ≥ s 的长度最小的连续子数组。
如果不存在符合条件的连续子数组，返回 0。    

输入：s = 7, nums = [2, 3, 1, 2, 4, 3]    
输出：2    

```go
func minSubArrayLen(s int, nums []int) int {
	n := len(nums)
	result := n+1
	sum := 0
	l, r := 0, -1

	for ; l < n; {
		if r+1 < n && sum < s {
			r++
			sum += nums[r]
		} else {
			sum -= nums[l]
			l++
		}

		if sum >= s {
			result = int(math.Min(float64(result), float64(r-l+1)))
		}
	}

	if result == n+1 {
		result = 0
	}
	return result
}
```    

滑动窗口的思路。    

## 查找问题

两类查找问题：   

+ 查找有无
	- 元素 'a' 是否存在？set 集合
+ 查找对应关系（键值对应）
	- 元素 'a' 出现了几次？map 字典    

要灵活的运用查找表。一定要确定我们要在查找表中查找什么。   

针对一个输入为 500 左右的问题，题目的复杂度很可能是一个 O(n^2) 级别的算法。    

### 例题

#### 454-四数相加

给定四个包含整数的数组列表 A, B, C, D 计算有多少个元组 (i, j, k, l) ，使得 A[i] + B[j] +
C[k] + D[l] = 0。为了使问题简单化，所有的 A, B, C, D 具有相同的长度 N，且 0 ≤ N ≤ 500 。    

500 的输入规模，基本上是一个 O(n^2) 的输入规模。    

先建立一张查找表，存放 C, D 两个元祖中所有能生成的和，及其出现次数，然后再用一次两次循环
寻找和为 0 的次数。    

```go
	n := len(A)

	cdMap := make(map[int]int)
	count := 0

	for i := 0; i < n; i++ {
		for j := 0; j < n; j++ {
			sum := C[i] + D[j]
			cdMap[sum]++
		}
	}

	for i := 0; i < n; i++ {
		for j := 0; j < n; j++ {
			complement := -A[i]-B[j]
			if c, ok := cdMap[complement]; ok {
				count += c
			}
		}
	}

	return count
```   

#### 447.回旋镖的数量

```go
func numberOfBoomerangs(points [][]int) int {
	// 然而这里外层没必要用 map
	// 用一个数组即可
	// auxMap := make(map[int](map[int]int))
	n := len(points)
	result := 0

	for i := 0; i < n; i++ {
		x := points[i]
		auxMap := make(map[int]int)
		for j := 0; j < n; j++ {
			if i != j {
				y := points[j]
				xD := x[0] - y[0]
				yD := x[1] - y[1]
				dist := xD * xD + yD * yD
				// 注意这里其实存放的是距离的平方
				auxMap[dist]++
			}
		}
		for _, count := range auxMap {
			if count >= 2 {
				result += count * (count-1)
			}
		}
	}


	return result
}
```   

## 递归和回溯法

回溯法针对的（简单）问题一般都是给一些元素，然后对这些元素进行一定的操作（排列（Permutation
/取子集(Subsets, Combination Sum)/分割（Palindrome Partitioning）），来达到某个特定条件。    

回溯法的基本思想是按照输入数组的顺序，每一层递归处理一个元素，当处理到最后一层的时候，也就
是把数组中的所有元素都处理完的时候，把当前结果加入到最后的返回结果中。值得注意的是，每次在
递归到下一层之前，我们加入了某个要处理的元素X，在下一层递归返回之后，我们要把之前加入的
元素X从当前结果中取出来。如果我们不把元素X取出来，那么在下一次循环中，我们还会加入新的
元素Y。那么在这一层递归中就相当于处理了不止一个新元素。    

但是个人觉得这个元素 X 要不要取回，还是取决于元素是否是可重复使用的。   

回溯法的应用：   

+ 排列问题
+ 组合问题


### 例题

#### 17-字母排列

给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合：    

```js
var map = {
  2: 'abc',
  3: 'def',
  4: 'ghi',
  5: 'jkl',
  6: 'mno',
  7: 'pqrs',
  8: 'tuv',
  9: 'wxyz'
};

var letterCombinations = function (digits) {
  if (!digits) {
    return [];
  }
  var result = [];
  (function letter(digits, index, prefix) {
    if (index === digits.length - 1) {
      let char = digits[index];
      for (let i = 0; i < map[char].length; i++) {
        result.push(prefix + map[char][i]);
      }
    } else {
      let char = digits[index];
      for (let i = 0; i < map[char].length; i++) {
        letter(digits, index+1, prefix+map[char][i]);
      }
    }
  })(digits, 0, '');
  return result;
};
```     

#### 46-全排列

给定一个没有重复数字的序列，返回其所有可能的全排列。    

```
														使用 [1,2,3]构造排列
					/ 1                     | 2                          \ 3
使用 [2,3] 构造排列           使用 [1,3] 构造排列							使用 [1,2] 构造排列
 / 2       \ 3               / 1        \3                  / 1         \ 2		
3           2								3            1							   2              1
1,2,3     1,3,2           2,1,3        2,3,1             3,1,2          3,2,1
```   


```js
var permute = function(nums) {
  let result = [];
  if (nums.length == 0) {
    return result;
  }

  (function per(usedNums) {
    let unusedNums = nums.filter(value => {
      return usedNums.indexOf(value) === -1;
    });

    let len = unusedNums.length;
    if (len === 1) {
      result.push(usedNums.concat(unusedNums[0]));
      return
    }

    for (let i = 0; i < len; i++) {
      per(usedNums.concat(unusedNums[i]));
    }
  })([])

  return result;
};
```

第二种解法：    

```js
function permute2(nums) {
  var result = [];
  if (nums.length == 0) {
    return result;
  }

  let used = [];
  for (let i = 0; i < nums.length; i++) {
    used.push(false);
  }

  (function permutations(c) {
    if (c.length === nums.length) {
      result.push(c.slice());
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (!used[i]) {
        c.push(nums[i]);
        used[i] = true;
        permutations(c);
        used[i] = false;
        c.pop();
      }
    }
  })([])

  return result;
}
```    

#### 77-组合

给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合。   

```js
function combine2(n, k) {
  var res = [];
  if (n === 0 || k === 0 || n < k) {
    return res;
  }

  (function combination(n, k, start, c) {
    if (c.length === k) {
      res.push(c);
      return;
    }

    for (let i = start; i <= n; i++) {
      c.push(i);
      combination(n, k, i+1, c);
      c.pop();
    }
  })(n, k, 1, [])
}
```