package main

import (
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

func deleteDuplicates(head *ListNode) *ListNode {
	if head == nil {
		return nil
	}

	dummyHead := &ListNode{Val: 0, Next: head,}

	prev := dummyHead
	cur := dummyHead.Next

	for ; cur.Next != nil; {
		if cur.Val != cur.Next.Val {
			prev = cur
			cur = cur.Next
		} else {
			next := cur.Next
			for ; next != nil && next.Val == cur.Val; next = next.Next {}
			prev.Next = next
			if next == nil {
				break
			}
			cur = next
		}
	}


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
	arr := []int{1,1}

	list := CreateList(arr)
	PrintList(list)
	fmt.Println()
	head := deleteDuplicates(list)
	PrintList(head)
}