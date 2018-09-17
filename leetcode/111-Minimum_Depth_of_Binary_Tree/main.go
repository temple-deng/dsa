package main

type TreeNode struct {
	Val int
	Left *TreeNode
	Right *TreeNode
}

// 给定一个二叉树，找出其最小深度，根的深度为 1
func minDepth(root *TreeNode) int {
	if root == nil {
		return 0
	}
    
    leftDepth := minDepth(root.Left)
    rightDepth := minDepth(root.Right)
    
    if leftDepth == 0 || rightDepth == 0 {
      if leftDepth == rightDepth {
				return 1
			}
			return max(leftDepth, rightDepth) + 1
    }
    return min(leftDepth, rightDepth) + 1
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}

func main() {

}