package partitionList

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


func partition(head *ListNode, x int) *ListNode {
	var l, r *ListNode

	for cur := head; cur != nil; {
		next := cur.Next
		cur.Next = nil
		if cur.Val < x {
			if l == nil {
				l = cur
			} else {
				l.Next = cur
			}

		} else {
			if r == nil {
				r = cur
			} else {
				r.Next = cur
			}
		}
		cur = next
	}

	
}