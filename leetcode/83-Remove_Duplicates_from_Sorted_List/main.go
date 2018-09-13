package removeNode

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

// 给定一个排序链表，删除所有重复的元素，使得每个元素只出现一次。
func deleteDuplicates(head *ListNode) *ListNode {
	if head == nil {
		return nil
	}

	prev := head
	cur := head.Next
	
	for ; cur != nil; {
		if cur.Val == prev.Val {
			prev.Next = cur.Next
			cur.Next = nil
			cur = prev.Next
		} else {
			prev = cur
			cur = cur.Next
		}
	}

	return head
}