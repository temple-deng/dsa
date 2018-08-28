package segmenttree

import (
	"fmt"
	"errors"
)

type SegmentTree struct {
	tree []int
	data []int
	merger Merger
}

func New(arr []int, merger Merger) *SegmentTree {
	st := &SegmentTree{}
	length := len(arr)
	// 这里顺序一定要弄对，首先初始化数组元素
	st.data = make([]int, length, cap(arr))
	for i := 0; i < length; i++ {
		st.data[i] = arr[i]
	}
	st.merger = merger
	st.tree = make([]int, length * 4, cap(arr) * 4)
	st.buildSegmentTree(0, 0, length - 1)
	return st
}

func (s *SegmentTree) Get(index int) (value int, err error) {
	if index < 0 || index >= len(s.data) {
		err = errors.New("Index out of range")
		return
	}

	value = s.data[index]
	return
}

func (s *SegmentTree) Set(index int, value int) error {
	if index < 0 || index >= len(s.data) {
		return errors.New("Index out of range")
	}
	s.data[index] = value
	s.set(0, 0, len(s.data) - 1, index, value)
	return nil
}

func (s *SegmentTree) set(rootIndex, l, r, index, value int) {
	if l == r {
		s.tree[rootIndex] = value
		return
	}

	mid := l + (r - l) / 2
	leftIndex := s.LeftChild(rootIndex)
	rightIndex := s.RightChild(rootIndex)

	if index <= mid {
		s.set(leftIndex, l, mid, index, value)
	} else {
		s.set(rightIndex, mid + 1, r, index, value)
	}

	newValue := s.merger.Merge(s.tree[leftIndex], s.tree[rightIndex])
	s.tree[rootIndex] = newValue
}

func (s *SegmentTree) GetSize() int {
	return len(s.data)
}

func (s *SegmentTree) LeftChild(index int) int {
	return index * 2 + 1
}

func (s *SegmentTree) RightChild(index int) int {
	return index * 2 + 2
}

// 构建以 root 为根，左右区间为 [l, r] 的线段树
func (s *SegmentTree) buildSegmentTree(root int, l int, r int) {
	// 叶子节点
	if l == r {
		s.tree[root] = s.data[l]
		return
	}

	leftIndex := s.LeftChild(root)
	rightIndex := s.RightChild(root)
	mid := l + (r - l) / 2
	s.buildSegmentTree(leftIndex, l, mid)
	s.buildSegmentTree(rightIndex, mid + 1, r)
	s.tree[root] = s.merger.Merge(s.tree[leftIndex], s.tree[rightIndex])
}

func (s *SegmentTree) Query(queryL int, queryR int) (value int, err error) {
	// 这里应该对输入区间进行详细的判断
	// 首先是左右区间大小顺序反了
	if queryL > queryR {
		temp := queryL
		queryL = queryR
		queryR = temp
	}
	
	// 其次如果整体区间都在负值间，报错
	if queryR < 0 {
		err = errors.New("range is illegal")
		return
	}

	// 其次校正区间到正确的范围内
	if queryL < 0 {
		queryL = 0
	}

	if queryR >= len(s.data) {
		queryL = len(s.data) - 1
	}

	value = s.query(0, 0, len(s.data) - 1, queryL, queryR)
	return
}

func (s *SegmentTree) query(rootIndex, l, r, queryL, queryR int) int {
	if l == queryL && r == queryR {
		return s.tree[rootIndex]
	}

	leftIndex := s.LeftChild(rootIndex)
	rightIndex := s.RightChild(rootIndex)
	mid := l + (r - l) / 2

	// 区间完全在左边节点内
	if queryR <= mid {
		return s.query(leftIndex, l, mid, queryL, queryR)
	}

	// 区间完全在右边节点内
	if queryL > mid {
		return s.query(rightIndex, mid + 1, r, queryL, queryR)
	}

	// 区间分布在两边，分别获取两边中的内容，merge
	left := s.query(leftIndex, l, mid, queryL, mid)
	right := s.query(rightIndex, mid + 1, r, mid + 1, queryR)
	return s.merger.Merge(left, right)
}

func (s *SegmentTree) String() string {
	return fmt.Sprint(s.tree)
}