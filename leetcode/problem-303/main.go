// 使用线段树的方案在 leetcode 无法通过
// 好像是因为它测试用例参数的问题，明明说是整型数组，但是用例给了个字符串
package main

import (
	"fmt"
)

type NumArray struct {
	tree []int
	data []int
}


func Constructor(nums []int) NumArray {
	length := len(nums)
	arr := NumArray{}
	arr.data = make([]int, length, cap(nums))
	for i:=0; i < length; i++ {
			arr.data[i] = nums[i]
	}
	arr.tree = make([]int, 4 * length, 4 * cap(nums))
	arr.buildSegmentTree(0, 0, length-1)
	return arr
}

func (this *NumArray) buildSegmentTree(rootIndex, l, r int) {
	if l == r {
		this.tree[rootIndex] = this.data[l]
		return
	}

	mid := l + (r - l) / 2
	leftIndex := this.leftChild(rootIndex)
	rightIndex := this.rightChild(rootIndex)
	this.buildSegmentTree(leftIndex, l, mid)
	this.buildSegmentTree(rightIndex, mid + 1, r)
	this.tree[rootIndex] = this.tree[leftIndex] + this.tree[rightIndex]
}

func (this *NumArray) leftChild(index int) int {
	return index * 2 + 1
}

func (this *NumArray) rightChild(index int) int {
	return index * 2 + 2
}

func (this *NumArray) SumRange(i int, j int) int {
	// 暂时假设 l, r 都是合法的
	return this.Query(i, j)
}

func (this *NumArray) query(rootIndex, l, r, queryL, queryR int) int {
	if l == queryL && r == queryR {
		return this.tree[rootIndex]
	}

	mid := l + (r - l) / 2
	leftIndex := this.leftChild(rootIndex)
	rightIndex := this.rightChild(rootIndex)

	if queryR <= mid {
		return this.query(leftIndex, l, mid, queryL, queryR)
	}

	if queryL > mid {
		return this.query(rightIndex, mid + 1, r, queryL, queryR)
	}

	left := this.query(leftIndex, l, mid, queryL, mid)
	right := this.query(rightIndex, mid+1, r, mid+1, queryR)
	return left + right
}

func (s *NumArray) Query(queryL int, queryR int) int {
	// 这里应该对输入区间进行详细的判断
	// 首先是左右区间大小顺序反了
	// if queryL > queryR {
	// 	temp := queryL
	// 	queryL = queryR
	// 	queryR = temp
	// }
	
	// // 其次如果整体区间都在负值间，报错
	// if queryR < 0 {
	// 	err = errors.New("range is illegal")
	// 	return
	// }

	// // 其次校正区间到正确的范围内
	// if queryL < 0 {
	// 	queryL = 0
	// }

	// if queryR >= len(s.data) {
	// 	queryL = len(s.data) - 1
	// }

	value := s.query(0, 0, len(s.data) - 1, queryL, queryR)
	return value
}

func main() {
	nums := []int{-2, 0, 3, -5, 2, -1}

	tree := Constructor(nums)
	fmt.Println(tree.SumRange(0, 2))
	fmt.Println(tree.SumRange(2, 5))
	fmt.Println(tree.SumRange(0, 5))
}