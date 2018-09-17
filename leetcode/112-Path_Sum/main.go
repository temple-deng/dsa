package main

type TreeNode struct {
	Val int
	Left *TreeNode
	Right *TreeNode
}

// 给定一个二叉树和一个目标和，判断该树中是否存在根节点到叶子节点的路径
// 这条路径上所有节点值相加等于目标和。
func hasPathSum(root *TreeNode, sum int) bool {
	if root == nil {
		return false
	}

	if root.Val == sum && root.Left == nil && root.Right == nil {
		return true
	}

	return hasPathSum(root.Left, sum - root.Val) || hasPathSum(root.Right, sum - root.Val)
}

func main() {

}