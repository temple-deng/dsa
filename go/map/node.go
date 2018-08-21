package selfmap

import (
	"fmt"
)

type ListNode struct {
	key string
	value int
	next *ListNode
}

func (n *ListNode) String() string {
	return fmt.Sprintf("{%s: %d}", n.key, n.value)
}

type BSTNode struct {
	key string
	value int
	left *BSTNode
	right *BSTNode
}

func (n *BSTNode) String() string {
	return fmt.Sprintf("{%s: %d}", n.key, n.value)
}