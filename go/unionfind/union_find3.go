package unionfind

import (
	"errors"
)

// Find2 的优化版本，优化树的合并过程
type Node struct {
	id int
	size int
}

type UnionFind3 struct {
	parent []*Node
}

func NewSizeUnionFind(size int) *UnionFind3 {
	parent := make([]*Node, size)
	for i := 0; i < size; i++ {
		node := &Node{id: i, size: 1}
		parent[i] = node
	}
	return &UnionFind3{parent}
}

func (u *UnionFind3) GetSize() int {
	return len(u.parent)
}

func (u *UnionFind3) find(p int) (node *Node, err error) {
	if p < 0 || p >= len(u.parent) {
		err = errors.New("Index out of range")
		return
	}

	for ; p != u.parent[p].id; p = u.parent[p].id {}
	node = u.parent[p]
	return
}

func (u *UnionFind3) IsConnected(p, q int) bool {
	pPar, err := u.find(p)
	if err != nil {
		return false
	}
	qPar, err := u.find(q)
	if err != nil {
		return false
	}

	return qPar.id == pPar.id
}

func (u *UnionFind3) UnionElements(p, q int) error {
	pPar, err := u.find(p)
	if err != nil {
		return err
	}
	qPar, err := u.find(q)
	if err != nil {
		return err
	}

	if pPar.id == qPar.id {
		return nil
	}

	pSize := pPar.size
	qSize := qPar.size

	if pSize <= qSize {
		pPar.id = qPar.id
		qPar.size = qPar.size + pPar.size
	} else {
		qPar.id = pPar.id
		pPar.size = pPar.size + qPar.size
	}
	return nil
}