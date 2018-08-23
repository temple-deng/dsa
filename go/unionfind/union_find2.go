package unionfind

import (
	"errors"
)

type UnionFind2 struct {
	parent []int
}

func NewQuickUnion(size int) *UnionFind2 {
	parent := make([]int, size)
	for i := 0; i < size; i++ {
		parent[i] = i
	}
	return &UnionFind2{parent}
}

func (u *UnionFind2) GetSize() int {
	return len(u.parent)
}

// 总和来看，时间复杂度是一个 O(2h) 的算法
func (u *UnionFind2) UnionElements(p, q int) error {
	pPar, err := u.find(p)
	if err != nil {
		return err
	}
	qPar, err := u.find(q)
	if err != nil {
		return err
	}

	if p == q {
		return nil		
	}

	u.parent[pPar] = qPar
	return nil
}

// 时间复杂度 O(h), h 是 p 所在的树的深度
func (u *UnionFind2) find(p int) (int, error) {
	if p < 0 || p >= len(u.parent) {
		return 0, errors.New("Index out of range")
	}
	for ; p != u.parent[p]; p = u.parent[p] {}
	return p, nil
}

// 同 Union 方法，也是一个 O(2h) 的算法
func (u *UnionFind2) IsConnected(p, q int) bool {
	pPar, err := u.find(p)
	if err != nil {
		return false
	}
	qPar, err := u.find(q)
	if err != nil {
		return false
	}

	return qPar == pPar
}