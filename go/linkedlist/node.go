package linkedlist

import (
	"fmt"
)

type Node struct {
	data interface{}
	next *Node
}

// 其实好像有没有 Init 方法都没区别，直接用字面量更方便吧
func (n *Node) Init(data interface{}) {
	n.data = data
}

func (n *Node) String() string {
	return fmt.Sprint(n.data)
}