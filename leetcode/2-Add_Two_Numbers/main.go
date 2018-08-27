// 给定两个非空链表来表示两个非负整数。位数按照逆序方式存储，它们的每个节点只存储单个数字。将两数相加返回一个新的链表。

// 你可以假设除了数字 0 之外，这两个数字都不会以零开头。

// 输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
// 输出：7 -> 0 -> 8
// 原因：342 + 465 = 807

package main

type ListNode struct {
	Val int
	Next *ListNode
}

/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func addTwoNumbers(l1 *ListNode, l2 *ListNode) *ListNode {
	arr1, arr2 := []int{}, []int{}
	for cur := l1; cur != nil; cur = cur.Next {
		arr1 = append(arr1, cur.Val)
	}
	for cur := l2; cur != nil; cur = cur.Next {
		arr2 = append(arr2, cur.Val)
	}

	size1, size2 := len(arr1), len(arr2)
	size := 0
	
	if size1 > size2 {
		size = size1 + 1
		old := arr2
		arr2 = make([]int, size1)
		copy(arr2, old)
	} else {
		size = size2 + 1
		old := arr1
		arr1 = make([]int, size2)
		copy(arr1, old)
	}

	arr := make([]int, size)
	for i := 0; i < size - 1; i++ {
		value := arr1[i] + arr2[i] + arr[i]
		if value >= 10 {
			arr[i] = value % 10
			arr[i + 1] = 1
		} else {
			arr[i] = value
		}
	}

	if arr[len(arr) - 1] == 0 {
		arr = arr[:len(arr) - 1]
	}

	size = len(arr)
	var cur, head *ListNode
	for i := 0; i < size; i++ {
		node := &ListNode{Val: arr[i],}
		if i == 0 {
			cur = node
			head = node
		} else {
			cur.Next = node
			cur = node
		}
	}
	return head
}

func main() {

}