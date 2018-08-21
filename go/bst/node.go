package bst

import (
	"fmt"
)

// 理论上二分搜索树中节点的值必须具有可比较性
// 这里我忘了接口类型有没有这个特性了
// 严格来说，是可排序而不仅仅是可比较
// 可比较是 == 和 != 运算符
// 可排序是 < <= > >= 运算符
// 由于 interface{} 在 Go 中不可排序，而暂时我们还不知道其他实现泛型的办法
// 因此目前先定死节点值为整型
type Node struct {
	Value int
	Left *Node
	Right *Node
}

func (n *Node) String() string {
	return fmt.Sprint(n.Value)
}
