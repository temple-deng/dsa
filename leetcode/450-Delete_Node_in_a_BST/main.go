package main

type TreeNode struct {
	Val int
	Left *TreeNode
	Right *TreeNode
}

func deleteNode(root *TreeNode, key int) *TreeNode {
	if root == nil {
		return nil
	}

	if root.Val > key {
		root.Left = deleteNode(root.Left, key)
		return root
	} else if root.Val < key {
		root.Right = deleteNode(root.Right, key)
		return root
	} else {
	if root.Right == nil {
		left := root.Left
		root.Left = nil
		return left
	}

	if root.Left == nil {
		right := root.Right
		root.Right = nil
		return right
	}

	successor := getMinNode(root.Right)
	successor.Left = root.Left
	successor.Right = removeMinNode(root.Right)
	root.Left = nil
	root.Right = nil
	return successor
	}
}

func getMinNode(node *TreeNode) *TreeNode {
	if node.Left == nil {
		return node
	}

	return getMinNode(node.Left)
}

func removeMinNode(node *TreeNode) *TreeNode {
	if node.Left == nil {
		right := node.Right
		node.Right = nil
		return right
	}

	node.Left = removeMinNode(node.Left)
	return node
}

func main() {

}