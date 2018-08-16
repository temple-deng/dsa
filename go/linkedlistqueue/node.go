package linkedlistqueue

import (
	"fmt"
)

type Node struct {
	data interface{}
	next *Node
}

func (n *Node) String() string {
	return fmt.Sprint(n.data)
}