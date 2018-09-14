package main

import(
	"fmt"
)
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */

type ListNode struct {
	Val int
	Next *ListNode
}

func rotateRight(head *ListNode, k int) *ListNode {
	dummyHead := &ListNode{}
	dummyHead.Next = head

	tail := dummyHead
	n := 0

	for ; tail.Next != nil; {
		tail = tail.Next
		n++
	}

	if n == 0 {
		return head
	}

	k = k % n

	// 两者在同一起跑线
	prev := dummyHead
	tail = dummyHead

	// 相差 k 步
	// 好好分析一下这里的边界条件
	// 由于我们 tail 是从 dummyHead 开始走
	// 一共 n 个节点（除 dummyHead), 则在一个非 nil 节点前最多可以走 n 步
	// 同时 k < n, 所以循环完 tail 必不为 nil
	for i := 0; i < k; i++ {
		tail = tail.Next
	}

	for ; tail.Next != nil; {
		prev = prev.Next
		tail = tail.Next
	}

	tail.Next = dummyHead.Next
	dummyHead.Next = prev.Next
	prev.Next = nil
	return dummyHead.Next
}

func CreateList(arr []int) *ListNode {
	if len(arr) == 0 {
		return nil
	}

	head := &ListNode{Val: arr[0]}
	cur := head
	for i := 1; i < len(arr); i++ {
		cur.Next = &ListNode{Val: arr[i]}
		cur = cur.Next
	}

	return head
}

func PrintList(head *ListNode) {
	for cur := head; cur != nil; cur = cur.Next {
		fmt.Printf("%d -> ", cur.Val)
	}
}

func main() {
	arr := []int{1, 2, 3, 4, 5}

	list := CreateList(arr)
	PrintList(list)
	fmt.Println()
	head := rotateRight(list, 6)
	PrintList(head)
	fmt.Println()
}