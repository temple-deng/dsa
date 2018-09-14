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

func removeNthFromEnd(head *ListNode, n int) *ListNode {
	dummyHead := &ListNode{Val: 0, Next: head,}

	prev := dummyHead
	tail := head

	for i := 0; i < n-1; i++ {
		tail = tail.Next
	}

	for ; tail.Next != nil; {
		prev = prev.Next
		tail = tail.Next
	}

	prev.Next = prev.Next.Next

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
	arr := []int{1}

	list := CreateList(arr)
	PrintList(list)
	fmt.Println()
	head := removeNthFromEnd(list, 1)
	PrintList(head)
	fmt.Println()
}