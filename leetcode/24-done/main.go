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

func swapPairs(head *ListNode) *ListNode {
	if head == nil {
		return nil
	}

	dummyHead := &ListNode{Val: 0, Next: head,}

	prev := dummyHead
	cur := dummyHead.Next
	number := 1

	for ; cur.Next != nil; number++ {
		if number % 2 == 1 {
			next := cur.Next
			prev.Next = next
			cur.Next = next.Next
			next.Next = cur
			prev = next
		} else {
			prev = cur
			cur = cur.Next
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
	arr := []int{1,2,3,4}

	list := CreateList(arr)
	PrintList(list)
	fmt.Println()
	head := swapPairs(list)
	PrintList(head)
}