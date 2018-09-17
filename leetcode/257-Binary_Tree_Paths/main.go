package main

import (
	"fmt"
)

type TreeNode struct {
	Val int
	Left *TreeNode
	Right *TreeNode
}

// 给定一个二叉树，返回所有从根节点到叶子节点的路径
func binaryTreePaths(root *TreeNode) []string {
	if root == nil {
		return []string{}
	}

	return paths(root, []int{})
}

func paths(node *TreeNode, parent []int) []string {
	// 叶子节点
	if node.Left == nil && node.Right == nil {
		str := ""
		for i := 0; i < len(parent); i++ {
			str += fmt.Sprint(parent[i]) + "->"
		}
		str += fmt.Sprint(node.Val)
		return []string{str}
	}

	newPath := append(parent, node.Val)

	if node.Left == nil {
		return paths(node.Right, newPath)
	}

	if node.Right == nil {
		return paths(node.Left, newPath)
	}

	return append(paths(node.Left, newPath), paths(node.Right, newPath)...)
}

func main() {
	
}