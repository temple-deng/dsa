package reverseList

/**
 * 反转一个单链表。
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

func reverseList(head *ListNode) *ListNode {
	arr := []*ListNode{}

	if head == nil {
		return nil
	}

	for cur := head; cur != nil; cur = cur.Next {
		arr = append(arr, cur)
	}

	n := len(arr)

	for i := n-1; i > 0; i-- {
		arr[i].Next = arr[i-1]
	}
	arr[0].Next = nil
	result := arr[n-1]
	return result
}

func reverseList1(head *ListNode) *ListNode {
	if head == nil {
		return nil
	}

	var prev *ListNode
	cur := head
	next := cur.Next
	for ; cur != nil; {
		cur.Next = prev
		prev = cur
		cur = next
		if cur != nil {
			next = cur.Next
		}

	}

	return prev
}