package main

type TreeNode struct {
	Val int
	Left *TreeNode
	Right *TreeNode
}

// 找一颗以 root 为根的数中，所有路径和为 sum 的路径个数
func pathSum(root *TreeNode, sum int) int {
	if root == nil {
		return 0
	}

	res := 0
	res += findPath(root, sum)

	res += pathSum(root.Left, sum)
	res += pathSum(root.Right, sum)

	return res
}

func findPath(node *TreeNode, sum int) int {
	if node == nil {
		return 0
	}

	res := 0

	if node.Val == sum {
		res += 1
	}

	res += findPath(node.Left, sum - node.Val) + findPath(node.Right, sum - node.Val)
	return res
}

func main() {
	
}