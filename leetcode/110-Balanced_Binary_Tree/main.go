package bst

import (
	"math"
)

type TreeNode struct {
	Val int
	Left *TreeNode
	Right *TreeNode
}

func isBalanced(root *TreeNode) bool {
	if root == nil {
		return true
	}

	if !isBalanced(root.Left) || !isBalanced(root.Right) {
		return false
	}

	return math.Abs(float64(getHeight(root.Left) - getHeight(root.Right))) <= 1
}

func getHeight(node *TreeNode) int {
	if node == nil {
		return 0
	}

	left := getHeight(node.Left)
	right := getHeight(node.Right)
	
	if left > right {
		return left + 1
	}
	return right + 1
}