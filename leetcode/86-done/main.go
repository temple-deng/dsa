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
	var h1, h2, cur1, cur2 *ListNode
	
	for cur := head; cur != nil;  {
		next := cur.Next
		cur.Next = nil
		if cur.Val < x {
			if h1 == nil {
				h1 = cur
				cur1 = h1
			} else {
				cur1.Next = cur
				cur1 = cur
			}
		} else {
			if h2 == nil {
				h2 = cur
				cur2 = h2
			} else {
				cur2.Next = cur
				cur2 = cur
			}
		}
		cur = next
	}

	head = h1
	if cur1 != nil {
		cur1.Next = h2
	} else {
		head = h2
	}
	return head
}