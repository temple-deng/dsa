package unionfind

import (
	"errors"
)

// 基于 rank 的优化
type UnionFind4 struct {
	parent []int
	rank 	 []int
}

func NewRankUnionFind(size int) *UnionFind4 {
	parent := make([]int, size)
	rank := make([]int, size)

	for i := 0; i < size; i++ {
		parent[i] = i
		rank[i] = 1
	}

	return &UnionFind4{parent, rank}
}

func (u *UnionFind4) GetSize() int {
	return len(u.parent)
}

func (u *UnionFind4) find(p int) (int, error) {
	if p < 0 || p >= len(u.parent) {
		return 0, errors.New("Index out of range")
	}

	for ; p != u.parent[p]; p = u.parent[p] {}
	return p, nil
}

func (u *UnionFind4) IsConnected(p, q int) bool {
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

func (u *UnionFind4) UnionElements(p, q int) error {
	pPar, err := u.find(p)
	if err != nil {
		return err
	}
	qPar, err := u.find(q)
	if err != nil {
		return err
	}

	if pPar == qPar {
		return nil
	}

	pRank := u.rank[pPar]
	qRank := u.rank[qPar]
	if pRank < qRank {
		u.parent[pPar] = qPar
	} else if pRank > qRank {
		u.parent[qPar] = pPar
	} else {
		// 这里哪边往哪边上并其实无所谓了
		u.parent[pPar] = qPar
		u.rank[qPar]++
	}
	return nil
}