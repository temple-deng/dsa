package main

import (
	"fmt"
	"../bst"
	// "fmt"
)

func main() {
	tree := bst.New()
	array := [...]int{5, 3, 6, 8, 4, 2}
	/////////////////////////
	///        5
	//       /   \
	//      3     6
	//    /  \     \
	//   2    4     8
	/////////////////////////

	for _, value := range array {
		tree.Add(value)
	}

	tree.PreOrder()         // 5 3 2 4 6 8
	fmt.Println()

	// 可以看出，中序
	tree.InOrder()          // 2 3 4 5 6 8
	fmt.Println()
	tree.PostOrder()       // 2 4 3 8 6 5

	fmt.Println()
	tree.LevelOrder()

	fmt.Println()
	tree.RemoveMin()
	tree.PreOrder()
	fmt.Println()
	min, _ := tree.MinimumNR()
	fmt.Println(min)
	max, _ := tree.MaximumNR()
	fmt.Println(max)

	tree.Remove(5)
	tree.PreOrder()
}