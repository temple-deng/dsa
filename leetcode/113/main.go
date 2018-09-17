package main

import (
	"fmt"
)

type TreeNode struct {
	Val int
	Left *TreeNode
	Right *TreeNode
}

func pathSum(root *TreeNode, sum int) [][]int {
	if root == nil {
		return [][]int{}
	}

	return path(root, sum, []int{})
}

func path(node *TreeNode, sum int, paths []int) [][]int {
	if node == nil {
		return nil
	}

	newPath := append(paths, node.Val)

	if node.Left == nil && node.Right == nil {
		if node.Val == sum {
			fmt.Println(newPath)
			return [][]int{newPath}
		}
		return nil
	}

	leftPath := path(node.Left, sum - node.Val, newPath)
	rightPath := path(node.Right, sum - node.Val, newPath)
	fmt.Println(leftPath)
	fmt.Println(rightPath)

	if leftPath == nil || rightPath == nil {
		if leftPath == nil && rightPath == nil {
			return nil
		}
		if leftPath == nil {
			return rightPath
		}
		return leftPath
	}
	return append(leftPath, rightPath...)
}

func main() {
	l1 := &TreeNode{Val: 7,}
	l2 := &TreeNode{Val: 2,}
	ll1 := &TreeNode{Val: 11, Left: l1, Right: l2,}
	lll1 := &TreeNode{Val: 4, Left: ll1,}
	r1 := &TreeNode{Val: 5,}
	r2 := &TreeNode{Val: 1,}
	rr1 := &TreeNode{Val: 13,}
	rr2 := &TreeNode{Val: 4, Left: r1, Right: r2,}
	rrr1 := &TreeNode{Val: 8, Left: rr1, Right: rr2,}
	root := &TreeNode{Val: 5, Left: lll1, Right: rrr1,}
	fmt.Println(pathSum(root, 22))
}