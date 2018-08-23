package unionfind

import (
	"errors"
)

type UnionFind5 struct {
	parent []int
}

func New(size int) *UnionFind5 {
	parent := make([]int, size)
	for i:=0; i < size; i++ {
		parent[i] = i
	}
	return &UnionFind5{parent}
}

func (u *UnionFind5) find(p int) (int, error) {
	if p < 0 || p >= len(u.parent) {
		return 0, errors.New("Index out of range")
	}

	for ; p != u.parent[p]; {
		u.parent[p] = u.parent[u.parent[p]]
		p = u.parent[p]
	}
	return p, nil
}

func (u *UnionFind5) IsConnected(p, q int) bool {
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

func (u *UnionFind5) UnionElements(p, q int) error {
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

	u.parent[pPar] = qPar
	return nil
}