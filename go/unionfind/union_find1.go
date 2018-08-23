package unionfind

import (
	"errors"
)

// 这种实现称为 Quick Find
type UnionFind1 struct {
	id []int
}

func NewQuickFind(size int) *UnionFind1 {
	id := make([]int, size)
	for i := 0; i < size; i++ {
		id[i] = i
	}
	return &UnionFind1{id}
}

func (u *UnionFind1) GetSize() int {
	return len(u.id)
}

// 查找元素 p 所对应的集合编号
func (u *UnionFind1) find(p int) (int, error) {
	if p < 0 || p >= len(u.id) {
		return 0, errors.New("Index out of range")
	}
	return u.id[p], nil
}

// 查看元素 p 和元素 q 是否属于同一个集合
// 时间复杂度 O(1)
func (u *UnionFind1) IsConnected(p, q int) bool {
	pId, err1 := u.find(p)
	qId, err2 := u.find(q)
	if err1 == nil || err2 == nil {
		return false
	}
	return pId == qId
}

// 合并元素 p 和元素 q 所属的集合
// 时间复杂度 O(n)
func (u *UnionFind1) UnionElements(p, q int) error {
	qId, err := u.find(q)
	if err != nil {
		return err
	}
	pId, err := u.find(p)
	if err != nil {
		return err
	}

	if pId == qId {
		return nil
	}

	length := len(u.id)
	for i := 0; i < length; i++ {
		if u.id[i] == pId {
			u.id[i] = qId
		}
	}
	return nil
}