package main

import (
	"math"
	"fmt"
)

type TreeNode struct {
	Val int
	Left *TreeNode
	Right *TreeNode
}

func sumNumbers(root *TreeNode) int {
	if root == nil {
		return 0
	}

	paths := getPaths(root, []int{})
	result := 0

	for i := 0; i < len(paths); i++ {
		path := paths[i]
		pL := len(path)
		sum := 0
		for j := 0; j < pL; j++ {
			sum += path[j] * int(math.Pow10(pL-1-j))
		}
		result += sum
	}
	return result
}

func getPaths(node *TreeNode, curPath []int) [][]int {
	if node.Left == nil && node.Right == nil {
		// 叶子节点
		return [][]int{append(curPath, node.Val)}
	}

	if node.Right == nil {
		return getPaths(node.Left, append(curPath, node.Val))
	}

	if node.Left == nil {
		return getPaths(node.Right, append(curPath, node.Val))
	}

	return append(getPaths(node.Left, append(curPath, node.Val)), getPaths(node.Right, append(curPath, node.Val))...)
}

func main() {
	l1 := &TreeNode{Val: 5,}
	l2 := &TreeNode{Val: 1,}
	ll1 := &TreeNode{Val: 9, Left: l1, Right: l2,}
	r1 := &TreeNode{Val: 0,}
	root := &TreeNode{Val: 4, Left: ll1, Right: r1,}
	fmt.Println(sumNumbers(root))
}