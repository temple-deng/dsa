package reverseBetween

type ListNode struct {
  Val int
	Next *ListNode
}

// 反转从位置 m 到 n 的链表。请使用一趟扫描完成反转。注意索引从 1 开始
func reverseBetween(head *ListNode, m int, n int) *ListNode {
	
	reHead := head
	cur := head

	for i := 1; i < m; i++ {
		reHead = cur
		cur = cur.Next
	}

	tail := cur

	var prev *ListNode
	for i := m; i <= n; i++ {
		next := cur.Next
		cur.Next = prev
		prev = cur
		cur = next
	}

	reHead.Next = prev
	tail.Next = cur
	return head
}