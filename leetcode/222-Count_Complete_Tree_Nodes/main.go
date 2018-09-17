package main

type TreeNode struct {
	Val int
	Left *TreeNode
	Right *TreeNode
}

// 给出一个完全二叉树，求出该树的节点个数。
// 题目要求的是一颗完全二叉树的个数，但是其实我们这里给的是一个
// 可以求任意二叉树节点个数的算法
// 这样就完全没用到完全二叉树的这个条件
// 但是要如何使用暂时还没想出来
func countNodes(root *TreeNode) int {
	if root == nil {
		return 0
	}
	return countNodes(root.Left) + countNodes(root.Right) + 1
}

func main() {

}