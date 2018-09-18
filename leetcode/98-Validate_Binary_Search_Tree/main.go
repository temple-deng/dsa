package main

type TreeNode struct {
	Val int
	Left *TreeNode
	Right *TreeNode
}


// 未完成，不清楚 go 里面的闭包怎么写
func isValidBST(root *TreeNode) bool {
	arr := []int{}

	inOrder := func (node *TreeNode) {
		if node == nil {
			return
		}
		inOrder(node.Left)
		arr := append(arr, node.Val)
		inOrder(node.Right)
	}

	inOrder(root)
	for i := 0; i < len(arr) - 1; i++ {
		if arr[i] >= arr[i+1] {
			return false
		}
	}
	return true
}

func main() {

}