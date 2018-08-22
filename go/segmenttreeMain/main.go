package main

import (
	"fmt"
	"../segmenttree"
)

func main() {
	arr := []int{1,2,3,4,5,6,7,8,9}
	var merger segmenttree.Merger
	merger = Merger{id: 1234,}

	tree := segmenttree.New(arr, merger)
	fmt.Println(tree)
	fmt.Println(tree.Query(7,1))
}

type Merger struct{
	id int
}

func (m Merger) Merge(a int, b int) int {
	return a + b
}