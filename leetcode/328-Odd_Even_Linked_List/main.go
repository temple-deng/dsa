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

func oddEvenList(head *ListNode) *ListNode {
	var odd, even *ListNode
	newHead := odd
	evenHead := even

	var number = 1
	for cur := head; cur != nil; number++ {
		next := cur.Next
		cur.Next = nil
		if number % 2 == 1 {
			if odd != nil {
				odd.Next = cur
			} else {
				newHead = cur
			}
			odd = cur
		} else {
			if even != nil {
				even.Next = cur
			} else {
				evenHead = cur
			}
			even = cur
		}
		cur = next
	}

	if newHead != nil {
		odd.Next = evenHead
		head = newHead
	} else {
		head = evenHead
	}

	return head
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
	head := oddEvenList(list)
	PrintList(head)
}