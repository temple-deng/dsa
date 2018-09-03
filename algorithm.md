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